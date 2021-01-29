<template>
  <div id="app">
    <Header v-if="hide" />
    <Navbar v-if="hide" />
    <HomePage />
  </div>
</template>

<script>
import HomePageVue from "./components/Pages/HomePage";
import HeaderPage from "./components/Pages/HeaderPage";
import Navbar from "./components/Pages/Navigation";
export default {
  components: {
    HomePage: HomePageVue,
    Header: HeaderPage,
    Navbar: Navbar,
  },
  created(){
      this.$store.dispatch("initAuth")
  },
  computed:{
      hide(){
        return this.$route.path !=='/auth'
      }
  }
};
</script>
<style>
</style>
