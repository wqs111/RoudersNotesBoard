<template>
    <div>

        <topBar></topBar>
        <!-- <video class="bg-video"></video> -->
        <router-view></router-view>
        <foot-bar-vue></foot-bar-vue>
    </div>
</template>

<script>
import topBar from '@/components/TopBar.vue'
import FootBarVue from '@/components/FootBar.vue';
export default {
    data() {
        return {
            aaa: '',
        }
    },

    components: {
        topBar,
        FootBarVue,
    },

    computed: {

    },

    created() {

    },

    methods: {

    }
}
</script>

<style lang="less" scoped>



</style>