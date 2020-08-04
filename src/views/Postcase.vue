<template lang="pug">
  #postcase.container.postcase
    h2.text-center 新增提案
    hr
    div.exampleid#copy
      b-button(@click="copyEvent('copy')" variant="info" size="sm" id="copybtn") 複製說明範例
      p 【提案人】：王先生
      p 【聯繫方式】：手機 0912-234-567
      p 【地區】：遠端
      p 【期限】：2020/12/31前
      p 【備註】：須上架app store
    br
    b-form(@submit="submit" id="sendform")
      p(v-model="date") {{date}}
      b-form-input(
        class="postform-control"
        v-model="title"
        placeholder="請輸入標題"
        :state="textstate"
      )
      br
      b-form-select(
        v-model="selected"
        :options="options"
      )
      br
      br
      b-form-input(
        class="postform-control"
        v-model="budget"
        placeholder="請輸入預算金額"
      )
      br
      b-form-textarea(
        class="postform-control"
        v-model="description"
        placeholder="案件說明"
        rows="3" max-rows="6"
        maxlength="200"
        :state="textstate"
      )
      br
      b-button(type="submit" variant="info" @click="submit(event)") 送出
    Footer
</template>

<script>
import Footer from '@/components/Footer.vue'
import Swal from 'sweetalert2'

export default {
  name: 'postcase',
  components: {
    Footer
  },
  data () {
    return {
      userdetail: [],
      file: null,
      description: '',
      state: null,
      textstate: null,
      selected: null,
      title: '',
      budget: '',
      options: [
        { value: null, text: '選擇提案類型' },
        { value: '網頁/APP程式設計', text: '網頁/APP程式設計' },
        { value: '資料庫分析管理', text: '資料庫分析管理' },
        { value: '技術顧問教學', text: '技術顧問教學' }
      ],
      selfcases: [],
      date: new Date().toLocaleString(),
      isedit: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    copyEvent (id) {
      const str = document.getElementById(id)
      window.getSelection().selectAllChildren(str)
      document.execCommand('Copy')
    },
    submit (event) {
      event.preventDefault()
      this.axios.post(
        process.env.VUE_APP_APIURL + '/case',
        {
          user: this.user,
          title: this.title,
          type: this.selected,
          description: this.description,
          budget: this.budget,
          date: this.date,
          isedit: this.isedit
        }
      ).then(response => {
        const data = response.data
        if (data.success) {
          this.selfcases.push(
            {
              user: this.user,
              title: this.title,
              type: this.selected,
              edit: false,
              budget: this.budget,
              description: this.description,
              _id: response.data._id,
              date: this.date,
              isedit: this.isedit
            }
          )
          Swal.fire({
            title: '提案成功',
            timer: 1000,
            showConfirmButton: false
          })
          this.title = ''
          this.selected = null
          this.description = ''
          this.budget = ''
        } else {
          Swal.fire(data.message)
        }
      })
        .catch(error => {
          Swal.fire(error.response.data.message)
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/users/' + this.user)
      .then(response => {
        this.userdetail = response.data.result.map(d => {
          return {
            user: d.user,
            account: d.account,
            nickname: d.nickname,
            email: d.email,
            block: d.block,
            _id: d._id
          }
        })
        if (this.userdetail[0].block) {
          Swal.fire({
            title: '帳號停用，請聯繫管理員',
            timer: 1000,
            showConfirmButton: false
          })
          this.$router.push('/contact')
        }
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }

}
</script>
