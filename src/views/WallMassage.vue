<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>

        <div class="label">
            <p class="label-list" :class="{lselected:nlabel==-1}"
                @click="selectNode(-1)"
            >All</p>
            <p class="label-list" v-for="(e, index) in label[id]" :key="index"
            :class="{lselected:nlabel==index}" @click="selectNode(index)"
            >{{ e }}</p>
        </div>
        <div class="card">
            <node-card-vue v-for="(e, index) in note" :key="index" :note="e"
                class="card-inner"
            ></node-card-vue>
        </div>
        
        <!-- add message button -->
        <div class="add">
            <span class="iconfont icon-zengjia"></span>
        </div>

        <yk-model :model-title=title></yk-model>

    </div>
</template>

<script>
import { wallType, label } from '@/utils/data';
import {node} from '../../mock/index'
import NodeCardVue from '@/components/NodeCard.vue';
import YkModel from '@/components/YkModel.vue';
export default {
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
    components: {
        NodeCardVue,
        YkModel,
    },

    methods: {
        selectNode(e) {
            this.nlabel = e;
        }
    },
}
</script>

<style lang="less" scoped>
.wall-message {
    min-height: 100vh;  // 确保撑满整个视口高度
    padding-top: 0;

    .title {
        color: @gray-0;
        font-size: 56px;
        text-align: center;
        font-weight: 600;
    }

    .slogan {
        color: @gray-1;
        text-align: center;
    }

    .label {
        display: block;
        display: flex;
        justify-content: center;
        margin-top: 40px;

        .label-list {
            padding: 0 14px;
            line-height: 28px;
            margin: @padding-4;
            color: @gray-1;
        }
    }
    .lselected {
        color: @gray-0;
        font-weight: 600;
        border: 1px solid rgba(32,32,32, 0.9);
    }
    .card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 28px;
        border: 1px;

        .card-inner {
            margin: 6px;
        }
    }

    .add {
        width: 56px;
        height: 56px;
        background: @gray-1;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        position: fixed;
        right: 30px;
        bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-zengjia {
            color: @gray-10;  // #ffffff
            font-size: 24px;
        }
    }
}
</style>