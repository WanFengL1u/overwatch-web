import request from '@/utils/request'

// 英雄列表
export function heroLists(params: any) {
    return request.get({ url: '/hero/list', params })
}

// 添加英雄
export function heroAdd(params: any) {
    return request.post({ url: '/hero/add', params })
}

// 编辑英雄
export function heroEdit(params: any) {
    return request.post({ url: '/hero/edit', params })
}

// 删除英雄
export function heroDelete(params: any) {
    return request.post({ url: '/hero/del', params })
}

// 英雄详情
export function heroDetail(params: any) {
    return request.get({ url: '/hero/detail', params })
}