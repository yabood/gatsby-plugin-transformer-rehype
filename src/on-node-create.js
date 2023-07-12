import visit from 'unist-util-visit';
import rehype from 'rehype';
import html from 'rehype-stringify';
import parse from 'rehype-parse';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import toc from 'rehype-toc';

export default async ({ node, getNode, actions, createNodeId, createContentDigest }, pluginOptions) => {
  if (node.internal.type !== `HtmlRehype`) return;

  const { createNode, createParentChildLink } = actions;

  const processHTML = async (html) => {
    const ast = await rehype()
      .data(`settings`, { fragment: true })
      .use(parse)
      .use(raw)
      .use(slug)
      .use(autolinkHeadings, { behavior: `wrap` })
      .use(html)
      .use(toc)
      .use(stringify)
      .process(html);
  
    return {
      html: ast.toString(),
      htmlAst: ast,
      tableOfContents: extractTOC(ast),
    };
  };

  const content = await processHTML(node.html);
  const htmlNode = {
    id: createNodeId(`${node.id} >>> HTML`),
    parent: node.id,
    internal: {
      content: JSON.stringify(content),
      type: `HtmlRehype`,
      mediaType: `text/html`,
      contentDigest: createContentDigest(content),
    },
  };

  createNode(htmlNode);
  createParentChildLink({ parent: node, child: htmlNode });
};