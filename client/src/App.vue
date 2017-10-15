<template>
  <div id="app" class="container">
    <div class="chatbox">
      <div class="col-sm-8 col-md-9 chatbox-left">
        <history-box></history-box>
        <chat-sender></chat-sender>
      </div>
      <div class="col-sm-4 col-md-3 chatbox-right">
        <user-info></user-info>
        <contract-list></contract-list>
      </div>
    </div>
  </div>
</template>

<script>

import ChatSender from './components/ChatSender'
import ContractList from './components/ContractList'
import HistoryBox from './components/HistoryBox'
import UserInfo from './components/UserInfo'

export default {
  name: 'app',
  components: {
    ChatSender,
    ContractList,
    HistoryBox,
    UserInfo
  }
}
</script>

<style lang="scss">
* {
  // background-color: rgba(0, 0, 0, 0.1);
}

ul,
li,
div,
span {
  border-radius: 0px!important;
}

.chatbox {
  min-height: chatbox_height;
  .chatbox-left {
    padding: 0;
    .row {
      margin: 0;
    }
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px; // background-color: #2e3238;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px; // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>
