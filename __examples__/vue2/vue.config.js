module.exports = {
    chainWebpack: (config) => {
        /**
         * 增加 css 作用域 loader 处理
         */
        const baseRule = config.module.rule('scss')
        ;[
            (baseRule.oneOf('modules').resourceQuery(/module/),
            baseRule.oneOf('normal'))
        ].forEach((rule) => {
            rule.use('scoped-css-loader')
                .loader('scoped-css-loader')
                .before('sass-loader')
        })
    }
}
