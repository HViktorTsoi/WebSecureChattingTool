<template>
  <div class="chatbox">
    <h1>WEB加密通信工具</h1>
    <form class="login-face">
      <div :class="['form-group',errors.has('serverIP')?'has-error':'']">
        <label class="control-label"
               for="">
          <span class="glyphicon glyphicon-globe"></span>
          {{errors.has('serverIP')?errors.first('serverIP'):'服务器IP地址'}}
        </label>
        <input name="serverIP"
               v-validate="'required'"
               placeholder="如 192.168.0.1"
               v-model="serverIP"
               type="text"
               class="form-control">
      </div>
      <div :class="['form-group',errors.has('serverPort')?'has-error':'']">
        <label class="control-label"
               for="">
          <span class="glyphicon glyphicon-random"></span>
          {{errors.has('serverPort')?errors.first('serverPort'):'服务器端口号'}}
        </label>
        <input name='serverPort'
               placeholder="如 9989"
               v-validate="'required|numeric|max:5'"
               v-model="serverPort"
               type="text"
               class="form-control">
      </div>
      <div :class="['form-group',errors.has('nickName')?'has-error':'']">
        <label class="control-label"
               for="">
          <span class="glyphicon glyphicon-user"></span>
          {{errors.has('nickName')?errors.first('nickName'):'用户昵称'}}
        </label>
        <input name='nickName'
               placeholder="长度在1~15个字符之间"
               v-validate="'required|min:1|max:15'"
               v-model="nickName"
               type="text"
               class="form-control">
      </div>
      <div class="form-group">
        <button @click="doLogin"
                type="button"
                class="btn btn-success form-control">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
// 配置验证器
Validator.addLocale(zh)
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}

Vue.use(VeeValidate, config)

const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => '请输入' + field + '!'
    },
    attributes: {
      serverIP: '服务器IP地址',
      serverPort: '服务器端口号',
      nickName: '用户昵称'
    }
  }
}
Validator.updateDictionary(dictionary)

export default {
  name: 'Login',
  data () {
    return {
      serverIP: '192.168.0.',
      serverPort: '9989',
      nickName: ''
    }
  },
  methods: {
    doLogin () {
      this.$validator.validateAll().then((result) => {
        // 如果验证成功
        if (result) {
          var vm = this
          // 建立websocket连接
          this.$store.commit('setLoginInfo', {
            nickName: this.nickName,
            serverInfo: {
              host: this.serverIP,
              port: parseInt(this.serverPort)
            }
          })
          this.$store.dispatch('initWebSocket').then(() => {
            vm.$router.push('Chat')
          })
        } else {
          console.log(this.errors)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 25px;
}

.login-face {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px 30px 10px 30px;
  border-radius: 3px;
  .has-error .control-label {
    color: #e94442!important;
  }
  .form-group {
    .glyphicon {
      font-size: 12px;
      margin-right: 2px;
    }
    label {
      color: #fff;
    }
    button {
      margin-top: 25px;
    }
  }
}
</style>
