//反向代理
module.exports= {
    devServer:{
        proxy:{
            '/api':{
                target:'https://m.maoyan.com/',
                changeOrigin:true,
                //重写路径
                pathRewrite:{'^/api':''}
            }
        }
    }
}
