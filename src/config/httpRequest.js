import { getRequest, httpUrl } from '@/config/network'

// 登录请求
export const LoginRequest = (params) => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/sysLogin', params)
}
