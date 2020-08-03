<template>
  <div id="qa">
    <h2>常見問題</h2>
    <div class="q1">
      <b-button v-b-toggle.collapse-1 class="m-1" variant="info">網站用了哪些技術？</b-button>
      <b-collapse  id="collapse-1">
        <b-card>vue.js / vue-cil / bootstrap-vue / vue-axios / cors / <br>
        sweetalert2 / axvue-routerios / vuex / 後端 node.js / 資料庫 mongoDB ...等

        </b-card>
      </b-collapse>
    </div>
    <div class="q2">
      <b-button v-b-toggle.collapse-2 class="m-1" variant="info">為什麼網站很多BUG？</b-button>
      <b-collapse  id="collapse-2">
        <b-card>真的嗎？  請使用 <a href="" ><router-link to="/contact">聯繫我們</router-link></a> 提交BUG重現流程，我們將隨機發送小禮物給您，已表感謝。</b-card>
      </b-collapse>
    </div>

    <div class="q3">
      <b-button v-b-toggle.collapse-3 class="m-1" variant="info">為什麼提案很久都沒人聯繫？</b-button>
      <b-collapse  id="collapse-3">
        <b-card>通常預算是影響最大的部分，可以至 <a href="">提案報價</a> 參考預算，也可能是技術難度等問題。</b-card>
      </b-collapse>
    </div>
    <div class="q4">
      <b-button v-b-toggle.collapse-4 class="m-1" variant="info">帳號為何被封鎖？</b-button>
      <b-collapse  id="collapse-4">
        <b-card>上傳違法或廣告等，都有可能造成帳號被封鎖，詳細原因請聯繫管理員。</b-card>
      </b-collapse>
    </div>
     <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  components: {
    Footer
  },
  data () {
    return {
      visible: true
    }
  }
}
</script>
