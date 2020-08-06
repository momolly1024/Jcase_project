<template>
  <div class="container">
    <h2>合作廠商</h2>
    <div class="cooperation row">
    <div class="col-12 col-md-4">
          <b-form @submit="coopsetting" class="col-12">
          <p class="textbgc">最左邊</p>
          說明<b-form-input class="msginput" type="text" v-model="coDescription"></b-form-input>
          img<b-form-input class="msginput" type="text" v-model="coImg"></b-form-input>
          href<b-form-input class="msginput" type="text" v-model="coHref"></b-form-input>
          <b-button variant="warning" @click="coopsetting" class="coopbtn">送出</b-button>
          </b-form>
    </div>
    <div class="col-12 col-md-4">
          <b-form @submit="coopsetting02">

          <p class="textbgc">中間</p>
          說明<b-form-input class="msginput" type="text" v-model="coDescription02"></b-form-input>
          img<b-form-input class="msginput" type="text" v-model="coImg02"></b-form-input>
          href<b-form-input class="msginput" type="text" v-model="coHref02"></b-form-input>
          <b-button variant="warning" @click="coopsetting02" class="coopbtn">送出</b-button>
          </b-form>
    </div>
      <div class="col-12 col-md-4">
      <b-form @submit="coopsetting03">
      <p class="textbgc">最右邊</p>
      說明<b-form-input class="msginput" type="text" v-model="coDescription03"></b-form-input>
      img<b-form-input class="msginput" type="text" v-model="coImg03"></b-form-input>
      href<b-form-input class="msginput" type="text" v-model="coHref03"></b-form-input>
      <b-button variant="warning" @click="coopsetting03" class="coopbtn">送出</b-button>
      </b-form>
      </div>

    </div>
    <hr>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      coDescription: '',
      coImg: '',
      coHref: '',
      coDescription02: '',
      coImg02: '',
      coHref02: '',
      coDescription03: '',
      coImg03: '',
      coHref03: ''
    }
  },
  methods: {
    coopsetting () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/cooperation',
        { coDescription: this.coDescription, coImg: this.coImg, coHref: this.coHref }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.coDescription = ''
          this.coImg = ''
          this.coHref = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    },
    coopsetting02 () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/cooperation02',
        { coDescription02: this.coDescription02, coImg02: this.coImg02, coHref02: this.coHref02 }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.coDescription02 = ''
          this.coImg02 = ''
          this.coHref02 = ''
        } else {
          alert(data.message)
        }
      })
        .catch(error => {
          alert(error.response.data.message)
        })
    },
    coopsetting03 () {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/cooperation03',
        { coDescription03: this.coDescription03, coImg03: this.coImg03, coHref03: this.coHref03 }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '設定完成',
            timer: 2000,
            showConfirmButton: false
          })
          this.coDescription03 = ''
          this.coImg03 = ''
          this.coHref03 = ''
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
