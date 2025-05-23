<template>
    <div class="yk-node-card" :style="{width:width, background: cardColor[note.imgurl]}">
        <div class="top">
            <p class="time">
            {{ getTime() }}
            </p>

            <p class="label">  {{  getLabel() }}  </p>

        </div>
        <p class="message">
            <!-- this is a test message from Closure. -->
            {{ this.note.message }}
        </p>
        <div class="foot">
            <div class="foot-left">
                <div id="icon">
                    <span class="iconfont icon-zan1"></span>
                    <span class="value">{{ this.note.like }}</span>
                </div>
                <div id="icon">
                    <span class="iconfont icon-shoucang1"></span>
                    <span class="value">{{ note.favor }}</span>
                </div>
                <div id="icon">
                    <span class="iconfont icon-xiaoxi"></span>
                    <span class="value">{{ note.comment }}</span>
                </div>
            </div>

            <div class="author">{{ note.name }}</div>
        </div>
    </div>

</template>

<script> 

import { label, cardColor } from '@/utils/data';
import { dateOne } from '@/utils/yksj';

export default {
    data() {
        return {
            cardColor,
            label,
            dateOne,
        }
    },

    props: {
        width: {
            default: '288px',
        },
        note: {
            type: Object,
            default: () => ({}),
        }
    },

    methods: {
        getLabel() {
            return label[this.note.type][this.note.label];
        },
        getTime() {
            return dateOne(this.note.moment);
        }
    },

    created() {
        console.log(this.note.comment);
        // console.log(label[this.note.type][this.note.label]);
        // console.log(this.getTime());
    },
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
    display: flex;
    justify-content: space-between;
    padding: 0 5px ;

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
        display: flex;
        gap: 8px;
        span {
            font-size: 15px;
            color: @gray-1;
            letter-spacing: 0;
            text-align: justify;
            line-height: 16px;
            font-weight: 400;
            padding: auto;
            
        }
        // .iconfont {

        // }
    }
}

</style>