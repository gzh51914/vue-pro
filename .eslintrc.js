module.exports = {
  
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module"
    },
  rules: {
    'quotes':'off',   //关闭eslint引号验证
    'key-spacing':'off', //关闭关键词前面空格的验证
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  
}