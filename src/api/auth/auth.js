import request from '@/utils/request/v4';
import qs from 'qs'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
export function RegisterApi(data) {
    return request({
        url: '/api/v1/account/register',
        method: 'POST',
        data: qs.stringify(data),
        headers
    });
}
export function LoginApi(data) {
    return request({
        url: '/api/v1/account/login',
        method: 'POST',
        data: qs.stringify(data),
        headers
    });
}
export function Logout(data) {
    return request({
        url: '/api/v1/account/logout',
        method: 'POST',
        data: qs.stringify(data),
        headers
    });
}