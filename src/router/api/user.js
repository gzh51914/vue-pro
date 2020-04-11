var express = require('express');
var router = express.Router();

var jwt = require("../../utils/jwt")
var bcrypt = require("../../utils/bcrypt")
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user")
    // let token = jwt.sign({username:"张三",_id:"5e6ebf68efe8d765db7b66df"})
    // console.log(token)
    // jwt.verify(token).then(decode=>{
    //     console.log("decode",decode)
    // })

    //验证密码
    // let password = "abc123"
    // let hash = bcrypt.hashSync(password)
    // console.log("hash",hash)
    // console.log(bcrypt.compareSync(password+"234",hash))


    res.end()
});

module.exports = router;
