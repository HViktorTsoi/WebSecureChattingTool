<template>
  <div class="row history-box">
    <section class="row">
      <div class="row chat-title">
        聊天对象：{{curChattingTarget.nickName?curChattingTarget.nickName:'请选取'}}
      </div>
    </section>
    <hr/>
    <section ref="dom"
             class="row chat-content">
      <div class="content-list">
        <div v-for="(item,index) in historyList"
             :key="index"
             class="">
          <div :class="['content-box',item.isSelf?'pull-right':'pull-left']">
            <div :class="[item.isSelf?'pull-right':'pull-left']">
              <span class="label label-default ipaddr">{{$parseTime(item.clientTime)}}</span>
              <span class="time">【{{item.nickName}}】</span>
            </div>
            <div class="clearfix"></div>
            <div :class="['content',item.isSelf?'content-right':'content-left']">
              {{item.content}}
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </section>
    <hr/>
  </div>
</template>

<script>
export default {
  name: 'HistoryBox',
  data () {
    return {
      title: '192.168.1.1'
    }
  },
  computed: {
    historyList () {
      return this.$store.getters.getCurChattingTargetHisToryList
    },
    curChattingTarget () {
      return this.$store.state.curChattingTarget
    }
  },
  mounted: function () {
    var container = this.$refs.dom
    container.scrollTop = container.scrollHeight
  },
  watch: {
    historyList () {
      this.$nextTick(() => {
        var container = this.$refs.dom
        container.scrollTop = container.scrollHeight
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/css/common.scss';
.history-box {
  background-color: #eee;
  .chat-title {
    text-align: center;
    overflow-x: hidden;
    font-size: 20px;
    height: $chatbox_chattitle_height;
    line-height: $chatbox_chattitle_height;
    span {
      vertical-align: middle;
    }
  }
  hr {
    margin: 0 5px;
    border: 0.5px solid #ccc;
  }
  .chat-content {
    overflow-y: scroll;
    height: $chatbox_chatcontent_height;
    .content-list {
      .content-box {
        margin: 2px 10px;
        .ipaddr {}
        .time {
          vertical-align: middle;
        }
        .content {
          padding: 10px 10px;
          margin: 5px 0;
          max-width: 200px;
          word-wrap: break-word;
          box-shadow: 1px 1px 1px 1px #cdcdcd;
          border-radius: 3px;
        }
        .content-left {
          background-color: #fff;
          display: inline-block;
        }
        .content-right {
          float: right;
          display: inline-block;
          background-color: #b2e281;
        }
      }
    }
  }
}
</style>
