<template>
  <div id="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="https://picsum.photos/1920/820/?image=12">
      <h2>{{ bannerTitle }}</h2>
      <p>
      {{ bannerText }}
      </p>
      </b-carousel-slide>
      <b-carousel-slide
      img-src="https://picsum.photos/1920/820/?image=54">
      <h2>{{ bannerTitle02 }}</h2>
      <p> {{ bannerText02 }}</p>
      </b-carousel-slide>
      <b-carousel-slide img-src="https://picsum.photos/1920/820/?image=58">
      <h2>{{ bannerTitle03 }}</h2>
      <p> {{ bannerText03 }}</p>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100 h-100 "
            src="https://picsum.photos/1920/820/?image=10"
            alt="image slot"
          >
        </template>
      <h2>{{ bannerTitle04 }}</h2>
      <p> {{ bannerText04 }}</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      bannerTitle: '歡迎各大乾爹與我們聯繫',
      bannerText: '有興趣合作的廠商信件/電話討論合作事宜',
      bannerTitle02: '歡迎各大乾爹與我們聯繫',
      bannerText02: '有興趣合作的廠商信件/電話討論合作事宜',
      bannerTitle03: '歡迎各大乾爹與我們聯繫',
      bannerText03: '有興趣合作的廠商信件/電話討論合作事宜',
      bannerTitle04: '歡迎各大乾爹與我們聯繫',
      bannerText04: '有興趣合作的廠商信件/電話討論合作事宜'
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/setting/')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.bannerTitle = data.result[data.result.length - 1].bannerTitle
          this.bannerText = data.result[data.result.length - 1].bannerText
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/setting02')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.bannerTitle02 = data.result[data.result.length - 1].bannerTitle02
          this.bannerText02 = data.result[data.result.length - 1].bannerText02
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/setting03')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.bannerTitle03 = data.result[data.result.length - 1].bannerTitle03
          this.bannerText03 = data.result[data.result.length - 1].bannerText03
        } else {
          Swal.fire(data.message)
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/setting04')
      .then(response => {
        const data = response.data
        if (data.success) {
          this.bannerTitle04 = data.result[data.result.length - 1].bannerTitle04
          this.bannerText04 = data.result[data.result.length - 1].bannerText04
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
