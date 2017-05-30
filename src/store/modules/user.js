import user from '../../api/user'
import * as types from '../mutation-types'

/**
 * state
 * @type {Object}
 */
const state={
	userName:null,
	userId:null
}
/**
 * actions
 * @type {Object}
 */
const actions={
	validateUser({commit,state}){
		user.validateUser().then((_user)=>{
			commit(types.VALIDATE_USER,{
				_user
			})
		})
	},
	clearUser({commit,state}){
		commit(types.CLEAR_USER)
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
	},
	[types.CLEAR_USER](state){
		state.userName=null
		state.userId=null
	}
}


export default {
	state,
	actions,
	mutations
}
