<template>
    <div class="new-card">
        <div class="colors">
            <p class="color-li" v-for="(e, index) in cardColor1" :key="index" :style="{background: e}"

            ></p>
        </div>
        <div class="card-main">
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
            selected: 0,  // current color
        }
    },

    props: {

    },
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

        .color-selected {
            border: 1px solid rgba(59,115,240,1);
        }
    }

    .card-main {
        height: 240px;
        width: 100%;
        background: rgba(252,175,162,0.31);
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