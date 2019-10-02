module.exports = {
    root: true,

    extends: ['eslint-config-mlint/prettier-ts'],

    rules: {
        // 关闭 js 未定义错误
        'no-undef': 'off',

        // 考虑到一些类型推导的实用性，关闭该规则
        '@typescript-eslint/typedef': 'off',

        '@typescript-eslint/no-this-alias': 'off'
    }
}
