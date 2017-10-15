<template>
  <div class="row contract-list">
    <ul class="list-group">
      <li v-for="(item,index) in contractList" class="list-group-item" :key="index">
        <div class="row">
          <span class="col-xs-2 avatar">
            <img :src="item.avatar" class="img-circle">
          </span>
          <span class="col-xs-7 ipaddr">
            {{item.ipaddr+'00'+index}}
          </span>
          <span class="col-xs-3 latest">
            {{item.lastMsgTime}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContractList',
  data () {
    return {
      contractList: [
        {
          avatar: '/static/logo.png',
          ipaddr: '192.168.1.',
          lastMsgTime: '12:40'
        },
        {
          avatar: '/static/logo.png',
          ipaddr: '192.168.1.',
          lastMsgTime: '12:40'
        },
        {
          avatar: '/static/logo.png',
          ipaddr: '192.168.1.',
          lastMsgTime: '12:40'
        },
        {
          avatar: '/static/logo.png',
          ipaddr: '192.168.1.',
          lastMsgTime: '12:40'
        },
        {
          avatar: '/static/logo.png',
          ipaddr: '192.168.1.',
          lastMsgTime: '12:40'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/css/common.scss';
.contract-list {
  height: $chatbox_height;
  max-height: 560px;
  overflow-y: scroll;
  padding-left: 5px;
  background-color: #2e3238;
  .list-group-item {
    margin-top: 2px;
    .avatar {
      img {
        width: 30px;
      }
    }
    .ipaddr {
      font-size: 18px;
    }
    .latest{
      font-size: 13px;
    }
  }
}
</style>
