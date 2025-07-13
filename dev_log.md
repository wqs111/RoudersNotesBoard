---
title: note-board
date: 2025-07-13 15:43:03
categories:
  - 计算机
tags:
  - 笔记
---

# WalkThrough

自定义内容：开发静态分支并部署，定制ai角色通过post请求回复用户。



## 前端

### 配置环境

官网安装nodejs，命令行安装vue： `npm install -g @vue/cli` ；

创建项目`vue create yike`  选择默认Vue3+Eslint（Vue CLI v5.0.8). 更推荐使用Vite构建。



进入工作目录 `cd yike`，预览 `npm run serve`



在根目录创建static，mock目录存放静态文件和无后端时的测试数据；新建src/assets/fonts/目录存放字体，src/api/存放接口，src/router/存放路由，src/store/保存状态，utils/工具包，styles/， views/



```makefile
yike 主要文件目录
├─public
├─mock
├─src
│  ├─api
│  ├─assets
│  │  └─fonts
│  ├─components
│  ├─router
│  ├─store
│  ├─styles
|  ├─views
│  └─utils
└─static
```



安装路由插件 `npm install vue-router --save`

新建文件 router/index.js, views/YikeIndex.vue

移除App.vue中所有的默认内容并删除helloworld.vue

```jsx
<template>
  <router-view></router-view>
</template>

  <script>


  export default {
    name: 'App',
    components: {

    }
  }
    </script>

    ...
```



更新index.js

```jsx
import { createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/YikeIndex')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
```

疑问：为什么需要路由？它周围的函数是做什么的？

单页面应用通常只有一个html文件，切换不同页面的功能其实是利用路由切换显示的组件，并非页面的跳转。

在mainjs引入路由

```jsx
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index' // @ what is it?

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)

app.mount('#app')

```

实现了根页面是YikeIndex的内容。



提前引入Vuex `npm install vuex@next --save`，按照官网实例写一个index文件

```jsx
import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store;
```

main引入



关于样式，安装less插件 `npm install less less-loader --save`

```jsx
// 示例
<style lang="less" scoped>
.title {
    font-size: 24px;
}
</style>
```

在创建styles/common.less 文件备用。

引入axios `npm install axios --save`，`npm install vue-axios --save`

```jsx
/* src/main.js */
import axios from 'axios'
import VueAxios from 'vue-axios'
...
app.use(VueAxios, axios)

/* src/views/YikeIndex.js 
  写入如下测试代码
  查看控制台发现Object ， 返回值200
*/
<script>
export default {
    data() {
        return {
            aaa: '',
        }
    },

    components: {

    },

    computed: {

    },

    created() {
        this.getUser();
    },

    methods: {
        getUser() {
            this.axios.post("http://182.61.20.123:3001/singin/match", { data: 'aaa', pwd: 'bbb' })
                .then((res) => {
                    console.log(res)
                
            })
        }
    }
}
</script>
```



--------------------

### 引入文件

修改网页图标和标题，替换favicon.ico文件

public/index中的<title>xxx</title>



编辑公共样式commons.less

```css
// Colors whats the @ means? 
// @ declear the following string is a mutable value
@primary-color: #3b73f0;
@link-color: #1890ff;
@success-color: #22bf87;
@warning-color: #f67770;
@error-color: #f35248;

// 中性色
@gray-0: #202020;
@gray-1: #5b5b5b;
@gray-2: #949494;
@gray-9: #f6f6f8;
@gray-10: #ffffff;

// font style
@size-12: 12px;
@size-14: 14px;
@size-16: 16px;

// 间距
@padding-4: 4px;
@padding-8: 8px;
@padding-12: 12px;
@padding-20: 20px;

body {
  padding:0px;
  margin:0px;
  line-height: 1.5;
  color: @gray-0;
font-size: @size-14;
background-color: @gray-10;
transition: all 0.3s;   // all css 0.3s 平滑过渡
font-family: Arial, Helvetica, sans-serif;
-webkit-font-smoothing: antialiased; // 抗锯齿
-moz-osx-font-smoothing: grayscale;
}

p {
  padding: 0;
  margin: 0;
}

li {
  list-style: none; // no point in list
}

img {
  padding: 0;
  margin: 0;
  display: block; // better
}

a {
  text-decoration: none;
  &:hover  {
    text-decoration: underline;
  }
}

input, textarea {
  outline: none;
}
```

