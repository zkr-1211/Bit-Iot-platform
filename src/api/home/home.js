import request from '@/utils/request/v4';
import qs from 'qs'
export function getMqttList(id) {
    return request({
        url: '/api/v1/mqtt/list?id=' + id,
        method: 'GET',
    });
}
export function getPeriodList(id) {
    return request({
        url: '/api/v1/mqtt/period/list?id=' + id,
        method: 'GET',
    });
}
export function createMqtt(data) {
    return request({
        url: '/api/v1/mqtt/new',
        method: 'POST',
        data: qs.stringify(data),
    });
}
export function deleteTask(data) {
    return request({
        url: '/api/v1/mqtt/period/del',
        method: 'POST',
        data: qs.stringify(data),
    });
}
export function deleteMqtt(data) {
    return request({
        url: '/api/v1/mqtt/del',
        method: 'POST',
        data: qs.stringify(data),
    });
}
export function sendMsg(data) {
    return request({
        url: '/api/v1/mqtt/sendmsg',
        method: 'POST',
        data: qs.stringify(data),
    });
}
export function createTask(data) {
    return request({
        url: '/api/v1/mqtt/period',
        method: 'POST',
        data: qs.stringify(data),
    });
}