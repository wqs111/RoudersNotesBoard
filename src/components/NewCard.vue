<template>
    <div class="new-card">
        <div class="colors">
            <p class="color-li" v-for="(e, index) in cardColor1" :key="index" 
                :style="{background: e}" :class="{colorselected:index==colorSelected}"
                @click="changeColor(index)"

            ></p>
        </div>
        <div class="card-main" :style="{background: cardColor[colorSelected]}">
            <textarea placeholder="Just write something..." class="message" 
                maxlength="220" v-model="message"
            ></textarea>
            <input type="text" placeholder="Sign your callname" class="name"
                v-model="name"
            >
        </div>
        <div class="labels">
            <p class="title">选择标签</p>

            <div class="label">
            <!-- label接收id区分留言和照片 -->
            <p class="label-li" v-for="(e, index) in label[id]" :key="index"
                :class="{lchoosen: index==lchoosen}" @click="choseLabel(index)"
            >{{ e }}</p>
            </div>
        </div>

        <div class="arknights-disclaimer">
            <p>※ 本网站受罗德岛安全协议保护</p>
            <p>※ 留言内容可能因天灾或源石虫啃食线路丢失</p>
            <p>※ 阿米娅有权删除任何涉及“博士加班”的抱怨</p>
            <p>※ 最终解释权归 © 2025 罗德岛制药 所有</p>
        </div>

        <div class="foot-btn">
            <YkButton  nom="secondary" style="cursor: pointer;" @click="closeModel()">取消</YkButton>
            <yk-button  class="submit" style="cursor: pointer; "  @click="submit()">创建</yk-button>
        </div>
    </div>
</template>

<script>
import { cardColor, cardColor1, label } from '@/utils/data';
import YkButton from './YkButton.vue';
import { insertWallApi } from '@/api';
export default {
    data() {
        return {
            cardColor1,
            cardColor,
            colorSelected: 0,  // current color
            label,
            lchoosen: 0,
            message: '',  // inputarea
            name: '',     // callname

            user: this.$store.state.user, // 拿出store中的user变量
        }
    },
    components: {
        YkButton,
    },

    props: {
        id: {
            default: 0,
        },
    },

    methods: {
        changeColor(index) {
            this.colorSelected = index;
        },

        choseLabel(index) {
            this.lchoosen = index;
        },

        closeModel() {
            this.$emit('addClose');
        },

        // 提交数据
        submit() {
            let name = '匿名';
            if (this.name) {
                name = this.name;
            }

            let data = {
                type: this.id,
                message: this.message,
                name: name,
                userId: this.user.id,
                moment: new Date(),
                label: this.lchoosen,
                color: 5,
                imgurl: '',
            };
            console.log(data);
            if (this.message && this.id == 0) {
                data.color = this.colorSelected;
                insertWallApi(data).then((res) => {
                    console.log(res);

                    // 完整card数据
                    let cardD = {
                        type: this.id,
                        message: this.message,
                        name: name,
                        userId: this.user.id,
                        moment: new Date(),
                        label: this.lchoosen,
                        color: this.colorSelected,
                        imgurl: '',
                        id: res.message.insertId, // wtf???
                        // islike: [{ count: 0 }],
                        like: [{ count: 0 }],
                        comcount: [{ count: 0 }],
                        report: [{ count: 0 }],
                        revoke: [{ count: 0 }],
                        
                    };
                    
                    
                    this.$emit("clickbt", cardD);
                    this.$message({ type: "success", message: "感谢你的记录！" })
                    this.message = '';
                });
            }
        },

        apiTest() {
            let data = {
                type: 0,
                message: 'hello world',
                name: 'doctor',
                userId: '3',
                moment: new Date(),
                label: 0,
                color: 3,
                imgurl: 3,
            } 

            this.axios
                .post("http://localhost:3000/insertwall", data)
                .then((res) => {
                    console.log(res);
                    
                })
        }
    }
}
</script>

<style lang="less" scoped>
.new-card {
    padding: 0 10px;
    

    .colors {
        height: 36px;
        .color-li {
            width: 24px;
            height: 24px;
            margin-right: @padding-8;
            float: left;
        }

        .colorselected {
            border: 1px solid rgba(59,115,240,1);
        }
    }

    .card-main {
        height: 240px;
        width: 100%;

        padding: 12px;
        box-sizing: border-box;  // ?
        .message {
            background: none;
            border: none;
            resize: none;  // fixed height, width
            height: 172px;
            width: 100%;
        }

        .name {
            width: 100%;
            height: 30px;
            box-sizing: border-box;
            background: none;
            border: solid oldlace;
        }
    }

    .labels {
        .title {
            color: @gray-0;
            font-weight: 600;
            padding-top: 20px;
            padding-bottom: 10px;
        }

        .label {
            display: flex;
            flex-wrap: wrap;  // ?
            cursor: pointer;

            .label-li {
                padding: 2px 8px;
                border-radius: 20px;
                margin: 1px;
            }

            .lchoosen {
                background: #EBEBEB;
            }
        }


    }

    .foot-btn {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        .submit {
            width: 60%;
        }
    }

    .arknights-disclaimer {
        position: absolute;
        bottom: 60px;
        
        font-family: 'Courier New', monospace;
        color: @gray-2;
        // background: rgba(26, 26, 46, 0.7);
        padding: 10px;
        // border-left: 3px solid #ff5555;
        font-size: 12px;
    }

}


</style>