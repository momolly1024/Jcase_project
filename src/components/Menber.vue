<template>
<div id="Member">
  <h2>最新資料</h2>
  <div class="container">
  <div class="row">
    <div class="col-sm-4">
      <div class="card member">
        <div class="card-body">
          <h4 class="card-title">總案件數</h4>

            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal"
                :options="options"
                @ready="onReady"
              />
            </div>
            <p class="card-text">感謝所有會員的支持</p>
        </div>
      </div>
    </div>
    <div class="col-sm-4 ">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">總註冊人數</h4>

            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal"
                :options="options"
                @ready="onReady"
              />
            </div>
            <p class="card-text">我們會持續努力</p>
        </div>
      </div>
    </div>
    <div class="col-sm-4 ">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">捐款總金額</h4>

            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal"
                :options="options"
                @ready="onReady"
              />
            </div>
            <p class="card-text">本平台將所有營收捐給社福機構</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

</template>
<script type="text/babel">
import ICountUp from 'vue-countup-v2'
export default {
  name: 'demo',
  components: {
    ICountUp
  },
  data () {
    return {
      delay: 1000,
      endVal: 120500,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  methods: {
    onReady: function (instance, CountUp) {
      const that = this
      instance.update(that.endVal + 100)
    }
  }
}
</script>
