<template>
  <div class="row contract-list">
    <ul class="list-group">
      <li @click="switchChattingTarget(item,index)"
          v-for="(item,index) in contractList"
          :class="['list-group-item',activeIndex==index||$store.state.curChattingTarget.uid==item.uid?'active':'']"
          :key="index">
        <div class="row">
          <span class="col-xs-6 ipaddr">
            {{item.nickName}}
          </span>
          <span class="col-xs-4 latest">
            {{$parseTime(item.lastMsgTime)}}
          </span>
          <span v-if="item.msgCount>0"
                class="col-xs-1 label label-danger">
            {{item.msgCount}}
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
      activeIndex: -1
    }
  },
  computed: {
    contractList () {
      return this.$store.state.userList
    }
  },
  methods: {
    switchChattingTarget: function (user, index) {
      this.activeIndex = index
      this.$store.dispatch('switchChattingTarget', user)
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
    cursor: pointer;
    &:hover {
      $clr: #337ab7;
      background-color: $clr;
      border: 1px solid $clr;
      color: #ffffff;
    }
    .row {
      $row_height: 30px;
      height: $row_height;
      line-height: $row_height;
      .avatar {
        img {
          width: 30px;
        }
      }
      .ipaddr {
        font-size: 18px;
      }
      .latest {
        font-size: 13px;
      }
      .label {
        $lbl_height: 20px;
        $lbl_mgn: ($row_height - $lbl_height)/2;
        margin: $lbl_mgn 0;
        height: $lbl_height;
        line-height: $lbl_height;
        padding: 0;
      }
    }
  }
}
</style>
