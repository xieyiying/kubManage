// 转换时间戳
export const format = (now, fmt = 'yyyy-MM-dd') => {
    if (typeof now === 'string') {
        now = now.replace(/-/g, '/')
    }
    now = new Date(now)
    const o = {
        'M+': now.getMonth() + 1, // 月份
        'd+': now.getDate(), // 日
        'h+': now.getHours(), // 小时
        'm+': now.getMinutes(), // 分
        's+': now.getSeconds(), // 秒
        'q+': Math.floor((now.getMonth() + 3) / 3), // 季度
        'S': now.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, String(o[k]).padStart(RegExp.$1.length, 0))
        }
    }
    return fmt
}

export const delMethods = (deltype, callback1, params1, callback2, params2) => {
    return new Promise(resolve => {
        if(deltype === 'single') {
            callback1(params1).then(res => {
                resolve(res)
            })
        } else if(deltype === 'multiple') {
            callback2(params2).then(res => {
                if(res.success) {
                    resolve(res)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    })
}