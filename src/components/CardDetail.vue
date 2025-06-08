<template>
    <div class="card-detail">

        <node-card :note="note"></node-card>

        <div class="comment">
            <textarea name="message" class="message" placeholder="说点什么..."></textarea>
            
        </div>

        <div class="submit">
            <input type="name" class="name" placeholder="签名">
            <YkButton size="small" nom="cprimary" class="sb-btn" >提交</YkButton>
        </div>

        <div class="rr">
            <p class="revoke">联系贴主撕掉该便贴</p>
            <p class="report">汇报人事部</p>
        </div>

        <p class="comment-title">评论 {{ note.comcount && note.comcount[0] ? note.comcount[0].count : 0 }}</p>
        <div class="comment">
            <div class="comment-li" v-for="(e, index) in commentd" :key="index">
                <div class="user-head" :style="{background:portrait[e.imgurl]}">

                </div>
                <div class="com-main">
                    <div class="m-top">
                        <p class="name">{{ e.name }}</p>
                        <p class="time">{{ dateOne(e.moment) }}</p>
                    </div>
                    <div class="com-message">
                        {{ e.message }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script >
import NodeCard from './NodeCard.vue';
import YkButton from './YkButton.vue';
import { comment } from '../../mock/index';
import { portrait } from '@/utils/data'
import { dateOne } from '@/utils/yksj';
export default {
    data() {
        return {
            commentd: comment.data,
            portrait,
            dateOne,
        }
    },

    components: {NodeCard, YkButton},

    props: {
        note: {
            default: {},
        },
    },

    methods: {

    },

    created() {

    }
}
</script>

<style lang="less" scoped>
.card-detail {
    max-height: 100vh;         // 或根据页面实际情况调整
    overflow-y: auto;
    // padding: 16px;
    background: #fff;
    border-radius: 4px;
}
.message {
    margin-top: 10px;
    margin-left: -5px;
    margin-bottom: -16px;
    resize: none;  // fixed height, width
    height: 72px;
    width: 292px;
    border: solid rgb(240, 240, 240);
}

.submit {
    display: flex;
    justify-content: space-between;
    .name {
        width: 70%;
        height: 35px;
        box-sizing: border-box;

        border: solid rgb(240, 240, 240);
    }
 
}


.comment-title {
    font-size: 16px;
    font-weight: 600;
    margin: 18px 0 8px 0;
    color: @gray-1;
}

.comment {
    // max-height: 220px;         // 限制最大高度
    overflow-y: auto;          // 超出时滚动
    background: #fafbfc;
    border-radius: 8px;
    padding: 10px 8px;
    box-sizing: border-box;
    margin-bottom: 16px;
}

.comment-li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
}

.user-head {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #eee;
    margin-right: 10px;
    flex-shrink: 0;
    /* 可加头像背景图 */
}

.com-main {
    flex: 1;
}

.m-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;

    .name {
        font-weight: 600;
        color: @primary-color;
        font-size: 15px;
    }
    .time {
        color: #aaa;
        font-size: 12px;
    }
}

.com-message {
    font-size: 14px;
    color: #222;
    line-height: 1.6;
    word-break: break-all;
}

.rr {
    display: flex;
    justify-content: space-between;
    padding: 8px;

    .revoke {
        color: @primary-color;
        cursor: pointer;
        font-size: 16px;
    }

    .report {
        cursor: pointer;
        font-size: 16px;
        color: @warning-color;
    }
}


</style>