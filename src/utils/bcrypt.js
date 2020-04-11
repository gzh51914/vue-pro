//可以用来对前端传递来的密码进行加密 
let bcrypt = require("bcrypt")

module.exports = {
    //加密  const hash = bcrypt.hashSync(用户未加密的密码, salt);
    hashSync:password=>{
        return bcrypt.hashSync(password,10)
    },
    //解密校验 bcrypt.compareSync(用户未加密的密码, 用户加密之后的hash密码);
    compareSync:(password,hash)=>bcrypt.compareSync(password,hash)
}