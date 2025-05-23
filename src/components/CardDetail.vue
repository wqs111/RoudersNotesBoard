<template>
    <div class="card-detail">

        <node-card :note="note"></node-card>

        <div class="comment">
            <textarea name="message" class="message" placeholder="说点什么..."></textarea>
            
        </div>

        <div class="submit">
            <input type="name" class="name" placeholder="匿名">
            <YkButton :size="small" :nom="cprimary" class="sb-btn" >提交</YkButton>
        </div>

        <div class="rr">
            <p class="revoke">联系贴主撕掉该便贴</p>
            <p class="report">汇报人事部</p>
        </div>
    </div>

</template>

<script >
import NodeCard from './NodeCard.vue';
import YkButton from './YkButton.vue';
export default {
    data() {
        return {

        }
    },

    components: {NodeCard, YkButton},

    props: {
        note: {
            default: {},
        },
    },
}
</script>

<style lang="less" scoped>

.message {
    margin-top: 10px;
    resize: none;  // fixed height, width
    height: 72px;
    width: 302px;
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