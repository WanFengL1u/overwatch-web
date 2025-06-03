import request from '@/utils/request';

// 英雄类型新增
export function heroTypeAdd(params: Record<string, any>) {
  return request.post({ url: '/heroType/add', params });
}

// 英雄类型编辑
export function heroTypeEdit(params: Record<string, any>) {
  return request.post({ url: '/heroType/edit', params });
}

// 英雄类型删除
export function heroTypeDelete(params: Record<string, any>) {
  return request.post({ url: '/heroType/del', params });
}

// 英雄类型列表
export function heroTypeLists(params: Record<string, any>) {
  return request.get({ url: '/heroType/list', params });
}


// 英雄类型详情
export function heroTypeDetail(params: Record<string, any>) {
    return request.get({ url: '/heroType/detail', params });
  }