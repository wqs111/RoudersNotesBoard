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
import { signIpApi } from '@/api';
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
            signIpApi().then((res) => {
                console.log(res);
                let user = {
                    id: res.ip, // 当前用户的id
                }

                // 将上述user变量传入store的getuser的mutation中
                this.$store.commit('getUser', user);
                
            })


        }
    }
}
</script>

<style lang="less" scoped>



</style>