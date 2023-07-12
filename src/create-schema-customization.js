const typeDefs = `
    type HtmlRehype implements Node @dontinfer {
        html: String
        htmlAst: JSON
        tableOfContents: JSON
    }
`;

const useTypeExists = (store, name) => type => {
  const types = store.getState().schemaCustomization.types;
  const plugin = types.find(node => {
    var _node$plugin;
    return ((_node$plugin = node.plugin) === null || _node$plugin === void 0 ? void 0 : _node$plugin.name) === name;
  });
  if (plugin === undefined) {
    return false;
  }
  const defs = plugin.typeOrTypeDef.definitions;
  const exists = defs.find(node => {
    var _node$name;
    return ((_node$name = node.name) === null || _node$name === void 0 ? void 0 : _node$name.value) === type;
  });
  return exists !== undefined;
};

export default (nodeApiArgs, pluginOptions = {}) => {
  const {
    plugins = []
  } = pluginOptions;
  const typeExistsDeprecated = useTypeExists(nodeApiArgs.store, `jamify-source-ghost`);
  const typeExists = useTypeExists(nodeApiArgs.store, `gatsby-source-try-ghost`);
  if (!(typeExists(`HtmlRehype`) || typeExistsDeprecated(`HtmlRehype`))) {
    nodeApiArgs.actions.createTypes(typeDefs);
  }
  plugins.forEach(plugin => {
    const resolvedPlugin = require(plugin.resolve);
    if (typeof resolvedPlugin.createSchemaCustomization === `function`) {
      resolvedPlugin.createSchemaCustomization(nodeApiArgs, plugin.pluginOptions);
    }
  });
};