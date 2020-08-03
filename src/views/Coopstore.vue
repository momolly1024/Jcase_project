<template>
  <div id="store" class="container">
    <h1>合作廠商</h1>
    <br>
    <div class="store container">
        <b-tabs pills vertical content-class="mt-3" align="center">
          <b-tab title="小農產品" active><Agriculture></Agriculture></b-tab>
          <b-tab title="Tab 1" ><b-card-text>Tab contents 1</b-card-text></b-tab>
          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
          <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
        </b-tabs>

    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/Footer'
import Agriculture from '../components/Agriculture'
export default {
  components: {
    Footer,
    Agriculture
  }
}
</script>
