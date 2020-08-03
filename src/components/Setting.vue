<template>
  <div id="setting" class="container">
    <div class="banner">
      <h2>banner修改</h2>
      <p class="textbgc">第一張</p>
      <b-form @submit="submit">
      bannerTitle<b-form-input  id="msginput" type="text" v-model="bannerTitle"></b-form-input>
      bannerText<b-form-input  id="msginput" type="text" v-model="bannerText"></b-form-input>
      <b-button @click="submit(event)" type="submit" variant="info">送出</b-button>
      </b-form>
      <br><br><br>
      <p class="textbgc">第二張</p>
      <b-form @submit="banner2">
      bannerTitle02<b-form-input  id="msginput" type="text" v-model="bannerTitle02"></b-form-input>
      bannerText02<b-form-input  id="msginput" type="text" v-model="bannerText02"></b-form-input>
      <b-button @click="banner2" type="submit" variant="info">送出</b-button>
      </b-form>
      <br><br><br>
      <p class="textbgc">第三張</p>
      <b-form @submit="banner3">
      bannerTitle03<b-form-input  id="msginput" type="text" v-model="bannerTitle03"></b-form-input>
      bannerText03<b-form-input  id="msginput" type="text" v-model="bannerText03"></b-form-input>
      <b-button @click="banner3" type="submit" variant="info">送出</b-button>
      </b-form>
      <br><br><br>
      <p class="textbgc">第四張</p>
      <b-form @submit="banner4">
      bannerTitle04<b-form-input  id="msginput" type="text" v-model="bannerTitle04"></b-form-input>
      bannerText04<b-form-input  id="msginput" type="text" v-model="bannerText04"></b-form-input>
      <b-button @click="banner4" type="submit" variant="info">送出</b-button>
      </b-form>
    </div>

    <hr>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      bannerTitle: '',
      bannerText: '',
      bannerTitle02: '',
      bannerText02: '',
      bannerTitle03: '',
      bannerText03: '',
      bannerTitle04: '',
      bannerText04: ''
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/setting',
        { bannerTitle: this.bannerTitle, bannerText: this.bannerText }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.bannerTitle = ''
          this.bannerText = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    },
    banner2 () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/setting02',
        { bannerTitle02: this.bannerTitle02, bannerText02: this.bannerText02 }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.bannerTitle02 = ''
          this.bannerText02 = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    },
    banner3 () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/setting03',
        { bannerTitle03: this.bannerTitle03, bannerText03: this.bannerText03 }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.bannerTitle03 = ''
          this.bannerText03 = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    },
    banner4 () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/setting04',
        { bannerTitle04: this.bannerTitle04, bannerText04: this.bannerText04 }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.bannerTitle04 = ''
          this.bannerText04 = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    }
  }

}
</script>
