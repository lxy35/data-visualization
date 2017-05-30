import user from '../../api/user'
import * as types from '../mutation-types'

/**
 * state
 * @type {Object}
 */
const state={
	userName:'111',
	userId:null
}
/**
 * actions
 * @type {Object}
 */
const actions={
	validateUser({commit,state},){
		user.validateUser().then((_user)=>{
			commit(types.VALIDATE_USER,{
				_user
			})
		})
	}
}
/**
 * mutations
 * @type {Object}
 */
const mutations={
	[types.VALIDATE_USER](state,{_user}){
		state.userName=_user.userName
		state.userId=_user.userId
	}
}

export default {
	state,
	actions,
	mutations
}
