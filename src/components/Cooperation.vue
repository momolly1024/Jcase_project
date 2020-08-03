<template>
  <div id="Cooperation">
    <div class="skewed"></div>
    <h2>會員反饋</h2>
    <b-container>
      <b-row>
        <b-col class="col-sm-4 col-12">
          <div class="people">
          <img src="../images/people1.jpg">
          <p>感謝平台，免雜費而且註冊方便，隨時隨地提案接案！很開心參與平台初期的回饋活動，以基本功能來說，我最愛的是註冊方便快速，因為忘記帳號密碼一直是我很苦惱的問題，用過各大廠牌的銀杏，但卻沒有什麼改善，永遠記不住。由於註冊帳號很簡單四個字就可以，沒有難度限制，所以連續幾天用下來，我必用，重點是，免費的，真是深得我心啊❤️</p>
          </div>

        </b-col>
        <b-col class="col-sm-4 col-12">
          <div class="people">
          <img src="../images/hello.gif">
          <p>感謝平台，讓我們合作愉快，在這裡我遇見了超有趣的廠商，交了很多朋友，雖然平台功能尚未完善，但基本功能的使用上都沒BUG，比起其他提案網站，這裡清楚簡便，一目了然，真是太讚了。</p>
          </div>

        </b-col>
        <b-col class="col-sm-4 col-12">
          <div class="people">
          <img src="../images/people3.jpg">
          <p>感謝平台，讓我們小資族可以賺點外快～沒錯，SOHO族的我只能上網接接案，用過很多平台系統，就屬這裡最好用，去掉五花八門的廣告顏色，這裡的排版設計乾淨清晰，不過功能希望可以持續更新增加啦～</p>
          </div>

        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <h2>合作廠商</h2>
      <b-row>
        <b-col class="col-sm-4 col-12 coop">
          <a :href="coHref" target="_blank">
            <img :src="coImg">
          </a>
          <p> {{ coDescription }} </p>
        </b-col >
        <b-col class="col-sm-4 col-12 coop">
          <a  :href="coHref02" target="_blank">
            <img :src="coImg02">
          </a>
          <p>{{coDescription02}}</p>
        </b-col>
        <b-col class="col-sm-4 col-12 coop">
          <a :href="coHref03" target="_blank">
            <img :src="coImg03">
          </a>
          <p>{{coDescription03}}</p>
        </b-col>
      </b-row>

    </b-container>

  </div>

</template>
<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      coDescription: '說明1(預設文字)',
      coImg: 'https://picsum.photos/150/150/?random=1',
      coHref: 'https://google.com.tw',
      coDescription02: '說明2(預設文字)',
      coImg02: 'https://picsum.photos/150/150/?random=2',
      coHref02: 'https://youtube.com.tw',
      coDescription03: '說明3(預設文字)',
      coImg03: 'https://picsum.photos/150/150/?random=3',
      coHref03: 'https://www.npmjs.com/'
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/cooperation/')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.coDescription = data.result[data.result.length - 1].coDescription
          this.coImg = data.result[data.result.length - 1].coImg
          this.coHref = data.result[data.result.length - 1].coHref
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/cooperation02/')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.coDescription02 = data.result[data.result.length - 1].coDescription02
          this.coImg02 = data.result[data.result.length - 1].coImg02
          this.coHref02 = data.result[data.result.length - 1].coHref02
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/cooperation03/')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.coDescription03 = data.result[data.result.length - 1].coDescription03
          this.coImg03 = data.result[data.result.length - 1].coImg03
          this.coHref03 = data.result[data.result.length - 1].coHref03
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }
}
</script>
