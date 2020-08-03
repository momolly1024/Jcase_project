<template>
  <div class="home">
    <Carousel></Carousel>
    <Cooperation></Cooperation>
    <Advantage></Advantage>
    <Member></Member>
    <Story></Story>
    <Footer></Footer>

  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import Cooperation from '@/components/Cooperation.vue'
import Member from '@/components/Menber.vue'
import Footer from '@/components/Footer.vue'
import Story from '@/components/Story.vue'
import Advantage from '@/components/Advantage.vue'
export default {
  name: 'Home',
  components: {
    Carousel,
    Cooperation,
    Advantage,
    Member,
    Footer,
    Story
  }
}
</script>
