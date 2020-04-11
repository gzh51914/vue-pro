let jwt = require("../../utils/jwt")
module.exports = (req,res,next)=>{
   
    //处理公共的授权业务
    //如果前端接口包含 login/reg/logout，那么就可以不需要携带token   /api/login  
    if( /login|logout|reg/.test(req.url) ){
        //next必须要放行
        next()
    }else{ //除此之外的接口必须要携带token才能进行数据获取   /api/goods/home
        //获取前端传递来的token
        let token = req.headers.token || req.body.token || req.query.token
        //校验前端传递来的token
        jwt.verify(token).then(decode=>{ 
            req.query.decode = decode //如果后续的接口需要数据的话，方便获取到  {username,_id} 
            next() 
        }).catch(message=>res.send({err:1,msg:"token验证失效或者未登录..."+message}))
    }
}