const path = require('path');
const mockData = require('./mock/selectPar.json')

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/common/global.less')
            ]
        }
    },
    devServer: {
        open: true,
		hot:true,
		port:8080,
        before(app){
			app.get('/api/test',(req,res,next)=>{
				res.json(mockData);
			})
        },
        overlay: {
            warnings: false,
            errors: false
         },
        //  lintOnSave: false
        // proxy: {
        //     '/api': {
        //       target: 'http://localhost:8080',
        //       changeOrigin: true,
        //       pathRewrite: {
        //         '^/api': '/mock'
        //       }
        //     }
        //   }
    }
}