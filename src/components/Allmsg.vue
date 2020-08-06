<template>
  <div class="container">
    <div class="allmsg">
     <h2>留言管理</h2>
      <b-table :items="allmsg">
      <template v-slot:cell(process)="deal">
        <b-btn  variant="danger" v-if="!deal.item.process" @click="done(deal.index)">未處理</b-btn>
        <b-btn  variant="info" v-else-if="deal.item.process" @click="done(deal.index)" class="msgbtn">已處理
        </b-btn>
        <b-btn v-if="deal.item.process" @click="del(deal.index)">刪除</b-btn>
      </template>
      </b-table>
    </div>
    <hr>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      allmsg: []
    }
  },
  methods: {
    done (idx) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/msg/' + this.allmsg[idx]._id, { process: !this.allmsg[idx].process })
        .then(response => {
          if (this.allmsg[idx].process === false) {
            this.allmsg[idx].process = true
          } else if (this.allmsg[idx].process === true) {
            this.allmsg[idx].process = false
          }
          console.log(this.allmsg[idx].process)
        })
        .catch((error) => {
          console.log(error)
          alert('發生錯誤')
        })
    },
    del (idx) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/msg/' + this.allmsg[idx]._id)
        .then(response => {
          this.allmsg.splice(idx, 1)
          Swal.fire({
            title: '刪除成功',
            timer: 1000,
            showConfirmButton: false
          })
        })
        .catch(() => {
          Swal.fire('發生錯誤')
        })
    }

  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/msg')
      .then(response => {
        this.allmsg = response.data.result.map(d => {
          return {
            user: d.user,
            text: d.text,
            process: d.process
          }
        })
      })
      .catch(() => {
        Swal.fire('發生錯誤')
      })
  }

}
</script>
