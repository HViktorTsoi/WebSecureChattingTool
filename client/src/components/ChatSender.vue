<template>
  <div class="row chat-sender">
    <div class="col-xs-12">
      <div class="row">
        <textarea class="msg" v-model="msg"></textarea>
      </div>
      <div class="row">
        <button class="btn btn-success pull-right" type="button">发送</button>
        <div class="clearfix"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ChatSender',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/css/common.scss';
.chat-sender {
  height: $chatbox_sender_height;
  background-color: #eee;
  .msg {
    width: 100%;
    padding-top: 10px;
    height: 130px;
    resize: none;
    border: none;
    outline: none;
    background-color: inherit;
    font-size: 18px;
  }
}
</style>