单页面引入

```css
<style lang="less">
@import url(./styles/commons.less);
.ab {
  font-size: @size-16;
  color: @warning-color;
}
</style>
```

此方法不能实现全局引入

安装插件`npm i style-resources-loader --save-dev`，`npm i vue-cli-plugin-style-resources-loader --save-dev`

全局导入

```css
// vue.config.js

// include less
const path = require("path");
const { prependListener } = require('process');
module.exports = {
  pluginOptions: {
  "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/commons.less")],
    }
  }
}
```

此后可无`@import url(./styles/commons.less);`直接使用less-styles



导入矢量图，在fonticon找一些图放进购物车保存到项目，下载解压的文件夹放入assets/font/下，在Appvue的style部分导入`@import './assets/fonts/basic_icon/iconfont.css';`，参照文件夹中的demo网页使用矢量图，例如`<span class="iconfont icon-zan1"></span>`



-------------------

### 页面编写

设计页面结构

新建views/WallMessage.vue,更新路由重定向到wall

```css
// YikeIndex.vue
<template>
    <div>
        <p>index of views</p>
        <p class="title"> Rouderls board</p>
        <router-view></router-view>   // new add
    </div>
</template>

// router/index.js
const routes = [
    {
        path: '/',
        redirect: '/wall',
        name: 'index',
        component: () => import('../views/YikeIndex'),
        children: [
            {
                path: 'wall',
                component: () => import('../views/WallMassage')
            }
        ],
    }
]
```



编写top部分组件

在YikeIndex导入，注册，使用组件

```css
<template>
    <div>
        <video class="bg-video"></video>
        <topBar></topBar>
        <router-view></router-view>
    </div>
</template>
...
import topBar from '@/components/TopBar.vue'
...
    components: {
        topBar,
    },
```

还可以放一个背景（z-index: -1 使其永远在底下）视频效果作为可选项。（跳过P5 20min）



设计topbar样式，使其接近可用

```css
<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/logo.png" class="logo-img" />
            <p class="logo-name">Rouderls Board</p>
        </div>
        <div class="menu">some menu</div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top-bar {
    width: 100%;
    height: 52px;
    background-color: rgba(255,255,255,0.80);
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
    backdrop-filter: blur(10px);
    padding: 0 30px;
    box-sizing: border-box; // 便于计算padding

    position: fixed; // bar永远在最上层
    top: 0;
    left: 0;
    z-index: 9999;

    display: flex;  // 居中 三等分
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 200px;
        display: flex;
        align-items: center;

        .logo-name {
            font-size: 20px;
            color: @gray-0;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 600;
            padding-right: 15px;
        }
    }

    .user {
        width: 200px;
        .user-head {
            float: right;  // 靠右

            // 用户头像 圆形渐变色
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, #7be7ff 2%,#1e85e2 100%);
        }
    }
}

.logo-img {
    height: 30px;
}
</style>
```



创建button组件，同样在conponents下创建，在topBar内引入，注册

疑问 引入名是YkButtonVue，为什么html标签使用<yk-button-vue>一样效果？

A: vue自动将大驼峰改成了小写连字符的格式的html标签



在button中使用<slot>标签能将传入的文字写在按钮中，防止button内部将文字定死。

定义按钮样式

疑问 `:class` 是什么?  变量？

《button class未确定》

开始涉及vue语法



速通了footbar部分。为了使其保持在底部，将主题部分`min-height: 100vh`填满整个页面。

-----------------------------------

#### 编写主体

utils/data.js 设置假数据

```css
export const wallType = [
    {
        name: '留言板',
        slogan: '这片大地上可否有你不能忘却之事？'
    },
    {
        name: '照片墙',
        slogan: '很多事情值得记录，当然也值得回味。'
    }
];

export const label = [
    ['留言', '目标', '理想', '过去', '将来', '爱情', '亲情', '友情', '秘密', '信条', '无题'],
    ['me', 'ta','like','life','sky','city','sea'],
]
```



