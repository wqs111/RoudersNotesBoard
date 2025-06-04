<template>
    <transition name="down">
        <div class="yk-message" v-if="isShow">
            <div class="yk-m-i">
                <i class="iconfont" :class="style[type].icon"></i>
                <span class="text">{{ message }}</span>
            </div>
        </div> 

    </transition>    

</template>

<script>
import { onMounted, ref } from 'vue';


export default {
    name: "YkMessage",
    props: {
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String, 
            default: "warn", // success warn error
        },

    },
    setup() {
        const style = {
            warning: {
                icon: "icon-shuaxin",
            },
            error: {
                icon: "icon-guanbijiantou",
            },
            success: {
                icon: "icon-zan1",
            },
        }

        const isShow = ref(false)

        // 等dom渲染完成后赋值
        onMounted(() => {
            isShow.value = true
            setTimeout(() => {
                isShow.value = false;
            }, 3000)
        })

        return { style, isShow };
    }
}
</script>

<style lang="less" scoped>

.yk-message {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-40%, -50%);
    min-width: 220px;
    background: #fff;
    color: #333;
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    padding: 14px 32px;
    z-index: 10000;
    display: flex;
    align-items: center;
    font-size: 16px;
    opacity: 0.98;
}

.yk-m-i {
    display: flex;
    align-items: center;
    gap: 8px;
}

.down-enter-active,
.down-leave-active {
    transition: all 0.4s cubic-bezier(.55,0,.1,1);
}
.down-enter-from {
    opacity: 0;
    transform: translateY(-40px) scale(0.95);
}
.down-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}
.down-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}
.down-leave-to {
    opacity: 0;
    transform: translateY(-40px) scale(0.95);
}

</style>