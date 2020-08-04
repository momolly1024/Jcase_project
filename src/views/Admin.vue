<template>
<div id="Admin">
  <h1>後台管理  </h1>
  <p> {{ date }} </p>
  <br>
  <div class="back">
    <b-tabs content-class="mt-3">
      <b-tab title="新增後台帳號" ><Createadmin></Createadmin></b-tab>
      <b-tab title="修改banner文字"><Setting></Setting></b-tab>
      <b-tab title="修改合作廠商"><Coopedit></Coopedit></b-tab>
      <b-tab title="所有使用者" active><Allusers></Allusers></b-tab>
      <b-tab title="所有留言"><Allmsg></Allmsg></b-tab>
      <b-tab title="所有後台使用者"><Alladmins></Alladmins></b-tab>
      <b-tab title="後台操作紀錄"><Record></Record></b-tab>

    </b-tabs>
  </div>
    <a href="#" @click="logout" class="adminlogout"><font-awesome-icon :icon="['fas', 'user-friends']"/>登出後台</a>
</div>

</template>
<script>
import Createadmin from '@/components/Createadmin.vue'
import Setting from '@/components/Setting.vue'
import Coopedit from '@/components/Coopedit.vue'
import Allusers from '@/components/Allusers.vue'
import Allmsg from '@/components/Allmsg.vue'
import Record from '@/components/Record.vue'
import Alladmins from '@/components/Alladmins.vue'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      date: new Date().toLocaleString()

    }
  },
  components: {
    Createadmin,
    Setting,
    Coopedit,
    Allusers,
    Allmsg,
    Alladmins,
    Record
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logoutback')
        .then(response => {
          const data = response.data
          if (data.success) {
            Swal.fire({
              title: '登入成功!',
              timer: 1000,
              showConfirmButton: false
            })
            // this.$store.commit('login', this.account)
            this.$router.push('/Back')
          } else {
            alert(data.message)
          }
        }).catch(error => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
