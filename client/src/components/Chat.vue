<template>
  <div class="chatbox">
    <div class="col-sm-8 col-md-9 chatbox-left">
      <history-box></history-box>
      <chat-sender></chat-sender>
    </div>
    <div class="col-sm-4 col-md-3 chatbox-right">
      <user-info></user-info>
      <contract-list></contract-list>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>

import ChatSender from './ChatSender'
import ContractList from './ContractList'
import HistoryBox from './HistoryBox'
import UserInfo from './UserInfo'

export default {
  name: 'Chat',
  components: {
    ChatSender,
    ContractList,
    HistoryBox,
    UserInfo
  }
}
</script>

<style lang="scss" scoped>
.chatbox {
  box-shadow: 0 0 9px 2px #666;
  border-radius: 3px!important;
  margin-top: 5px;
  min-height: chatbox_height;
  .chatbox-left {
    .row {
      margin: 0;
    }
  }
}
</style>
