<template>
  <div class="row history-box">
    <section class="row chat-title">
      <span>
        <h4>
          聊天对象：{{title}}
        </h4>
      </span>
    </section>
    <hr/>
    <section class="row chat-content">
      <div class="content-list">
        <div v-for="(item,index) in historyList" :key="index" class="">
          <div :class="['content-box',item.isSelf?'pull-right':'pull-left']">
            <div :class="[item.isSelf?'pull-right':'pull-left']">
              <span class="label label-default ipaddr">{{item.time}}</span>
              <span class="time">【{{item.ipaddr}}】</span>
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
      title: '192.168.1.1',
      historyList: [
        {
          time: 0,
          isSelf: true,
          content: '测试消息',
          ipaddr: '192.168.0.1'
        },
        {
          time: 1,
          isSelf: false,
          content: '来自对方的测试消息',
          ipaddr: '192.168.0.100'
        },
        {
          time: 2,
          isSelf: true,
          content: '测试消息',
          ipaddr: '192.168.0.1'
        },
        {
          time: 3,
          isSelf: true,
          content: '测试消息',
          ipaddr: '192.168.0.1'
        },
        {
          time: 3,
          isSelf: true,
          content: '测试消息',
          ipaddr: '192.168.0.1'
        }
      ]
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
    span {
      vertical-align: middle;
    }
  }
  hr {
    margin: 0;
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
        }
        .content-left {
          background-color: #fff;
        }
        .content-right {
          background-color: #b2e281;
        }
      }
    }
  }
}
</style>
