<template>
    <div class="yk-node-card" :style="{width:width}">
        <div class="top">
            <div class="data">
            2025.05.20
            </div>
        </div>
        <p class="message">
            this is a test message from Closure.
            aaa
            abbbb
            dddddd/
            bbb\\\
            aaa
        </p>
        <div class="foot">
            <div class="foot-left">
                <span class="iconfont icon-zan1"></span>
                <span class="iconfont icon-shoucang1">1</span>
            </div>

            <div class="author">closure</div>
        </div>
    </div>

</template>

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

<style lang="less" scoped> 
.yk-node-card {
    background: rgba(154, 172,1,0.9);
    height: 240px;
    padding: 10px;
    position: relative;  // ?
}   

.top {
    color: @gray-1;
}

.message {
    height: 140px;
    font-family: HanziPenSC-W3;
    font-size: 14px;
    color: #202020;
    letter-spacing: 0;
    text-align: justify;
    line-height: 22px;
    font-weight: 400;
}

.foot {
    display: flex;
    justify-content: space-between; // ?
    bottom: 16px;
    position: absolute;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;  // ?
    width: 100%;

    .foot-left {
        span {
            font-size: 12px;
            color: @gray-1;
            letter-spacing: 0;
            text-align: justify;
            line-height: 16px;
            font-weight: 400;
            
        }
        // .iconfont {

        // }
    }
}

</style>