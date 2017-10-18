<template>
  <div class="row user-info">
    <span class="avatar">
      <img :src="avatar" class="img-circle ">
    </span>
    <span class="ipaddr"> {{$store.state.nickName}} </span>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      avatar: '/static/logo.png'
    }
  }
}
</script>

<style lang='scss' scoped>
.user-info {
  background-color: #2e3238;
  color: #e0e0e0;
  padding: 10px;
  .avatar img {
    background-color: #ffffff;
    width: 40px;
    vertical-align: middle;
  }
  .ipaddr {
    padding-left: 10px;
    font-size: 25px;
    vertical-align: middle;
  }
}
</style>
