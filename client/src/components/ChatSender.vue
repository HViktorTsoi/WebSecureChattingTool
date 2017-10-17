<template>
  <div class="row chat-sender">
    <div class="col-xs-12">
      <div class="row">
        <textarea v-if="curChattingTarget.uid" class="msg" v-model="msg"></textarea>
      </div>
      <div class="row">
        <button v-if="curChattingTarget.uid" @click="send" class="btn btn-success pull-right" type="button">
          <span class="glyphicon glyphicon-send"></span>
          发送
        </button>
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
      msg: '消息'
    }
  },
  computed: {
    curChattingTarget () {
      return this.$store.state.curChattingTarget
    }
  },
  methods: {
    send: function () {
      if (this.msg !== '') {
        console.log(this.msg)
        this.$store.dispatch('sendMsg', this.msg)
        this.msg = ''
      }
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
  .btn {
    width: 80px;
    .glyphicon {
      margin-right: 2px;
      font-size: 12px;
    }
  }
}
</style>
