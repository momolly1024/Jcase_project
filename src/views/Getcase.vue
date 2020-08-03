<template>
<div id="getcase" class="container">
  <h2>接案搜尋</h2>
  <div class="search row">
    <div class="col-4">
    提案類型
    <b-form-select :options="options" v-model="type">
    </b-form-select>
    </div>
    <div class="col-8">搜尋
      <b-form-input
      id="input-live"
      placeholder="搜尋提案項目"
      trim
      v-model="searchWords">
      </b-form-input>
    </div>
  </div>

  <div class="showcase">

    <b-table striped hover :items="filterSearch" :fields="fields"       id="my-table"
      :per-page="perPage"
      :current-page="currentPage"
      >
      <template v-slot:cell(詳情)="detail">
        <b-button v-b-modal.modal-center variant="info" @click="more(detail)">詳情</b-button>
      </template>

      <template v-slot:cell(收藏)="data">
        <b-btn v-if="!data.item.like" @click="addCase(data.item)" variant="info">❤</b-btn>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="pagination"
      pills
      variant="info"
    ></b-pagination>

  </div>
  <!-- <div class="pttcases">
    <h6 v-if="pttcases.lenth!==0">PTT</h6>
    <b-button @click="ptt">PTT</b-button>
    <b-table-simple border="1" class="m-auto" striped hover responsive   v-for="(pttcase, idx) in pttcases" :key="idx">
    <td>
      連結：{{ pttcase.href }} <br>
      標題： {{ pttcase.title }}<br>
    </td>
    </b-table-simple>

  </div> -->
  <Footer></Footer>
  <b-modal id="modal-center" centered title="詳情" ok-only>
    <p class="my-4">{{ modal.title }}</p>
    <p class="my-4">{{ modal.detail }}</p>
  </b-modal>
</div>
</template>

<script>
import Footer from '../components/Footer'
import Swal from 'sweetalert2'

export default {
  components: {
    Footer
  },
  data () {
    return {
      userdetail: [],
      perPage: 10,
      currentPage: 1,
      modal: {
        title: '',
        detail: ''
      },
      searchWords: '',
      options: [
        { value: 'all', text: '全選' },
        { value: '網頁/APP程式設計', text: '網頁/APP程式設計' },
        { value: '資料庫分析管理', text: '資料庫分析管理' },
        { value: '技術顧問教學', text: '技術顧問教學' }
      ],
      fields: [
        {
          key: '提案類型',
          sortable: false
        },
        {
          key: '提案項目',
          sortable: false
        },
        {
          key: '預算',
          sortable: true
        },
        {
          key: '詳情',
          sortable: false
        },
        {
          key: '提案日期',
          sortable: true
        },
        {
          key: '收藏',
          sortable: false
        }
      ],
      selfcases: [],
      likecases: [],
      data: '',
      title: '',
      filterResult: [],
      pttcases: [],
      type: 'all'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    filterSearch () {
      if (this.type === 'all') {
        return this.selfcases.filter(searchResult => searchResult.提案項目.match(this.searchWords))
      } else {
        return this.selfcases.filter(searchResult => searchResult.提案項目.match(this.searchWords) && searchResult.提案類型.match(this.type))
      }
    },
    rows () {
      return this.filterSearch.length
    }

  },
  methods: {
    more (detail) {
      this.modal.title = detail.item.提案項目
      this.modal.detail = detail.item.詳情
      this.$bvModal.show('modal-center')
    },
    addCase (item) {
      const selfid = this.selfcases.findIndex(c => {
        return c === item
      })
      this.axios.post(
        process.env.VUE_APP_APIURL + '/like',
        {
          user: this.user,
          caseid: this.selfcases[selfid]._id,
          title: this.selfcases[selfid].提案項目,
          type: this.selfcases[selfid].提案類型,
          budget: this.selfcases[selfid].預算,
          description: this.selfcases[selfid].詳情,
          date: this.selfcases[selfid].提案日期
        }
      ).then(response => {
        const data = response.data
        if (data.success) {
          this.selfcases[selfid].like = true
          Swal.fire({
            title: '收藏成功',
            timer: 800,
            showConfirmButton: false
          })
          this.likecases.push(
            {
              user: this.user,
              caseid: response.data.caseid,
              title: this.selfcases[selfid].提案項目,
              type: this.selfcases[selfid].提案類型,
              budget: this.selfcases[selfid].預算,
              description: this.selfcases[selfid].詳情,
              date: this.selfcases[selfid].提案日期
            }
          )
        } else {
          Swal.fire(data.message)
        }
      })
        .catch(error => {
          Swal.fire(error.response.data.message)
        })
    },
    delCase (idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/like/' + this.selfcases[idx]._id)
        .then(response => {
          // console.log(this.selfcases)
          this.selfcases[idx].splice(idx, 1)
          this.selfcases[idx].like = false
          Swal.fire({
            title: '刪除成功',
            timer: 1000,
            showConfirmButton: false
          })
        })
        .catch(() => {
          Swal.fire('發生錯誤')
        })
    },
    ptt () {
      this.axios.get(process.env.VUE_APP_APIURL + '/pttcase')
        .then(response => {
          console.log(response.data)
          this.pttcases.push(response.data.result)
          this.pttcases = response.data.result.map(d => {
            return {
              href: d.href,
              title: d.title
            }
          })
          console.log(this.pttcases)
        })
        .catch(() => {
          alert('發生錯誤')
        })
    }

  },
  async mounted () {
    try {
      let response = await this.axios.get(process.env.VUE_APP_APIURL + '/case/')
      this.selfcases = response.data.result.map(d => {
        return {
          用戶: d.user,
          提案項目: d.title,
          提案類型: d.type,
          預算: d.budget,
          詳情: d.description,
          提案日期: d.date,
          like: false,
          _id: d._id
        }
      })
      response = await this.axios.get(process.env.VUE_APP_APIURL + '/like/' + this.user)
      const data = response.data
      if (data.success) {
        // 收藏的
        const likes = data.result.map(d => {
          return d.caseid
        })
        // 所有的
        const cases = this.selfcases.map(cc => {
          return cc._id
        })
        for (const like of likes) {
          const idx = cases.indexOf(like)
          if (idx > -1) {
            this.selfcases[idx].like = true
          }
        }
      } else {
        Swal.fire(data.message)
      }

      response = await this.axios.get(process.env.VUE_APP_APIURL + '/users/' + this.user)
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
    } catch (error) {
      Swal.fire('發生錯誤')
    }
  }
}
</script>
