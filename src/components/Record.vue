<template>
  <div id="record">
    <h2>後台操作紀錄</h2>
    <form action="">
      <input v-model="searchWords" placeholder="搜尋帳號"> <br><br>
      <!-- <input v-model="type" placeholder="搜尋項目"> -->
    </form>

    <div>
      <b-table responsive  striped hover :items="filterSearch" :fields="fields"
      >
      </b-table>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchWhat: '',
      searchAdmin: '',
      adminlog: [
        { number: '1', account: 'qweretrytr', what: 'errqw', who: 'ejrwif', date: '2010' },
        { number: '2', account: 'afsdsgfdg', what: 'errqw', who: 'ejrwif', date: '2020' },
        { number: '3', account: 'gfhdgasfgsdg', what: 'errqw', who: 'ejrwif', date: '2015' }
      ],
      fields: [
        {
          key: 'number',
          label: '序號',
          sortable: true
        },
        {
          key: 'account',
          label: '後台帳號',
          sortable: false
        },
        {
          key: 'what',
          label: '操作項目',
          sortable: false
        },
        {
          key: 'who',
          label: '對象',
          sortable: false
        },
        {
          key: 'date',
          label: '操作時間',
          sortable: true
        }
      ],
      type: '',
      searchWords: ''
    }
  },
  computed: {
    filterSearch: function () {
      if (this.type === 'all') {
        return this.selfcases
      } else {
        return this.adminlog.filter(searchResult => searchResult.account.match(this.searchWords) && searchResult.what.match(this.type))
      }
    }
  }
}
</script>