将列表内容用循环展示出来

`<p class="label-list" v-for="(e, index) in label[id]" :key="index">{{ e }}</p>`

疑问 什么意思？

在html里面写js需要{}包裹，这里不能用-连字符，html标签会使用连字符，为什么？



设置nlabel变量记录当前选择的标签，默认-1对应All。关注第2-7行。

编写对应方法设置index，@click 识别鼠标事件

```vue
<div class="label">
  <p class="label-list" :class="{lselected:nlabel==-1}"
    @click="selectNode(-1)"
    >All</p>
  <p class="label-list" v-for="(e, index) in label[id]" :key="index"
    :class="{lselected:nlabel==index}" @click="selectNode(index)"
    >{{ e }}</p>
</div>

<script>
  import { wallType, label } from '@/utils/data';
  export default {
    data() {
      return {
        wallType,
        label,
        id: 0,  // 切换留言板和照片墙
        nlabel: -1,  // 选中的标签，默认-1 all
      }
    },

    methods: {
      selectNode(e) {
        this.nlabel = e;
      }
    },
  }
</script>
```



创建note卡片，引入

编写css，处理hover情况，考虑将其纳入common.less库

引入字体

```vue
<style >
  @font-face {
    font-family: fa;
    src: url("@/assets/fonts/xxx.tty");
  }
</style>
```



--------------------------

引入后端模拟数据`npm i mockjs --save`

./mock/index.js

```json
let Mock = require('mockjs')

export const node = Mock.mock({
  "data|20": [{
    "moment": new Date(),
    "id|+1": 1,
    "userId|+1": 10,
    "message|24-96": "@cword",
    "label|0-10": 0,
    "name": "@cname",
    "like|0-120": 0,
    "favor|0-120": 0,
    "comment|0|120": 0,
    "imgurl|0-4": 0,
    "revoke|0-20": 0,
    "report|0-20": 0,
  }]
})
```

疑问？ 芝士神魔: 按照一定规则设计的假数据



card展示， :表示变量，传入组件内部的props中

```javascript
// wallMassage.vue
<div class="card">
  <node-card-vue v-for="(e, index) in node" :key="index" :note="e"
class="card-inner"
  ></node-card-vue>
  </div>


  // card.vue
  <script>
  export default {
    props: {
      width: {
        default: '288px',
      },
      note: {
        default: {

        },
      }
    }
  }
    </script>
```



现在我们尝试把mock生成的模拟数据显示到我们的卡片中。在。 WallMessage里面导入node。将其中的数据作为参数传入到Card组件。

```javascript
// WallMessage vue
import {node} from '../../mock/index'
export default {
    data() {
        return {
            wallType,
            label,
            id: 0,  // 切换留言板和照片墙
            nlabel: -1,  // 选中的标签，默认-1 all
            note: node.data,  // 取出node内的数据，记名为note
        }
    },


// 定义变量 :note,将note数值的参数e存入组件的props中。
// 此处的 v-for="(e, index) in note" 为vue 的foreach循环
<node-card-vue v-for="(e, index) in note" :key="index" :note="e"
    class="card-inner"
></node-card-vue>  
```

这一块。今天遇到了很多次莫名其妙的崩溃。然后莫名其妙的排查注意到是main.js路由引入的时候使用了@(默认代指src/)，尝试改成点号再去导入就莫名其妙的修好了。我也不知道为什么。~~但是用点号写是最保险的所以还是尽量点号吧。~~ 浏览器缓存可能不会及时更新，刷新后才是真正最新的代码，和@的使用无关。



最后我是一步一步通过log调试，用method属性返回label的这个标签，然后在网页HTML里边通过调用getlabel方法来成功显示。



接下来处理一下time的显示，源数据太长了，需要优化。创建utils/yksg.js 

