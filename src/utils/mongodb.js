let mongodb = require("mongodb")
let mongodCt = mongodb.MongoClient
let ObjectId =  mongodb.ObjectId //把字符串转成ObjectId的对象类型
//链接库
/*
    dbName:数据库名称 默认值就是student
    collectionName:集合名字
    url:链接的url地址
*/
let open = ({dbName='maizuo',collectionName,url="mongodb://127.0.0.1:27017"})=>{
    return new Promise((resolve,reject)=>{
        mongodCt.connect(url,{useUnifiedTopology: true},(err,client)=>{
            if(err){
                reject(err)
            }else{
                let db = client.db(dbName)
                let collection = db.collection(collectionName)
                resolve({collection,client})
            }
        })
    })
}

//查询库集合列表数据
let findList = ({
    collectionName,//集合名字
    dbName='maizuo',//默认指明的数据库的名字
    _page,_limit,_sort,q
})=>{

    //生成检索条件
    let rule = q ? {title:new RegExp(q,'g')} : {}   //张三  张三丰   
    // let rule = q ? {username:eval('/'+q+"/")} : {}

    return new Promise((resolve,reject)=>{
        //链接数据库
        open({dbName,collectionName})
            .then(({collection,client})=>{
                //查询列表
                collection.find(rule,{
                    skip:_page*_limit,//跳过多少条数据
                    limit:_limit,//限定每一页的数量
                    sort:{[_sort]:1} //排序字段_sort  当一个变量作为key使用的时候，需要采用[]的语法
                }).toArray((err,result)=>{
                    if(!err && result.length>0){
                        resolve({err:0,data:result})
                    }else{
                        resolve({err:1,msg:"查无数据..."})
                    }
                    //关闭资源
                    client.close()
                })
            })
            .catch(err=>{ //链接数据库失败
                reject({err:1,msg:"数据库链接失败...."})
            })
    })
}


//根据动态id获取详情数据
let findDetail = ({
    dbName="maizuo",//默认查询的数据库名字
    collectionName,//集合名字
    _id=null  //外面传入的_id 
})=>{
    return new Promise((resolve,reject)=>{
        //链库操作
        open({dbName,collectionName})
            .then(({collection,client})=>{
                //查询
                if(_id.length === 24){
                    collection.find({_id:ObjectId(_id)}).toArray((err,data)=>{   
                        //返回结果 
                        if(!err && data.length>0){
                            resolve({err:0,data:data[0]}) //因为result是一个数组，里面仅仅包含一条数据
                        }else{
                            resolve({err:1,msg:"查询不到数据...."})
                        }
                    })
                }else{
                    reject({err:1,msg:"id长度有误..."})
                }
            })
            .catch(err=>reject({err:1,msg:"链接数据库失败...."}))
    })
}



exports.open = open;  //{open:函数}
exports.findList = findList;  
exports.findDetail = findDetail;  
