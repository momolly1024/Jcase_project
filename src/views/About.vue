<template>
  <div id="about" class="container">
    <h2>個人資訊</h2>
    <div class="user row">

      <div class="col text-center">
        <img src="https://picsum.photos/150/150/?random=1" style="border-radius:50%">
      </div>
      <div class="col">
      <h4>帳號：{{ this.user }}</h4>
      <h4>暱稱：{{ this.userdetail[0].nickname }}</h4>
      <h4>email：{{ this.userdetail[0].email }}</h4>
      <h4 v-if="!this.userdetail[0].block">會員狀態：一般會員</h4>
      <h4 v-else style="color:red">帳號已封鎖(不得接案提案)，請聯繫管理員</h4>
      </div>

    </div>
    <hr>
    <br>
    <h2 v-if="likecases.lenth!=0">提案收藏</h2>
    <br>

    <div class="likecase row">
      <b-card-group deck  v-for="(likecase, idx) in likecases" :key="idx" class="col-12 col-md-6 col-lg-4 " style="margin-bottom:2rem">
        <b-card>
          <template v-slot:header>
            <p>{{ likecase.title }}</p>
          </template>
          <b-card-text>
                  類型：{{ likecase.type }} <br>
                  預算：{{ likecase.budget }} <br>
                  詳情：{{ likecase.description }}  <br>
                  提案時間：{{ likecase.date }}
          </b-card-text>

          <template v-slot:footer>
            <b-btn variant="warning" @click="remove(likecase, idx)">移除</b-btn>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <hr>
    <h2 v-if="(selfcases.length!=0)" style="color:rgb(170, 155, 155)">已提案項目</h2>
    <br>
    <div class="row likecase">
      <b-card-group deck v-for="(selfcases, idx) in selfcases" :key="idx" style="margin-bottom:2rem;" class="col-12 col-md-6 col-lg-4">
        <b-card>
          <template v-slot:header>
            <p>{{ selfcases.title }}</p>
          </template>
          <b-card-text>
                  類型：{{ selfcases.type }} <br>
                  預算：{{ selfcases.budget }} <br>
                  提案時間：{{ selfcases.date }}<br>
                  詳情：{{ selfcases.description }}  <br>

          </b-card-text>
          <template v-slot:footer>
            <b-form-textarea v-model="selfcases.description" v-if="selfcases.isedit" class="textarea"></b-form-textarea>

            <b-btn variant="danger" @click="del(selfcases, idx)" v-if="!selfcases.isedit">移除</b-btn>
            <b-btn variant="warning" @click="edit(selfcases, idx)" v-if="!selfcases.isedit">編輯</b-btn>
            <b-btn variant="info" @click="cancel(selfcases, idx)" v-if="selfcases.isedit">取消</b-btn>
            <b-btn variant="warning" @click="update(selfcases, idx)" v-if="selfcases.isedit">儲存</b-btn>

          </template>
        </b-card>
      </b-card-group>
    </div>

    <Footer></Footer>

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
      selfcases: [],
      likecases: [],
      account: '',
      userdetail: [
        {
          nickname: '',
          email: '',
          block: ''
        }
      ]

    }
  },
  methods: {
    del (selfcase, idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/case/' + selfcase._id)
        .then(response => {
          this.selfcases.splice(idx, 1)
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
    edit (selfcase, idx) {
      selfcase.isedit = true
    },
    update (selfcase, idx) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/case/' + selfcase._id, { description: this.selfcases[idx].description })
        .then(response => {
          selfcase.isedit = false
          Swal.fire({
            title: '修改完成',
            timer: 1000,
            showConfirmButton: false
          })
        })
        .catch((error) => {
          console.log(error)
          alert('發生錯誤')
        })
    },
    cancel (selfcase, idx) {
      selfcase.isedit = false
    },
    remove (likecase, idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/like/' + likecase._id)
        .then(response => {
          this.likecases.splice(idx, 1)
          Swal.fire({
            title: '移除成功',
            timer: 1000,
            showConfirmButton: false
          })
        })
        .catch(error => {
          console.log(error)
          Swal.fire('發生錯誤')
        })
    }

  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/case/' + this.user)
      .then(response => {
        this.selfcases = response.data.result.map(d => {
          return {
            user: d.user,
            title: d.title,
            type: d.type,
            edit: false,
            budget: d.budget,
            description: d.description,
            _id: d._id,
            date: d.date,
            isedit: d.isedit
          }
        })
        // console.log(this.selfcases)
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/like/' + this.user)
      .then(response => {
        this.likecases = response.data.result.map(d => {
          return {
            user: d.user,
            title: d.title,
            type: d.type,
            budget: d.budget,
            description: d.description,
            _id: d._id,
            date: d.date
          }
        })
      })
      .catch(() => {
        alert('發生錯誤')
      })
    this.axios.get(process.env.VUE_APP_APIURL + '/users/' + this.user)
      .then(response => {
        // console.log(response.data)
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
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }

}
</script>
