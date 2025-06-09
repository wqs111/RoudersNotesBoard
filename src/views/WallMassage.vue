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
            <!-- note? -->
            <node-card-vue v-for="(e, index) in cards" :key="index" :note="e"
                class="card-inner" :class="{cardselected: index==cardselected}"
                @toDetail="selectCard(index)" @like="handleLike"
            ></node-card-vue>
        </div>

        <div class="photo-list" v-show="id==1">
            <PhotoCard :photo="e" v-for="(e, index) in photo" :key="index"></PhotoCard>

        </div>

        <!-- if no cards -->
         <div class="none-msg" v-if="page == 0 && isOk == 0"> 
            <img width="100" height="100" src="https://img.icons8.com/dusk/100/note.png" alt="note"/>
            <p>{{ none[id].msg }}</p>
         </div>

         <div class="none-msg" v-show="page == 0 && isOk == 1">
            <p>没有更多...</p>
         </div>

        
        <!-- add message button -->
        <div class="add" @click="addCard" v-show="!isModel" >
            <span class="iconfont icon-zengjia"></span>
        </div>

        <yk-model :model-title=title @clooooose="changeModel"
            :is-model=isModel 
        >
            <new-card :id="id" @addClose="changeModel" @clickbt="addclick" v-if="cardselected==-1"></new-card> <!-- label接收id区分留言和照片 -->
            <card-detail :note="cards[cardselected]" v-if="cardselected!=-1"></card-detail>
        </yk-model>

    </div>
</template>

<script>
import { wallType, label, none } from '@/utils/data';
import { photo } from '../../mock/index'
import NodeCardVue from '@/components/NodeCard.vue';
import YkModel from '@/components/YkModel.vue';
import NewCard from '@/components/NewCard.vue';
import CardDetail from '@/components/CardDetail.vue';
import PhotoCard from '@/components/PhotoCard.vue';
import { findWallPageApi } from '@/api/index';
export default {
    data() {
        return {
            wallType,
            label,
            none,
            // id: 0, 转为动态，该元素注销  // 切换留言板和照片墙
            user: this.$store.state.user,
            nlabel: -1,  // 选中的标签，默认-1 all
            cards: [],    // note 修改为 cards 注销mock数据
            isOk: -1, // -1 真实数据准备中， 0 数据为空
            photo: photo.data,
            title: '写留言',
            isModel: true,  // add window open or close
            cardselected: -1, // 查看index的card    
            page: 1,
            pagesize: 20,
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
        // 监听页面滚动
        handleScroll() {
            // 距离底部小于100px时触发
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight >= docHeight - 100) {
                // 只有还有更多数据时才加载
                if (this.page > 0 && this.isOk !== -1) {
                    this.getWallCard(this.id);
                }
            }
        },


        // change label
        selectNode(e) {
            this.nlabel = e;

            // 清空当前数据
            this.cards = [];
            this.page = 1;
            this.getWallCard(this.id);
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
            console.log("addclick");
            console.log(e);
            
            this.changeModel();
            this.cards.unshift(e); // 将新card插入头部
        },

        handleLike(id) {
            const card = this.cards.find(c => c.id === id);
            if (card) {
                card.like[0].count++;
                card.islike[0].count++;
            }
        },

        getWallCard(id) {
            if (this.page > 0) {
                this.isOk = -1;
                let data = {
                    type: id,
                    page: this.page,
                    pagesize: this.pagesize,
                    userId: this.user.id,
                    label: this.nlabel,
                }
                console.log("getWallCard");
                findWallPageApi(data).then((res) => {
                    // 拿到带有各种信息的一个card数组
                    this.cards = this.cards.concat(res.message); // concat ??
                    // console.log(this.cards);
                    
                    // update page
                    if (res.message.length) {
                        this.page++;
                    } else {
                        this.page = 0;
                    }
                    setTimeout(() => {
                        if (this.cards.length > 0) {
                            this.isOk = 1; // 已有数据但没有更多
                        } else {
                            this.isOk = 0; // 没有任何数据
                        }
                    }, 10)

                    // TODO: photo 
                })
            }
        }



    },
    computed: {
        id() {
            return this.$route.query.id; // current page id
        }
    },
    mounted() {
        this.getWallCard(0);

        // 监听页面滚动
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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
            cursor: pointer;
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

    .none-msg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 220px;
        color: @gray-2;
        font-size: 18px;
        opacity: 0.85;
        margin-top: 40px;

        img {
            margin-bottom: 16px;
            opacity: 0.7;
        }
        p {
            margin: 0;
            font-size: 18px;
            color: @gray-1;
        }
    }
}
</style>