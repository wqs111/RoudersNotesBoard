<template>
  <router-view></router-view>
  <p class="ab"> aaa </p>
</template>

<script>
 

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="less">
@import url(./styles/commons.less);
.ab {
  font-size: @size-16;
  color: @warning-color;
}
</style>
