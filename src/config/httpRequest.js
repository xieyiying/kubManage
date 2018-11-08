import { getRequest, httpUrl } from '@/config/network'

// 登录请求
export const LoginRequest = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/sysLogin', params)
}

// 获取语言类型接口  中/英
export const getLanguageType = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatPhoto/getlanguageTypeDict', params)
}

// 图片上传接口
export const uploadImage = httpUrl + '/kubgw/page/kubgw/upload/imageUpload'



/** 用户信息管理 */
// 获取用户信息
export const getUserList = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/listInfo', params)
}
// 修改用户信息
export const updateUserMsg = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubUser/updateForm', params)
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


/** 菜单管理 */
// 获取菜单信息
export const getMenuListData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/listInfo', params)
}
// 增加菜单获取sort信息
export const getMenuSortData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/addForm', params)
}
// 修改菜单信息
export const updateMenuData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/updateForm', params)
}
// 保存菜单信息
export const saveMenuData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/save', params)
}
// 删除菜单信息
export const deleteMenuData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/delete', params)
}
// 批量删除菜单信息
export const batchDeleteMenuData = params => {
    return getRequest(httpUrl + '/kubgw/page/kubgw/user/kubmenu/deleteAll', params)
}


/** 首页管理 */
export const homeInterfaceRequest = {
    // 获取首页信息
    getHomeData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatHome/listInfo', params)
    },
    // 修改首页信息
    updateHomeData: (params) => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatHome/updateForm', params)
    },
    // 保存首页信息
    saveHomeData: (params) => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatHome/save', params)
    },
    // 删除首页信息
    deleteHomeData: (params) => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatHome/delete', params)
    },
    // 批量删除首页信息
    batchDeleteHomeData: (params) => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/home/kubNavigatHome/deleteAll', params)
    },
}


/** kub管理 */
export const kubInterfaceRequest = {
    // 获取kub列表
    getListData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/kub/kubNavigatKub/listInfo', params)
    },
    // 修改kub信息
    updateData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/kub/kubNavigatKub/updateForm', params)
    },
    // 保存kub信息
    saveData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/kub/kubNavigatKub/save', params)
    },
    // 删除kub信息
    deleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/kub/kubNavigatKub/delete', params)
    },
    // 批量删除kub信息
    batchDeleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/kub/kubNavigatKub/deleteAll', params)
    },
}


/** 产品管理 */
export const productInterfaceRequest = {
    // 获取列表
    getListData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/listInfo', params)
    },
    // 修改信息
    updateData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/updateForm', params)
    },
    // 保存信息
    saveData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/save', params)
    },
    // 删除信息
    deleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/delete', params)
    },
    // 批量删除信息
    batchDeleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/deleteAll', params)
    },
}


/** 产品详情管理 */
export const productDetialInterfaceRequest = {
    // 获取列表
    getListData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProductDetails/listInfo', params)
    },
    // 获取产品类型信息
    getProductType: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProduct/getKubProductTitleInfo', params)
    },
    // 修改信息
    updateData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProductDetails/updateForm', params)
    },
    // 保存信息
    saveData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProductDetails/save', params)
    },
    // 删除信息
    deleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProductDetails/delete', params)
    },
    // 批量删除信息
    batchDeleteData: params => {
        return getRequest(httpUrl + '/kubgw/page/kubgw/product/kubNavigatProductDetails/deleteAll', params)
    },
}
