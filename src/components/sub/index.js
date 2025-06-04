import Message from './message/message'

// 注册全局组件库 app.component(name, filename)  ?存疑

// 导出，用于app.use() 安装组件库使用
export default {
    install(app) {
        // global use `message`
        app.config.globalProperties.$message = Message
    }
}