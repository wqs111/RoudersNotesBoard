<template>
    <div class="single-photo">
        <img :src="require('../../static/' + 'ark'+photo.imgurl+'.jpg')" alt="">
    </div>

</template>

<script>

export default {
    data() {
        return {

        }
    },

    props: {
        photo: {
            default: {},
        },
    },

    created() {
        // console.log(this.photo);
        
    }
}
</script>

<style lang="less">

/* PhotoCard.vue 内部样式 */
.single-photo {
    break-inside: avoid;     // 防止图片被拆分
    margin-bottom: 16px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    background: #fff;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    }
    img {
        width: 100%;
        min-width: 150px;
        min-height: auto;
        display: block;
        border-radius: 10px;
    }
}
</style>