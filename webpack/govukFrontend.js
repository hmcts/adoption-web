const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = require.resolve('govuk-frontend/package.json');
const root = path.resolve(packageJson, '..', 'dist', 'govuk');
const sass = path.resolve(root, 'all.scss');
const javascript = path.resolve(root, 'all.js');
const components = path.resolve(root, 'components');
const assets = path.resolve(root, 'assets');
const images = path.resolve(assets, 'images');
const fonts = path.resolve(assets, 'fonts');
const manifest = path.resolve(assets, 'manifest.json');

const copyGovukTemplateAssets = new CopyWebpackPlugin({
  patterns: [
    { from: images, to: 'assets/images' },
    { from: fonts, to: 'assets/fonts' },
    { from: manifest, to: 'assets/manifest.json' },
  ],
});

module.exports = {
  paths: { template: root, components, sass, javascript, assets },
  plugins: [copyGovukTemplateAssets],
};
