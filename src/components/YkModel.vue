<template>
    <div class="yk-model">
        <div class="yk-model-head">
            <p class="model-name">写留言</p>
            <span class="iconfont icon-guanbijiantou"></span>
            
        </div>

        <slot></slot>
    </div>

</template>

<script>
export default {

}
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
    }
}

</style>