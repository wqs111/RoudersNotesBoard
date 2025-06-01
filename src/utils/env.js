/**
 * 编译环境和上线环境切换
 * 
 * baseUrl 域名地址
 * routerMode  路由模式
 * baseImgPath 图片存放地址
 * 
 */

let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;


if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
    baseImgPath = 'http://localhost:3000';
} else {
    // real url
    baseUrl = 'http://localhost:3000';
    baseImgPath = 'http://localhost:3000';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}