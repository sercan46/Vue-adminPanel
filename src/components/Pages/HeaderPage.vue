<template>
  <div class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 text-center" style="background-color:black"
      ><img src="../../assets/favicon.png" height="60" width="150"
    /></a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="" style="color:#AFEEEE" @click="outProgram">Çıkış Yap</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods:{
    outProgram(){
      this.$store.dispatch("logout")
    }
  }
}
</script>
<style scoped>
 
</style>