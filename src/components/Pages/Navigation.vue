<template>
  <nav class="col-md-3 col-lg-2 d-md-block bg-danger sidebar collapse">
    <div class="position-sticky pt-3 ">
      <ul class="nav flex-column">
         <router-link class="btn btn-dark mb-3 mt-3" active-class="btn btn-light"  tag="button" to="/hakkimizda" exact>
          <button class="btn btn-dark">Hakkımızda</button>
        </router-link>
        <router-link class="btn btn-dark mb-3"   tag="button" to="/" exact>
          <button class="btn btn-dark">Ürünler</button>
        </router-link>
        <router-link class="btn btn-dark mb-3" active-class="btn btn-light"  tag="button" to="/kategori" exact>
          <button class="btn btn-dark">Kategori</button>
        </router-link>
        <router-link class="btn btn-dark mb-3" active-class="btn btn-light"  tag="button" to="/admins" exact>
          <button class="btn btn-dark">Adminler</button>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style scoped>
a {
  font-size: 18px;
  margin: 30px 20px;
  padding-top: 20px;
  color: black;
  font-weight: bold;
}

a{
    color: seagreen;
     text-decoration: none;

}
a:active {
  color: black;
}
</style>