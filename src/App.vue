<template>
  <div id="app">
    <go-top bg-color="#D6D0D0" :size="50"></go-top>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" >
      <b-navbar-brand to="/"> <img src="./images/logo.svg" width="100px" height="auto"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav" to="/postcase"><font-awesome-icon :icon="['fas', 'paste']"/>我要提案 </b-nav-item>
          <b-nav-item class="nav" to="/getcase"><font-awesome-icon :icon="['fas', 'search']"/>我要接案</b-nav-item>
          <b-nav-item class="nav" to="/about"><font-awesome-icon :icon="['fas', 'user']"/>個人資訊  </b-nav-item>
          <b-nav-item class="nav" to="/contact"><font-awesome-icon :icon="['fas', 'user-friends']"/>聯繫我們  </b-nav-item>

        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-navbar-nav >
            <b-nav-item v-if="user.length!==0"><span>hello ❤ {{ this.user }} , 歡迎回來</span> ||
              </b-nav-item>
              <b-nav-item class="nav" href="#" v-if="user.length===0" to="/login"><font-awesome-icon :icon="['fas', 'user-friends']"/>登入</b-nav-item>
              <b-nav-item class="nav" href="#" v-else @click="logout">
                <font-awesome-icon :icon="['fas', 'user-friends']"/>登出
              </b-nav-item>

              <b-nav-item class="nav" href="#" v-if="user.length===0" to="/reg"><font-awesome-icon :icon="['fas', 'user-friends']"/>註冊</b-nav-item>
            </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
        </b-navbar>
    </div>
      <keep-alive>
      <vue-page-transition name="fade">
      <router-view/>
      </vue-page-transition>
      </keep-alive>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import GoTop from '@inotom/vue-go-top'

export default {
  name: 'app',
  data () {
    return {
      userdetail: []
    }
  },
  components: {
    GoTop
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
        .then(response => {
          const data = response.data
          if (data.success) {
            Swal.fire({
              title: '已登出',
              timer: 1000,
              showConfirmButton: false
            })
            this.$store.commit('logout')
            console.log(this.$route)
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
            console.log(this.$state.user)
          } else {
            Swal.fire(data.message)
          }
        })
        .catch(error => {
          Swal.fire(error.response.data.message)
        })
    },
    // heartbeat () {
    //   this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat')
    //     .then(response => {
    //       const data = response.data
    //       // 如果是登入中
    //       if (this.user.length > 0) {
    //         // 如果後端登入時間過期
    //         if (!data) {
    //           alert('登入時效已過')
    //           // 前端登出
    //           this.$store.commit('logout')
    //           // 如果現在不是在首頁，跳到登出後的首頁
    //           if (this.$route.path !== '/') {
    //             this.$router.push('/')
    //           }
    //         }
    //       }
    //     })
    //     .catch(() => {
    //       alert('發生錯誤')
    //       this.$store.commit('logout')
    //       // 如果現在不是在首頁，跳到登出後的首頁
    //       if (this.$route.path !== '/') {
    //         this.$router.push('/')
    //       }
    //     })
    // }

  },
  // mounted () {
  //   this.heartbeat()
  //   setInterval(() => {
  //     this.heartbeat()
  //   }, 1000 * 5)
  // }

}
</script>
