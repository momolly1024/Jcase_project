<template lang="pug">
  #reg.container
    b-row.regpage
      b-col(cols="12")
        h2.text-center 註冊
        h6 填寫以下資料，成為會員
        b-form(@submit="submit")
          b-form-group(
            label="暱稱"
            label-for="input-nickname"
            invalid-feedback="帳號長度錯誤"
            :state="state('nickname')"
            )
            b-form-input#input-nickname(type="text" v-model="nickname" :state="state('nickname')")
          b-form-group(
            label="email"
            label-for="input-email"
            invalid-feedback="帳號長度錯誤"
            :state="state('email')"
            )
            b-form-input#input-email(type="text" v-model="email" :state="state('email')")

          b-form-group(
            label="帳號"
            label-for="input-account"
            description="帳號長度為4~20字元"
            invalid-feedback="帳號長度錯誤"
            :state="state('account')"
            )
            b-form-input#input-account(type="text" v-model="account" :state="state('account')")
          b-form-group(
            label="密碼"
            label-for="input-password"
            description="密碼長度為4~20字元"
            invalid-feedback="密碼長度錯誤"
            :state="state('password')"
            )
            b-form-input#input-password(type="text" v-model="password" :state="state('password')")
          b-button(type="submit" variant="info") 送出
      b-col(cols="4")
    Footer
</template>

<script>
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
export default {
  name: 'reg',
  components: {
    Footer
  },
  data () {
    return {
      account: '',
      password: '',
      nickname: '',
      email: '',
      block: false
    }
  },
  methods: {
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
          title: '密碼格式不符',
          timer: 1000,
          showConfirmButton: false
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/users',
        { account: this.account, password: this.password, nickname: this.nickname, email: this.email, block: this.block }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            Swal.fire({
              title: '註冊成功',
              timer: 1000,
              showConfirmButton: false
            })
            this.$router.push('/login')
          } else {
            // 不是就顯示回來的 message
            Swal.fire(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          Swal.fire(error.response.data.message)
        })
    }
  }

}
</script>
