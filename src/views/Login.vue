<template lang="pug">
  #login.container
    b-row
      b-col(cols="12")
        h2.text-center 登入會員
        h6
          | 或點選
          a(href='#')
            router-link(to='/reg') 這裡
          | 註冊成為會員
        b-form(@submit="submit")
          b-form-group(
            label="帳號"
            label-for="input-account"
            description="帳號長度為 4 - 20 個字"
            invalid-feedback="帳號格式不符"
            :state="state('account')"
          )
            b-form-input#input-account(type="text" v-model="account" )
          b-form-group(
            label="密碼"
            label-for="input-password"
            description="密碼長度為 4 - 20 個字"
            invalid-feedback="密碼格式不符"
            :state="state('password')"
          )
            b-form-input#input-password(type="password" v-model="password" )
          b-button(type="submit" variant="info") 登入
    Footer
</template>

<script>
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
export default {
  name: 'login',
  components: {
    Footer
  },
  data () {
    return {
      account: '',
      password: '',
      blocl: ''
    }
  },
  methods: {
    // 這裡是input框框的顏色狀態，如果狀態是account 字數不符合 狀態就是false，false的狀態顏色是紅色
    state (type) {
      if (type === 'account') {
        if (this.account.length < 4 || this.account.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.password.length < 4 || this.password.length > 20) {
          return false
        } else {
          return true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.account.length < 4 || this.account.length > 20) {
        Swal.fire({
          title: '帳號格式不符',
          timer: 1000,
          showConfirmButton: false
        })
      } else if (this.password.length < 4 || this.password.length > 20) {
        Swal.fire({
          title: '密碼格式不符合!',
          timer: 1000,
          showConfirmButton: false
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/login',
        {
          account: this.account, password: this.password
        }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            Swal.fire({
              title: '登入成功!',
              timer: 1000,
              showConfirmButton: false
            })
            this.$store.commit('login', this.account)
            this.$router.push('/')
          } else {
            Swal.fire(data.message)
          }
        }).catch(error => {
          Swal.fire(error.response.data.message)
        })
    }
  }
}
</script>
