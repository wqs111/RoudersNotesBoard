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
    </div>
</template>

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
        border: 1px solid rgba(32,32,32, 1);
    }
}
</style>