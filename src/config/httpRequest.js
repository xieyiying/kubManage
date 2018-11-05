import { getRequest, httpUrl } from '@/config/network'

// 登录请求
export const LoginRequest = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/sysLogin', params)
}



/** 用户信息管理 */
// 获取用户信息
export const getUserList = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/listInfo', params)
}
// 修改用户信息
export const updateUserMsg = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/updataForm', params)
}
// 保存用户信息
export const saveUserMsg = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/save', params)
}
// 删除用户信息
export const deleteUserMsg = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/delete', params)
}
// 批量删除用户信息
export const batchDeleteUserMsg = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/deleteAll', params)
}