```javascript
// better time shown
export const dateOne = (e) => {
    let d = new Date(e);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let D = d.getDate();

    if (D < 10) {  // 补零
        D = '0' + D;
    }

    if (m < 10) {
        m = '0' + m;
    }

    let dates = y + '.' + m + '.' + D;
    return dates;
} 
```



添加 add按钮，并使其固定在页面右下角，但不进入footbar（可选，动画效果P12t10min）



同理创建model组件用于新建留言。

```vue
// 毛玻璃效果
    backdrop-filter: blur(10px);
```



因为`写留言`这个标题会变成发照片之类的变量，尝试setup语法糖，创建title参数，经组件导入

```javascript
<yk-model :model-title=title></yk-model>

    data() {
        return {
            wallType,
            label,
            id: 0,  // 切换留言板和照片墙
            nlabel: -1,  // 选中的标签，默认-1 all
            note: node.data,
            title: '写留言',
        }
    },
// -------------------------
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    modelTitle: {
        default: '标题',
    },
})

console.log(props);

</script>

<p class="model-name">{{ modelTitle }}</p>
```



为了实现model组件的开关，创建isModel的bool值，使用v-if语法管理model是否显示。该值交由父级控制：引入defineEmits

……

跳过弹出动画P15

……

newCard组件，插入到ykModel内的<slot>中。



选中便签颜色的CSS为`colorselected`，在v-for中有变量index, colorSelected(默认为0，有点击方法将其设置为index)，可选颜色标签中有是否启动CSS的判断语句`:class="{colorselected: index==colorSelected}"`,判断为true时加上该CSS表示选中该颜色。

```javascript
<p class="color-li" v-for="(e, index) in cardColor1" :key="index" 
    :style="{background: e}" :class="{colorselected:index==colorSelected}"
    @click="changeColor(index)"

></p>

data() {
    return {
        cardColor1,
        cardColor,
        colorSelected: 0,  // current color
    }
},
methods: {
    changeColor(index) {
        this.colorSelected = index;
    }
}


.colorselected {
    border: 1px solid rgba(59,115,240,1);
}
```

简单动画效果P16t25min。



v-model绑定textarea，input变量

@click=“functionName” 函数可以不用加括号，也可以加括号，两种写法都可以。



关于留言板和照片墙的切换，涉及路由`/wall?id=0`

```vue
computed: {
        id() {
            return this.$route.query.id; // current page id
        }
    },
```



根据id的变化切换按钮的颜色，nom加冒号转为变量？

<yk-button-vue :nom="id==0? 'cprimary' : 'csecondary'" class="menu-message">留言板</yk-button-vue>

点击事件修改id

```vue
methods: {
        changeWall(newid) {
            this.$router.push({
                query: {id: newid},
            })
        }
    },
```



进入wallMessage.vue,创建上文同样的id(),并删去data()中的id，此时id由两个按钮控制，title和label可以动态响应。（记得给card组件加上v-show="id==0"）



疑问 v-show 和 v-if 有什么区别？ 似乎都管理是否显示

A： show通过display样式管理元素的显示，比较快，if则为true才渲染DOM元素，比较慢。



路由完全看不懂，什么原理？

v-for到底是怎么运作的，为什么传入e？挖个坑，深入Vue时探究。

