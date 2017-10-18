<template>
  <nav class="navbar navbar-default"
       role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navtop-menu"
                aria-expanded="false">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <<router-link to=""
                      class="navbar-brand">
          <img src="static/logo.png"
               width="25px">
          </router-link>
      </div>
      <div class="collapse navbar-collapse"
           id="navtop-menu">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <router-link to="/Login"
                         type="button">
              退出
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavTop',
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$router.push('Login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 0;
  border-radius: 0;
  background-color: #2f2f2f;
  // border-right: none;
  // border-left: none;
  border: none;
  box-shadow: 0 1px 2px 2px #2c2c2c;
  a {
    color: #e0e0e0!important;
    &:hover {
      font-weight: bold;
    }
  }
}
</style>
