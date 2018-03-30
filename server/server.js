const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken')
const http = require('http')
const querystring = require('querystring')
app.use(bodyParser.json())
//设置跨域
app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:6060')
    res.header('Access-Control-Allow-Headers','Content-Type,Token')
    res.header('Content-Type','application/json;charset=utf-8')
    next()
})

//商品列表接口
const options = {
  hostname: 'www.lb717.com',
  port: 80,
  path: '/mall/index/getGoodsChannel',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
};

app.post('/mall/index/getGoodsChannel', function(req,res){
    let data = '';
    let request = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
            data += chunk
        });
        response.on('end', () => {
            res.end(JSON.stringify(data))
        });
    })
    request.write(querystring.stringify(req.body))
    request.end()
    console.log(req.body)
})

const fs = require('fs')

app.post('/user/register',function(req,res){
    let user = fs.readFileSync('user.json',{encoding:"utf-8"});
    user = JSON.parse(user);
    user.push(req.body);
    fs.writeFile('user.json',JSON.stringify(user),function(){
        res.end(JSON.stringify({
            "success":1,
            "info":"register success"
        }))
    }) 
})

app.post('/user/login',function(req,res){
    let user = fs.readFileSync('user.json',{encoding:"utf-8"});
    user = JSON.parse(user);
    let login =req.body;
    let resInfo = {
        success:0,
        info:'用户名或密码错误',
        token:' '
    }
    user.forEach((usr)=>{
        if(usr.userName==login.userName && usr.password==login.password){
            resInfo.success=1;
            resInfo.info='login success'
        }
    });
    if(resInfo.success==1){
        resInfo.token = jwt.sign(login,'111',{
            expiresIn:6000
        })
    }
    res.end(JSON.stringify(resInfo))
})

//添加购物车
app.post('/user/Cart/addCart',function(req,res){
    jwt.verify(req.body.token,"1511",(err,decoded)=>{
        if(err){
            res.end(JSON.stringify({
                info:"登录过期，请重新登陆",
                detail:err.TokenExpiredError
            }))
        }else{
            let cartInfo = JSON.parse(fs.readFileSync('./data/cart_info.json', { encoding: 'utf-8' }));
                let reqBody = req.body.goods_info;
                reqBody.count = 1; 
                reqBody.selected = 0; 
                let recordList = cartInfo[decode.user];
                if (recordList) {
                    let flag = false; 
                    recordList.forEach(item => {
                        if (item.goods_id === reqBody.goods_id) {
                            ++item.count;
                            flag = true;
                        }
                    });
                    if (!flag) {
                        cartInfo[decode.user].push(reqBody)
                    }
                } else {
                    cartInfo[decode.user] = [reqBody]
                }

                fs.writeFile('./data/cart_info.json', JSON.stringify(cartInfo), 'utf-8', (err) => {
                    if (err) throw err;
                    res.send({ message: 'addCart sucess' })
                });
        }
    })
})
// 用户删除购物车商品
    app.post('/user/cart/delCartGoods', (req, res) => {
        let CartGoodsList = JSON.parse(fs.readFileSync('./data/cart_info.json', 'utf-8'))
        jwt.verify(req.body.token, '1511', (err, decode) => {
            if (err) {
                res.send({ err: err })
            } else {
                let cartUserGoodsList = CartGoodsList[decode.user];
                let delGoodsID = _.remove(cartUserGoodsList, item => {
                    return req.body.selectedID.indexOf(item.goods_id) > -1
                });
                CartGoodsList[decode.user] = cartUserGoodsList;
                fs.writeFile('./data/cart_info.json', JSON.stringify(CartGoodsList), (err) => {
                    res.json({
                        code: 1,
                        message: '选中商品已删除',
                        delGoodsID: delGoodsID,
                        remainGoods: cartUserGoodsList
                    })
                })
            }
        })
    })

app.listen(9000,()=> {
    console.log('server listen 9000')
})