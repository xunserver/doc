module.exports = {
    printWidth: 80,   // 单行最多的字符
    tabWidth: 2,    // tab跨度 2 空格 
    useTabs: false, // 允许tab
    semi: false,    // 允许分好
    singleQuote: true,  // 允许单引号
    quoteProps: 'as-needed', // 是否包括对象的属性名
    jsxSingleQuote: false, // jsx 中是否使用单引号
    trailingComma: 'es5', // 是否添加尾逗号
    bracketSpacing: true, // 花括号和圆括号是否加空格  { a: b }
    bracketSameLine: false,  // html 标签的 > 是否不换行
    arrowParens: 'always',  // 箭头函数是否添加括号
    rangeStart: 0,  // 校验起始位置
    rangeEnd: Infinity,  // 校验终结位置
    proseWrap: 'preserve', // 对于md中中的连续的文本是否需要按照printWidth进行换行。
    htmlWhitespaceSensitivity: 'css',
    vueIndentScriptAndStyle: false,   // 是否缩进vue中的文件
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'auto',   // 是否格式化嵌入的代码 ，比如md中的代码
    singleAttributePerLine: true// 对于html jsx vue是否每行只显示一个属性
}