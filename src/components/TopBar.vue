<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/logo.png" class="logo-img" />
            <p class="logo-name">Rhodes Board</p>
        </div>
        <div class="menu">
            <yk-button-vue nom="cprimary" class="menu-message">留言板</yk-button-vue>
            <yk-button-vue nom="csecondary" class="photo">照片墙</yk-button-vue>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script>
import YkButtonVue from './YkButton.vue';
export default {
    data() {
        return {

        }
    }, 
    components: {
        YkButtonVue,
    }
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