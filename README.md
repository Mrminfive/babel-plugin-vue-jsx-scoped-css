# babel-plugin-vue-jsx-scoped-css

<p align="left">
    <a href="https://npmcharts.com/compare/babel-plugin-vue-jsx-scoped-css?minimal=true"><img src="https://img.shields.io/npm/dm/babel-plugin-vue-jsx-scoped-css.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/babel-plugin-vue-jsx-scoped-css"><img src="https://img.shields.io/npm/v/babel-plugin-vue-jsx-scoped-css.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/babel-plugin-vue-jsx-scoped-css"><img src="https://img.shields.io/npm/l/babel-plugin-vue-jsx-scoped-css.svg" alt="License"></a>
</p>

:hammer: CSS encapsulation solution for Vue JSX

## About

This plugin is used to implement the css scoped effect of template in vue jsx。

For more details, please refer to [react-scoped-css][reactscopedcss]

## Use

You have to add one babel plugin and one webpack loader.

### Babel

```bash
yarn add babel-plugin-vue-jsx-scoped-css --dev
```

and in your babelrc add

```json
{
    "presets": ["@vue/babel-preset-jsx"],
    "plugins": ["babel-plugin-vue-jsx-scoped-css"]
}
```

also note that you can define your own matching rule like this

```json
{
    "plugins": [
        [
            "babel-plugin-vue-jsx-scoped-css",
            {
                "include": ".local.(sa|sc|c)ss$"
            }
        ]
    ]
}
```

**This plugin must be before the vue jsx parsing plugin.**

### Webpack

```bash
yarn add scoped-css-loader --dev
```

and in your webpack.config.js

```json
{
    "test": /\.(sc|c|sa)ss$/,
    "use": [
        {
            "loader": "style-loader"
        },
        {
            "loader": "css-loader",
            "options": {
                "sourceMap": true,
                "importLoaders": 2
            }
        },
        // You have to put in after `css-loader` and before any `pre-precessing loader`
        { "loader": "scoped-css-loader" },
        {
            "loader": "sass-loader"
        }
    ]
}
```

[reactscopedcss]: https://github.com/gaoxiaoliangz/react-scoped-css
