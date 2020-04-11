var express = require('express');
var router = express.Router();
var mongodb = require("../../utils/mongodb")

//列表查询商品   /api/goods/home就会进来
router.get("/:goodsName",(req,res,next)=>{
    //判断是否有_id参数
    if(req.query._id){
        res.redirect(`/api/goods/${req.params.goodsName}/${req.query._id}`)
        return;
    }
    // console.log("goods列表进入了...")
    let collectionName = req.params.goodsName;
    let {_page,_limit,_sort,q} = req.query
    mongodb.findList({
        collectionName,
        _page,_limit,_sort,q
    }).then(result=>{
        res.send(result)
    }).catch(err=>res.send(err))
})

//详情    /api/goods/home/224242342
router.get("/:goodsName/:_id",(req,res,next)=>{
    let collectionName = req.params.goodsName;
    let _id = req.params._id;
    mongodb.findDetail({collectionName,_id}).then(result=>{
        res.send(result)
    }).catch(err=>res.send(err))
})




module.exports = router;
