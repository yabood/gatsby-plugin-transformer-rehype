import { GraphQLString, GraphQLJSON } from 'gatsby/graphql';
import visit from 'unist-util-visit';
import rehype from 'rehype';
import html from 'rehype-stringify';
import parse from 'rehype-parse';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import toc from 'rehype-toc';

export default {
  HtmlRehype: {
    html: {
      type: GraphQLString,
      resolve(ast) {
        return rehype()
          .data(`settings`, { fragment: true })
          .use(parse)
          .use(raw)
          .use(slug)
          .use(autolinkHeadings, { behavior: `wrap` })
          .use(html)
          .use(toc)
          .use(stringify)
          .process(ast.html)
          .toString();
      },
    },
    htmlAst: {
      type: GraphQLJSON,
      resolve(ast) {
        return ast.htmlAst;
      },
    },
    tableOfContents: {
      type: GraphQLJSON,
      resolve(ast) {
        return ast.tableOfContents;
      },
    },
  },
};