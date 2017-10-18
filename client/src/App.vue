<template>
  <div id="app"
       class="container">
    <router-view></router-view>
  </div>
</template>

<script>

import ChatSender from './components/ChatSender'
import ContractList from './components/ContractList'
import HistoryBox from './components/HistoryBox'
import UserInfo from './components/UserInfo'
import Chat from './components/Chat'

export default {
  name: 'app',
  components: {
    ChatSender,
    ContractList,
    HistoryBox,
    UserInfo,
    Chat
  },
  mounted: function () {
  },
  beforeDestroy: function () {
    // localStorage.vm = this
  }
}
</script>

<style lang="scss">
* {
  // background-color: rgba(0, 0, 0, 0.1);
  // transition: color 0.3s;
}

ul,
li,
div {
  border-radius: 0px!important;
}

@media screen and (max-width: 993px) {
  .container {
    padding: 0;
    margin: 0;
    width: 100%;
  }
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
