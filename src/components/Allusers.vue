<template>
  <div class="container">
    <div class="userlist">
      <h2>所有使用者帳號</h2>
      <b-table striped hover :items="userlist">
        <template v-slot:cell(block)="data">
          <!-- {{ data }} -->
          <b-btn @click="block(data.index)" variant="info" v-if="!data.item.block">封鎖</b-btn>
          <b-btn  @click="block(data.index)" variant="warning" v-else-if="data.item.block">復原</b-btn>
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
      userlist: []
    }
  },
  methods: {
    block (idx) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/users/' + this.userlist[idx]._id, { block: !this.userlist[idx].block })
        .then(response => {
          if (this.userlist[idx].block === false) {
            this.userlist[idx].block = true
            Swal.fire({
              title: '已封鎖',
              timer: 1000,
              showConfirmButton: false
            })
          } else if (this.userlist[idx].block === true) {
            this.userlist[idx].block = false
            Swal.fire({
              title: '已解除',
              timer: 1000,
              showConfirmButton: false
            })
          }
          console.log(this.userlist[idx].block)
        })
        .catch((error) => {
          console.log(error)
          alert('發生錯誤')
        })
    }

  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/user')
      .then(response => {
        this.userlist = response.data.result.map(d => {
          return {
            account: d.account,
            nickname: d.nickname,
            email: d.email,
            _id: d._id,
            block: d.block
          }
        })
      })
      .catch(() => {
        Swal.fire('發生錯誤')
      })
  }

}
</script>
