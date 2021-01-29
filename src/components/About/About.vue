<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pr-10">
    <div v-if="isLoading === false" class="text-center" style="margin-top: 20vw">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-if="isLoading === true">
      <div class="text-center pt-3">
        <img src="../../assets/companyicon.png" class="responsiveImage" />
      </div>
      <form class="mt-3">
        <hr />
        <h6 style="color: crimson">Genel Bilgiler</h6>

        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Şirket Adı</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Şirket Adı"
              v-model="user.companyName"
              :class="{
                'is-invalid': $v.user.companyName.$invalid,
                'is-valid': !$v.user.companyName.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Şirket Telefon Numarası</label>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control"
              placeholder="Şirket Telefon"
              v-model="user.companyPhone"
              :class="{
                'is-invalid': $v.user.companyPhone.$invalid,
                'is-valid': !$v.user.companyPhone.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Şirket Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              placeholder="Şirket Email"
              v-model="user.companyMail"
              :class="{
                'is-invalid': $v.user.companyMail.$invalid,
                'is-valid': !$v.user.companyMail.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Lokasyon</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Lokasyon"
              v-model="user.localation"
              :class="{
                'is-invalid': $v.user.localation.$invalid,
                'is-valid': !$v.user.localation.$invalid,
              }"
            />
          </div>
        </div>
        <hr />
        <h6 style="color: crimson">Sosyal Medya</h6>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">İnstagram</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="İnstagam Linki"
              v-model="user.instagram"
              :class="{
                'is-invalid': $v.user.instagram.$invalid,
                'is-valid': !$v.user.instagram.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Facebook</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Facebook Linki"
              v-model="user.facebook"
              :class="{
                'is-invalid': $v.user.facebook.$invalid,
                'is-valid': !$v.user.facebook.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Twiter</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Twiter Linki"
              v-model="user.twitter"
              :class="{
                'is-invalid': $v.user.twitter.$invalid,
                'is-valid': !$v.user.twitter.$invalid,
              }"
            />
          </div>
        </div>
        <div class="form-group row pt-3">
          <label class="col-sm-2 col-form-label">Linkedin</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              placeholder="Linkedin Linki"
              v-model="user.linkedin"
              :class="{
                'is-invalid': $v.user.linkedin.$invalid,
                'is-valid': !$v.user.linkedin.$invalid,
              }"
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="text-center mt-3">
            <button
              class="btn btn-primary"
              style="font-size: 20px"
              type="button"
              @click="updateUser(user)"
            >
              Tamam
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import ApiUrls from "../../mixin/ApiUrl";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        companyName: "",
        companyPhone: "",
        companyMail: "",
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        localation: "",
      },
      users: [],
            isLoading: false,

    };
  },
  validations: {
    user: {
      companyName: {
        required,
      },
      companyPhone: {
        required,
        minLength: minLength(10),
      },
      companyMail: {
        required,
        email,
      },
      instagram: {
        required,
      },
      facebook: {
        required,
      },
      twitter: {
        required,
      },
      linkedin: {
        required,
      },
      localation: {
        required,
      },
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http.get(ApiUrls + "about.json").then((resp) => {
        let about = resp.data;
        for (let key in about) {
          this.user = about[key].about;

          this.users.push({ id: key, about: about[key] });
        }
        this.isLoading=true;
      });
    },
    updateUser(val) {
      if (this.$v.user.$invalid) {
        this.$toasted.show(`Alanları Doğru Giriniz`, {
          duration: 3000,
          icon: "error_outline",
          type: "error",
        });
      } else {
        this.$http
          .put(ApiUrls + "about/" + this.users[0].id + "/.json", {
            about: val,
          })
          .then(
            (resp) => {
              this.$toasted.show(`Kullanıcı Güncellendi`, {
                duration: 3000,
                icon: "done_all",
                type: "success",
              });
            },
            (err) => {
              this.$toasted.show(`${err}!`, {
                duration: 3000,
                icon: "error_outline",
                type: "error",
              });
            }
          );
      }
    },
    post() {
      this.$http
        .post(ApiUrls + "about.json", { about: this.user })
        .then((resp) => {});
    },
  },
};
</script>
<style scoped>
.flag-example {
  height: 50 !important;
}
.responsiveImage {
  height: 25vh;
}

@media screen and (max-width: 992px) {
  .responsiveImage {
    height: 12vh;
  }
}
@media screen and (max-width: 600px) {
  .responsiveImage {
    height: 11vh;
  }
}
</style>