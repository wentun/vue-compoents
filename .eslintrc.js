module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    RTXMemberMap: false
  },
  extends: ["plugin:vue/essential", 
    //   "@vue/prettier"
],
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    indent: "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-param-reassign": "off",
    "template-curly-spacing": "off",
    "max-len": ["error", { code: 300 }], // 此处为具体添加代码
    "space-before-function-paren": 0
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  }
};
