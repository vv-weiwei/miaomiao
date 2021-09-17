//反向代理
module.exports= {
    devServer:{
        proxy:{
            '/api2':{
                target:'https://i.maoyan.com',
                changeOrigin:true,
                //重写路径
                pathRewrite:{'^/api2':''}
            },
            '/api':{
                target:'https://m.maoyan.com',
                changeOrigin:true,
                //重写路径
                pathRewrite:{'^/api':''}
            }

        }
    }
}
