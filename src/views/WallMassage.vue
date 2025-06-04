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
        <div class="card" v-show="id==0">
            <node-card-vue v-for="(e, index) in note" :key="index" :note="e"
                class="card-inner" :class="{cardselected: index==cardselected}"
                @click="selectCard(index)"
            ></node-card-vue>
        </div>

        <div class="photo-list" v-show="id==1">
            <PhotoCard :photo="e" v-for="(e, index) in photo" :key="index"></PhotoCard>

        </div>
        
        <!-- add message button -->
        <div class="add" @click="addCard" v-show="!isModel" >
            <span class="iconfont icon-zengjia"></span>
        </div>

        <yk-model :model-title=title @clooooose="changeModel"
            :is-model=isModel 
        >
            <new-card :id="id" @addClose="changeModel" @clickbt="addclick" v-if="cardselected==-1"></new-card> <!-- label接收id区分留言和照片 -->
            <card-detail :note="note[cardselected]" v-if="cardselected!=-1"></card-detail>
        </yk-model>

    </div>
</template>

<script>
import { wallType, label } from '@/utils/data';
import {node, photo} from '../../mock/index'
import NodeCardVue from '@/components/NodeCard.vue';
import YkModel from '@/components/YkModel.vue';
import NewCard from '@/components/NewCard.vue';
import CardDetail from '@/components/CardDetail.vue';
import PhotoCard from '@/components/PhotoCard.vue';
export default {
    data() {
        return {
            wallType,
            label,
            // id: 0, 转为动态，该元素注销  // 切换留言板和照片墙
            nlabel: -1,  // 选中的标签，默认-1 all
            note: node.data,
            photo: photo.data,
            title: '写留言',
            isModel: true,  // add window open or close
            cardselected: -1, // 查看index的card
        }
    },
    components: {
        NodeCardVue,
        YkModel,
        NewCard,
        CardDetail,
        PhotoCard,
    },

    methods: {
        selectNode(e) {
            this.nlabel = e;
        },

        changeModel() {
            // console.log(e);
            this.isModel = !this.isModel;
        },

        selectCard(index) {
            if (index === this.cardselected) {
                this.changeModel();
            } else {
                this.cardselected = index;
                this.title = '查看详情';
                this.isModel = true;
            }
        },

        addCard() {
            this.cardselected = -1;
            this.title = '写留言';
            this.isModel = true;
        },

        addclick(e) {
            console.log("addclick"+e);
            this.changeModel();
        },





    },
    computed: {
        id() {
            return this.$route.query.id; // current page id
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
        margin-top: 100px;
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

        .cardselected {
            border: 1px solid @primary-color;
        }
    }

    .photo-list {
        column-count: 3;         // 3列瀑布流，可根据需要调整
        column-gap: 16px;        // 列间距
        padding: 16px;
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
        cursor: pointer;

        .icon-zengjia {
            color: @gray-10;  // #ffffff
            font-size: 24px;
        }
    }
}
</style>