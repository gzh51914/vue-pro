var express = require('express');
var router = express.Router();
var pathLib = require("path")
var mongodb = require("../../utils/mongodb")
var bcrypt = require("../../utils/bcrypt")
/* 
    reg代表注册逻辑   往数据库里面进行数据的插入  
    restful接口规范：
        插入数据   post方式
        删除数据   delete方式
        修改数据   patch/put方式   put是覆盖性修改  patch代表局部修改
        查询数据   get方式
*/
// /api/reg ===> post请求 （username,password）
router.post('/', function(req, res, next) {
    //1.获取前端传递来的username/password/nickname/icon等   
    let {username,password,nickname} = req.body;
    //2.对于前端必传参数username、password的验证
    if(!username || !password){
        res.send({err:1,msg:"用户名或者密码是必传参数！"})
        return
    }
    //3.整理其他的需要入库的参数（nickname/icon）
    nickname = nickname || "系统生成的默认昵称"
    let follow = 0 //关注数
    let fans = 0 //粉丝数
    let time = Date.now() //服务器生成注册时间

  
    //4.校验用户是否在数据库存在（username的唯一性）
    mongodb.open({
        collectionName:"user"
    }).then(({collection,client})=>{
        //根据注册的用户名从库里面执行查询操作
        collection.find({username}).toArray((err,result)=>{
            if(err){
                res.send({err:1,msg:"集合操作失败..."})
                client.close()
            }else{
                if(result.length ===0 ){// 4-1 如果不存在的话，直接入库操作
                    //说明需要注册的用户在数据库里面不存在，进行入库操作
                    //密码需要进行加密
                    password = bcrypt.hashSync(password)
                    //console.log(username,password,nickname,fans,follow,time,icon)
                    //入库
                    collection.insertOne({
                        username,password,nickname,fans,follow,time,icon
                    },(err,result)=>{
                        if(!err){
                            //插入后的信息中不需要给用户返回用户名与密码
                            delete result.ops[0].username
                            delete result.ops[0].password
                            res.send({
                                err:0,
                                msg:"恭喜您，注册成功！",
                                data:result.ops[0]
                            })
                        }else{
                            res.send({err:1,msg:"入库失败..."})
                        }
                        client.close()
                    })
                }else{ // 4-2 用户存在提示用户已存在信息   /upload/user/XXXXX.png
                    if(icon.indexOf("default")===-1){ //用户上传的头像路径不包含default
                        // fs.unlinkSync("./public"+icon)
                        fs.unlinkSync(pathLib.join(__dirname,"../../public",icon))
                    }
                    res.send({err:1,msg:"此用户已经存在，注册失败！"})
                    client.close()
                }
            }
        })
    }).catch(err=>{
        console.log({err:1,msg:"数据库连接失败...."})
    })
});

module.exports = router;