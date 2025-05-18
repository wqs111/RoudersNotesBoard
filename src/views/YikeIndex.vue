<template>
    <div>

        <topBar></topBar>
        <video class="bg-video"></video>
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
        this.getUser();
    },

    methods: {
        getUser() {
            this.axios.post("http://182.61.20.123:3001/singin/match", { data: 'aaa', pwd: 'bbb' })
                .then((res) => {
                    console.log(res)
                
            })
        }
    }
}
</script>

<style lang="less" scoped>



</style>