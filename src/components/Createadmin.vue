<template lang="pug">
  .container#createadmin
    div
      h2 新增後台帳號
        br
        br
        b-form(@submit="submit")
          b-form-group(
            label="帳號"
            style="font-size:20px"
            label-for="input-account"
            description="帳號長度為4~20字元"
            :state="state('account')"
            )
            b-form-input#input-account(type="text" v-model="account" )
          b-form-group(
            label="密碼"
            style="font-size:20px"
            label-for="input-password"
            description="密碼長度為4~20字元"
            :state="state('password')"
            )
            b-form-input#input-password(type="text" v-model="password" )
          b-button(type="submit" variant="info") 送出
    hr
</template>
<script>
import Swal from 'sweetalert2'
export default {
  name: 'Admin',
  data () {
    return {
      account: '',
      password: '',
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
        process.env.VUE_APP_APIURL + '/admins',
        { account: this.account, password: this.password, block: this.block }
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
            this.account = ''
            this.password = ''
            // this.$router.push('/login')
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
