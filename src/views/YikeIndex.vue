<template>
    <div>

        <topBar></topBar>
        <video class="bg-video"></video>
        <router-view></router-view>
    </div>
</template>

<script>
import topBar from '@/components/TopBar.vue'
export default {
    data() {
        return {
            aaa: '',
        }
    },

    components: {
        topBar,
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