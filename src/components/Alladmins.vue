<template>
  <div class="container">
    <div class="adminlist">
      <h2>後台管理</h2>
      <b-table striped hover :items="adminlist">
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
      adminlist: []
    }
  },
  methods: {
    block (idx) {
      this.axios.patch(process.env.VUE_APP_APIURL + '/admins/' + this.adminlist[idx]._id, { block: !this.adminlist[idx].block })
        .then(response => {
          if (this.adminlist[idx].block === false) {
            this.adminlist[idx].block = true
            Swal.fire({
              title: '已封鎖',
              timer: 1000,
              showConfirmButton: false
            })
          } else if (this.adminlist[idx].block === true) {
            this.adminlist[idx].block = false
            Swal.fire({
              title: '已解除',
              timer: 1000,
              showConfirmButton: false
            })
          }
          console.log(this.adminlist[idx].block)
        })
        .catch((error) => {
          console.log(error)
          alert('發生錯誤')
        })
    }

  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/admin')
      .then(response => {
        this.adminlist = response.data.result.map(d => {
          return {
            account: d.account,
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
