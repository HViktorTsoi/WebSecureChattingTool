<template>
  <div id="app">
    <nav-top></nav-top>
    <div class="container">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
    <transition name="slide-fade">
      <nav-footer v-if="$route.name=='Login'"></nav-footer>
    </transition>
  </div>
</template>

<script>

import Chat from './components/Chat'
import NavTop from './components/NavTop'
import NavFooter from './components/NavFooter'

export default {
  name: 'app',
  components: {
    Chat,
    NavTop,
    NavFooter
  },
  mounted: function () {
    console.log(this.$route)
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
  // border-radius: 0px!important;
}

body {
  background-color: #f0f0f0;
} //   margin: 0;
//   padding: 0;
//   width: 100%;
@media screen and (max-width: 993px) {
  .container {
    padding: 0 1px;
    margin: 0;
    width: 100%;
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

.slide-fade-enter-active {
  position: absolute;
  transition: all .5s ease;
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-400px);
  opacity: 0;
}

// .fade-enter-active,
// .fade-leave-active {
//   // position: absolute;
//   transition: opacity .5s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0
// }
</style>
