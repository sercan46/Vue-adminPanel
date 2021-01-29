<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse"
  >
    <div class="position-sticky pt-4">
      <ul class="nav flex-column">
        <router-link
          class="list-group-item mt-4 backColor"
          active-class="list-group-item activeBack"
          tag="a"
          to="/dashboard"
          exact
        >
          <li>
            <i class="fa fa-renren">
              <a href="" style="padding-left: 12px">Dashboard</a></i
            >
          </li>
        </router-link>
        <router-link
          class="list-group-item mt-4 backColor"
          active-class="list-group-item activeBack"
          tag="a"
          to="/hakkimizda"
          exact
        >
          <li>
            <i class="fa fa-address-card">
              <a href="" style="padding-left: 12px">Hakkımızda</a></i
            >
          </li>
        </router-link>
        <router-link
          class="list-group-item mt-4 backColor"
          active-class="list-group-item activeBack"
          tag="a"
          to="/"
          exact
        >
          <li>
            <i class="fa fa-cart-arrow-down">
              <a href="" style="padding-left: 12px">Ürünler</a></i
            >
          </li>
        </router-link>
        <router-link
          class="list-group-item mt-4 backColor"
          active-class="list-group-item activeBack"
          tag="a"
          to="/kategori"
          exact
        >
          <li>
            <i class="fa fa-barcode">
              <a href="" style="padding-left: 12px">Kategori</a></i
            >
          </li>
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
  color: white;
  text-decoration: none;
  font-size: 17px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
li {
  text-align: center;
  font-weight: bold;
  height: 7vh;
  padding-top: 10px;
  box-shadow: 3px 3px black;
}
.backColor {
  background-image: linear-gradient(to right, #ce7070, #6684c5);
}
.activeBack {
  background-image: linear-gradient(to right, rgb(134, 24, 24), rgb(134, 24, 24));
}
@media screen and (max-width: 992px) {
  .sidebar {
    top: 0 !important;
  }
  li {
    text-align: center;
    font-weight: bold;
    height: 5vh;
    padding-top: 10px;
    box-shadow: 3px 3px black;
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
}
@media screen and (max-width: 600px) {
  .sidebar {
    top: 0 !important;
    width: 32vh;
  }
  li {
    text-align: center;
    font-weight: bold;
    height: 4vh;
    padding-top: 10px;
    box-shadow: 3px 3px black;
  }
  a {
    color: black;
    text-decoration: none;
    font-size: 14px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
}
</style>