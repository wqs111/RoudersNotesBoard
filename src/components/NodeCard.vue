<template>
    <div class="yk-node-card" :style="{width:width, background: cardColor[note.color]}">
        <div class="top">
            <p class="time">
            {{ getTime() }}
            </p>

            <p class="label">  {{  getLabel() }}  </p>

        </div>
        <p class="message" @click="toDetail">
            <!-- this is a test message from Closure. -->
            {{ note.message }}
        </p>
        <div class="foot">
            <div class="foot-left">
                <div id="icon">
                    <span v-if="note.islike?.[0]?.count == 0" class="iconfont icon-zan1" @click="clickLike"></span>
                    <span v-else class="iconfont icon-zan" :class="{ liked: note.islike?.[0]?.count > 0 }"></span>
                    <span class="value">{{ note.like?.[0]?.count ?? 0 }}</span>
                </div>
                <!-- <div id="icon">
                    <span class="iconfont icon-shoucang1"></span>
                    <span class="value">nouse</span>
                </div> -->
                <div id="icon" >
                    <span class="iconfont icon-xiaoxi"></span>
                    <span class="value">{{ note.comcount?.[0]?.count ?? 0}}</span>
                </div>
            </div>

            <div class="author">{{ note.name }}</div>
        </div>
    </div>

</template>

<script> 

import { insertFeedbackApi } from '@/api';
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

    computed: {
        card() { // props不可变
            return this.note;
        }
    },

    methods: {
        getLabel() {
            return label[this.note.type][this.note.label];
        },
        getTime() {
            return dateOne(this.note.moment);
        },
        toDetail() {
            this.$emit('toDetail');
        },

        clickLike() {
            console.log(this.note);
            if (this.note.islike[0].count == 0) {
                let data = {
                    wallId: this.note.id,
                    userId: this.note.userId,
                    type: 0,   // like type
                    moment: new Date(),
                };
                insertFeedbackApi(data)
                    .then(() => {
                        this.$emit('like', this.note.id);
                    })
                    .catch((err) => {
                        console.error('点赞失败', err);

                    });
            }
        }
    },

    created() {
        // console.log(this.note.comment);
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
    .iconfont {
        cursor: pointer;
        transition: color 0.2s, font-size 0.2s;
    }
    .icon-zan1:hover {
        color: #e74c3c;      // 悬浮时变红
        font-size: 22px;     // 悬浮时变大
    }
    .icon-zan1.liked {
        color: #e74c3c;      // 点赞后保持红色
        font-size: 15px;     // 恢复原大小
    }
}
}

</style>