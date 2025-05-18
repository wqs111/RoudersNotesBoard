<template>
    <div>
        <p>index of views</p>
        <p class="title"> Rouderls board</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aaa: '',
        }
    },

    components: {

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

.title {
    font-size: 24px;
    font-size: @size-16;
    color: @warning-color;
}


</style>