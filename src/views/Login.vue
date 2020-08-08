<template lang="pug">
  #login.container
    #container
      #base
        #base_signin.splits
          p 登入會員
          b-button(variant="outline-warning" @click="changetoregister" :disabled="isdisabled" :class="{active:isactive}") SIGN IN
        #base_register.splits
          p 加入會員
          b-button(variant="outline-warning" @click="changetosignin" :disabled="!isdisabled" :class="{active:!isactive}") REGISTER
        .wrapper(:class="{move:ismove}")
          #signin
            b-form(@submit="submit")
              h1 登入
              b-form-group(

                label-for="input-account"
                description="帳號長度為 4 - 20 個字"
                invalid-feedback="帳號格式不符"
                :state="state('account')"
                )
                b-form-input#input-account(type="text" v-model="account" placeholder="Account 會員帳號")
              b-form-group(

                label-for="input-password"
                description="密碼長度為 4 - 20 個字"
                invalid-feedback="密碼格式不符"
                :state="state('password')"
                )
                b-form-input#input-password(type="password" v-model="password"  placeholder="password 會員密碼")
              b-button(type="submit" variant="info") 登入
          #register.container(style="margin-top:5rem")
            b-form(@submit="reg")
              h1 註冊
              b-form-group(

                label-for="input-nickname"
                invalid-feedback="帳號長度錯誤"
                :state="state('nickname')"
                )
                b-form-input#input-nickname(type="text" v-model="nickname" :state="state('nickname')" placeholder="暱稱 nickname")
              b-form-group(

                label-for="input-email"
                invalid-feedback="帳號長度錯誤"
                :state="state('email')"
                )
                b-form-input#input-email(type="text" v-model="email" :state="state('email')" placeholder="信箱 email")

              b-form-group(

                label-for="input-account"
                description="帳號長度為4~20字元"
                invalid-feedback="帳號長度錯誤"
                :state="state('account')"
                )
                b-form-input#input-account(type="text" v-model="regaccount" :state="state('regaccount')" placeholder="帳號 account")
              b-form-group(

                label-for="input-password"
                description="密碼長度為4~20字元"
                invalid-feedback="密碼長度錯誤"
                :state="state('password')"
                )
                b-form-input#input-password(type="text" v-model="regpassword" :state="state('regpassword')" placeholder="密碼 password")
              b-button(type="submit" variant="info") 送出
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
      blocl: '',
      ismove: false,
      isactive: true,
      isdisabled: true,
      accountSignin: '',
      passwordSignin: '',
      accountRegister: '',
      passwordRegister: '',
      regaccount: '',
      regpassword: '',
      nickname: '',
      email: '',
      block: false
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
    },
    reg (event) {
      event.preventDefault()
      if (this.regaccount.length < 4 || this.regaccount.length > 20) {
        Swal.fire({
          title: '帳號格式不符',
          timer: 1000,
          showConfirmButton: false
        })
      } else if (this.regpassword.length < 4 || this.regpassword.length > 20) {
        Swal.fire({
          title: '密碼格式不符',
          timer: 1000,
          showConfirmButton: false
        })
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/users',
        { account: this.regaccount, password: this.regpassword, nickname: this.nickname, email: this.email, block: this.block }
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
            this.$store.commit('login', this.regaccount)
            this.$router.push('/')
          } else {
            // 不是就顯示回來的 message
            Swal.fire(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          Swal.fire(error.response.data.message)
        })
    },
    changetoregister () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
      this.accountSignin = ''
      this.passwordSignin = ''
    },
    changetosignin () {
      this.ismove = !this.ismove
      this.isactive = !this.isactive
      this.isdisabled = !this.isdisabled
      this.accountRegister = ''
      this.passwordRegister = ''
    }
  }
}
</script>
<style lang="scss">
#login{
  h1{
    color: rgb(170, 155, 155);
    font-weight: bolder;
    margin-bottom: 2rem;
  }
}
#base{
  width: 100%;
  min-height: 60vh;
  margin:5rem 0;
  background: rgba($color: #89b4be, $alpha: 0.8);
  display: table;
  position: relative;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  transition: all .5s;
}
#base > *{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  }
.wrapper{
  position: absolute;
  width: 40%;
  height: 120%;
  top: -10%;
  left: 10%;
  background: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  overflow: hidden;
  transition: all .5s;
}
#signin{
  padding-top: 25%;
  visibility: visible;
  transition: all .5s;
}
#register{
  transform: translateY(-100%) translateX(100%);
  visibility: hidden;
  transition: all .5s;
  padding: 0;
}
.move{
  left:50%;
}
.move #signin{
  transform: translateX(-100%);
  visibility: hidden;
}
.move #register{
transform: translateY(-100%) translateX(0%);
visibility: visible;
}
.splits button{
    font-size: 1.2rem;
    font-weight: bolder;
}
@media (max-width: 767px){
  #base{
    display: block;
  }
  .base > *{
    display: inline-block;
  }
  .splits{
    width: 50%;
    float: left;
  }
  .splits button{
    width: 100%;
    border-radius: 0;
    background: rgb(255, 255, 255);
  }
  .splits p{
    display: none;
  }
  .wrapper{
    position: relative;
    top: 0;
    left: 0;
  }
}
</style>
