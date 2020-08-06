<template>
  <div id="contact">
    <h2>聯繫我們</h2>
    <br>
    <div class="contact row">
      <div class="col-12 col-md-6 casemsg">
          <p>信箱：台北市北投區中央北路一段1號</p>
          <p>地址：OOXX@gmail.com</p>
          <p>電話：02-1234-5678</p>
          <p>服務時間：平日08:00~17:00</p>
          <p>或是填寫問題/意見並留下聯絡資料，將由專人回覆您</p>
      </div>
      <div class="col-12 col-md-6 text-center">
      <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21649.535200699367!2d121.46574442088496!3d25.124420251392937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442af6c233139e7%3A0x7b76ef2b2baa4cfa!2z6Zec5rih6Ieq54S25YWs5ZyS!5e0!3m2!1szh-TW!2stw!4v1595226153816!5m2!1szh-TW!2stw" width="300" height="200" frameborder="0" style="border:0;" tabindex="0"></iframe>
      </div>
    </div>
      <p style="margin:2rem">留言給我們</p>
      <b-form @submit="submit">
      <b-form-textarea  id="msginput" type="text" v-model="text"></b-form-textarea>
      <b-button @click="submit(event)" type="submit" variant="info">送出</b-button>
      </b-form>
  </div>
</template>
<script>
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
export default {
  components: {
    Footer
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data () {
    return {
      text: '',
      process: false
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/msg',
        { user: this.user, text: this.text, process: this.process }
      ).then(response => {
        const data = response.data
        if (data.success) {
          Swal.fire({
            title: '已送出，我們回盡快回覆您',
            timer: 2000,
            showConfirmButton: false
          })
          console.log(this.text)
          this.text = ''
        } else {
          Swal.fire(data.message)
        }
      })
        .catch(error => {
          Swal.fire(error.response.data.message)
        })
    }
  }
}
</script>
