let jwt = require("jsonwebtoken")

module.exports = {
    //生成签名
    sign:({username,_id})=>{
       return jwt.sign({username,_id},"maizuo",{expiresIn:60*60*24})
    },
    //校验签名
    verify:token=>{
        return new Promise((resolve,reject)=>{
            jwt.verify(token,"maizuo",(err,decode)=>{
                if(!err){
                    resolve(decode)  //decode={username,_id}
                }else{
                    reject(err.message)
                }
            })
        })
    }
}