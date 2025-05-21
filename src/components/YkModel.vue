<template>
    <div class="yk-model" v-if="isModel">
        <div class="yk-model-head">
            <p class="model-name">{{ modelTitle }}</p>
            <span class="iconfont icon-guanbijiantou" @click="closeModel"></span>
            
        </div>

        <slot></slot>
    </div>

</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
    modelTitle: {
        default: '标题',
    },
    isModel: {
        default: true,
    },
})

const emit = defineEmits(['clooooose']);

function closeModel() {
    emit('clooooose');
}

onMounted(closeModel); // what's this?
// ai：在组件挂载（渲染到页面）后，自动执行一次 closeModel 方法。

console.log(props);

</script>

<style lang="less" scoped>
.yk-model {
    width: 360px;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.08); 
    // 毛玻璃效果
    backdrop-filter: blur(20px);

    padding: 20px;
    box-sizing: border-box;  // ? 
    
    .yk-model-head {
        display: flex;
        justify-content: space-between;

        .model-name {
            font-size: 16px;
            color: @gray-0;
            font-weight: 600;
        }

        .icon-guanbijiantou {
            clear: @gray-1;
            cursor: pointer;  // 点击手势
            padding: 0 12px;
        }

        margin-bottom: 12px;
    }
}

</style>