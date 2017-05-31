/**
 * mocking client-server processing
 */

const _user={
	"userName":"wangwang",
	"userId":33814
}

export default {
	validateUser(){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(_user)
			},1000)
		})
	}
}