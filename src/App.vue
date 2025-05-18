<template>
  <router-view></router-view>
  <p class="ab"> aaa </p>
  <span class="iconfont icon-zan1"></span>
</template>

<script>
 

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="less">
// @import url(./styles/commons.less);
@import './assets/fonts/basic_icon/iconfont.css';

.ab {
  font-size: @size-16;
  color: @warning-color;
}
</style>