![](https://cdn.nlark.com/yuque/0/2025/png/40756445/1748184061292-682f738d-d0c8-4fee-b37f-09536da81b28.png)



## 后端

在根目录同级创建server/

`cd server && npm i express --save` 

推荐使用nodemon插件热编译



### 配置环境

在wsl中用docker起mysql

`docker run --name yikeSql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=WALL -p 3306:3306 -d mysql:8.0`

![](https://cdn.nlark.com/yuque/0/2025/png/40756445/1748345831866-4336a68b-a22d-46ee-8ee2-cf952707c64d.png)

注：HOST还是填localhost

修改mysql权限允许密码登录

![](https://cdn.nlark.com/yuque/0/2025/png/40756445/1748349308162-e1137f69-b267-43ae-baac-27c3ba1224d2.png)

`docker exec -it yikeSql mysql -uroot -p`进入mysq cli

`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; FLUSH PRIVILEGES; `    

一些mysql命令（全部以分号结尾）

```sql
show databases; 
use databasename;
show tables;
select * from tablename;
```





再启动 `docker start name`

2025/5/27可用docker镜像

```javascript
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev",
    "https://proxy.1panel.live",
    "https://docker.1panel.top",
    "https://docker.m.daocloud.io",
    "https://docker.1ms.run",
    "https://docker.ketches.cn"
  ]
}
```

> [https://cloud.tencent.com/developer/article/2483548](https://cloud.tencent.com/developer/article/2483548)



在server文件夹下创建index.js,引入一些库,启动express，

```javascript
const express = require('express')
const path = require('path')

let ejs = require('ejs')
let config = require('./config/default')

const app = express()
```

设置跨域（允许浏览器访问），

```javascript
// 跨域中间件，放在挂载文件前面
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})
```

映射静态文件，

```javascript
// 将文件夹内文件映射到/根目录下
// 如果你想通过 http://localhost:3000/views/index.html 访问，需要这样写：
// app.use('/views', express.static(__dirname + '/views'))

app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/data'))
app.use(express.static(__dirname + '/views'))
```

设置html视图？ 疑问

```javascript
app.engine('html', ejs.__express)
app.set('view engine', 'html')
```



引入路由： `require('./routes/index')(app)`创建server/routes/index.js

```javascript
module.exports = function (app) {
    // 示例路由 挂载静态文件后的test.html
    app.get('/test', (req, res) => {
        res.type('html');
        res.render('test');

    });
}
```

监听端口3000

将一些基础配置保存至server/config/default.js

```javascript
const config = {
    port: 3000, // 启动端口号
    database: {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: "123456",
        WALL: 'WALL', // database name
    }
}

module.exports = config;
```





### 数据库操作

```javascript
const mysql = require('mysql')
let config = require('../config/default')


const db = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
})

// 链接指定数据库 连接池，适合高并发服务，推荐用于 Express 项目。
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database:config.database.WALL,
})

// 这个变量什么意思 query
// sql：要执行的 SQL 查询语句。
// values：SQL 查询语句中的参数值，用于防止 SQL 注入。
// usePool：一个布尔值，用于指定是否使用数据库连接池。默认为 false，表示不使用连接池。
let bdbs = (sql, values, usePool = false) => {
    return new Promise((resolve, reject) => {
        const conn = usePool ? pool : db;
        conn.query(sql, values, (err, reslut) => {
            if (err) {
                reject(err)
            } else {
                resolve(reslut)
            }
        })
    })
}

// create database
let WALL = `create database if not exists WALL default charset utf8 collate utf8_general_ci;`

let createDatabase = (db) => {
    return bdbs(db, [], false)
}

// create table
// walls notes or photo
let walls = `create table if not exists walls(
    id INT NOT NULL AUTO_INCREMENT,
    type INT NOT NULL COMMENT '0NOTE1PIC',
    message VARCHAR(1000) COMMENT '留言',
    name VARCHAR(100) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    label INT NOT NULL,
    color INT COMMENT '',
    imgurl VARCHAR(100) COMMENT '',
    PRIMARY KEY ( id )  
);`

let feedbacks = `
    create table if not exists feedbacks(
        id INT NOT NULL AUTO_INCREMENT,
        wallId INT NOT NULL,
        userId VARCHAR(100) NOT NULL,
        type INT NOT NULL,
        moment VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );
`

let comments = `
    create table if not exists comments(
        id INT NOT NULL AUTO_INCREMENT,
        wallId INT NOT NULL,
        userId VARCHAR(100) NOT NULL,
        imgurl VARCHAR(100),
        comment  VARCHAR(1000),
        name VARCHAR(100) NOT NULL,
        moment VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );
`

let createTable = (sql) => {
    return bdbs(sql, [], true)
}

// 先建库再建表
async function create() {
    await createDatabase(WALL);
    createTable(walls);
    createTable(feedbacks);
    createTable(comments);
}

create();
```

编写插入note语句

```javascript
// add new note/pic
exports.insertWall = (value) => {
    let _sql = "insert into walls set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?;"
    return query(_sql, value);  // bdbs(sql, val, true) 
}
```

在server/controller/dbServe.js引入上述文件，拿到前端数据插入数据库，

```javascript
const db = require('../lib/db')

exports.insertWall = async (req, res) => {
    let i = req.body;
    await db.insertWall([i.type, i.message, i.name, i.userId, i.moment, i.label, i.color, i.imgurl])
        .then(result => {
            res.send({
                code: 200,
                message: result,
        })
    })
}
```

在路由引入dbServe，负责调用插入函数

```javascript
// add new note 与示例路由同级
    app.post('/insertwall', (req, res) => {
        controller.insertWall(req, res);
    })
```

去前端测试

```sql
// newcard methods
        apiTest() {
            let data = {
                type: 0,
                message: 'hello world',
                name: 'doctor',
                userId: '3',
                moment: new Date(),
                label: 0,
                color: 3,
                imgurl: 3,
            } 

            this.axios
                .post("http://localhost:3000/insertwall", data)
                .then((res) => {
                    console.log(res);               
                })
        }
// 
```

暂时注释掉后端insert部分，保留send，查看控制台的log

路由记得带斜杠！我忘了！再试试插入数据库。



前后端连起来了！



## 联调

对生产和上线环境做区分，前端创建utils/env.js,当node_env 为dev时url为localhost，否则为实际的域名地址。

```javascript
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
```

对接后端

接下来使用axios，同样创建utils/axios.js

```javascript
/**
请求拦截器（service.interceptors.request.use）
在每次发送 HTTP 请求前自动执行，可以统一处理请求，比如：

添加 token、用户信息等到请求头
统一设置请求参数
日志记录
请求前的 loading 动画等
错误处理
如果请求配置出错，可以在这里统一处理错误，比如打印日志、弹窗提示等。
*/
import { baseUrl } from "./env";

import axios from "axios";

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },

    // 处理错误请求
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },

    error => {
        console.log(error);
        return Promise.reject();
    }
);
```

为了前后端能统一id的值，使用先前安装的vuex来管理（相当于从后端拿id做前端的全局变量，省的props层层传递）。





在后端创建接收访客ip的路由

前端创建对应api



疑问：this？ （） or ：？

methods下的函数之间调用需要加上this，否则看不到其他函数，

```javascript
const obj = {
  foo() { this.bar(); },
  bar() { /* ... */ }
}
obj.foo(); // 正确
foo();     // 报错：foo is not defined
```

+ `data() {}` 和 `setup() {}` 都是函数，需要返回数据对象。
+ Vue 会在组件实例化时调用它们，获取返回值作为组件的数据源。
+ `props: {}`、`methods: {}`、`computed: {}` 这些是对象，用来声明属性、方法、计算属性等。
+ Vue 直接读取对象里的内容，不需要执行。

`git gc`（全称：git garbage collect，垃圾回收）是 Git 提供的一个优化和清理本地仓库的命令。它会自动清理和压缩仓库中的无用数据，使仓库体积变小、操作更流畅。



新建一个全局提醒组件文件夹components/sub/message/

把自己的组件在main中导入P34



注销mock的note数据，当note为空时展示“暂无note”的信息和图片，通过require导入图片或直接cdn使用。

何时展示？

isOk: -1, // -1 真实数据准备中， 0 数据为空， 2 没有更多

加载中可以使用lottie显示加载动画P35half



bug：like和comment的计数的显示错误，前后端数据接口对不上，暂改为count

`{{ note.comment[0].count }}`



向后端请求数据时请求1个pagesize的card数据，可以在后续添加加载更多的选项再请求。



现在处理点击创建按钮时将card插入到首位的功能。



区分显示“没有card”和“没有更多”的逻辑

两者都有page==0，isOk记录了两者的区别，根据这两个变量做判断。



项目基本功能完成。

[仓库地址]: 



## 参考



[vue+nodejs+mysql项目实战-yike的留言墙]: https://www.bilibili.com/video/BV1Qk4y1j7Tc/?spm_id_from=333.1387.favlist.content.click&amp;vd_source=8ac2181530a4cc04d7392d9646a903d2









