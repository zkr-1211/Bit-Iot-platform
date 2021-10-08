import request from '@/utils/request/v4';
export function getMqttList(query) {
    return request({
        url: '/api/v1/mqtt/list?id=' + query.id,
        method: 'GET',
    });
}