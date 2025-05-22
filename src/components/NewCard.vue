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
                maxlength="220"
            ></textarea>
            <input type="text" placeholder="Sign your callname" class="name">
        </div>
    </div>
</template>

<script>
import { cardColor, cardColor1 } from '@/utils/data';
export default {
    data() {
        return {
            cardColor1,
            cardColor,
            colorSelected: 0,  // current color
        }
    },

    props: {

    },

    methods: {
        changeColor(index) {
            this.colorSelected = index;
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

}


</style>