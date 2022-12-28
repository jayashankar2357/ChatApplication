const plugins = [];
plugins.push([
  '@babel/plugin-syntax-typescript',
  {
    isTSX: true
  }
]);
plugins.push(['@babel/plugin-proposal-nullish-coalescing-operator']);

module.exports = { plugins };
