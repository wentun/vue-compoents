import axios from 'axios'

/**
 	* @param 请求options 传值
	* @param method 请求方法
	* @param url 请求路径
	* @param data 请求参数（没有就不传）
	* @param headers 请求头设置
*/

const http = options => {
	return new Promise((resolve, reject) => {
		const defaultOptions = {};	
		const newOptions = {
			...defaultOptions,
			...options
		};
		//headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
		newOptions.headers = {
			...newOptions.headers
		};
		axios({
			method: newOptions.method,
			url: newOptions.url,
			data: newOptions.data,
			headers: newOptions.headers,
		}).then(res => {
			//根据返回的状态码判断
			if (res.status == 200) {
				//对返回数据做统一处理
			if(res.data.return_code == 0){
				resolve(res.data.data);
			}else{
				reject(res.data.return_msg)
			}
			} else {
				reject(res);
			}
		}).catch(err => {
			reject(err);
		})
	})
};

export {
http
}