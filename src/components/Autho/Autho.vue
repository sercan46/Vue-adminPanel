<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Yetkili Girişi</h3>
                <p class="text-muted mb-4">Gerekli Bilgileri Giriniz</p>
                <form>
                  <div class="form-group mb-3">
                    <input
                      v-model="user.email"
                      type="email"
                      placeholder="Email adresi"
                      required=""
                      autofocus=""
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <input
                      v-model="user.password"
                      type="password"
                      placeholder="Şifre"
                      required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>
                  <div class="text-center">
                    <button
                      type="button"
                      class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      style="font-size: 18px"
                      @click="login()"
                    >
                      GİRİŞ YAP
                    </button>
                  </div>
                  <div class="text-center d-flex justify-content-between mt-4">
                    <p>
                      Üyelik İçin İletişime Geçiniz:
                      <a
                        href="mailto:chesercan@gmail.com"
                        class="font-italic text-muted"
                      >
                        <u>chesercan@gmail.com</u></a
                      >
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("login", { ...this.user })
        .then(() => {
          this.$router.push("/");
          this.$toasted.show(`Giriş Başarılı`, {
            duration: 3000,
            icon: "done_all",
            type: "success",
          });
        })
        .catch((err) => {
          console.warn(err);
          let responseError = "";
          if (err.data.error.message == "MISSING_EMAIL") {
            responseError = "E-mail adresi giriniz";
          } else if (err.data.error.message == "INVALID_EMAIL") {
            responseError = "Geçersiz E-mail adresi";
          } else if (err.data.error.message == "MISSING_PASSWORD") {
            responseError = "Şifrenizi giriniz";
          } else if (err.data.error.message == "INVALID_PASSWORD") {
            responseError = "Geçersiz şifre";
          } else if (
            err.data.error.message ==
            "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          ) {
            responseError =
              "Çok fazla hatalı giriş yaptınız daha sonra tekrar deneyiniz";
          }
          this.$toasted.show(`${responseError}!`, {
            duration: 3000,
            icon: "error_outline",
            type: "error",
          });
        });
    },
  },
};
</script>
<style scoped>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url("../../assets/login.png");
  background-size: cover;
  background-position: center center;
}
</style>