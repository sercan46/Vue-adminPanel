<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pr-10">
    <div class="text-center pt-3">
      <img src="../../assets/companyicon.png" height="250" />
    </div>
    <form class="mt-3">
      <hr />
      <h6 style="color:crimson">Genel Bilgiler</h6>
 
      <div class="form-group row pt-3">
        <label class="col-sm-2 col-form-label">Şirket Adı</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            placeholder="Şirket Adı"
            v-model="user.companyName"
          />
        </div>
      </div>
      <div class="form-group row pt-3">
        <label class="col-sm-2 col-form-label">Şirket Telefon Numarası</label>
        <div class="col-sm-10">
          <input
            type="number"
            class="form-control"
            placeholder="Şirket Telefon Numarası"
            v-model="user.companyPhone"
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
          />
        </div>
      </div>
      <div class="form-group row pt-3">
        <label class="col-sm-2 col-form-label">Şifre</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            placeholder="Şifre"
            v-model="user.password"
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
          />
        </div>
      </div>
      <hr />
      <h6 style="color:crimson">Sosyal Medya</h6>
      <div class="form-group row pt-3">
        <label class="col-sm-2 col-form-label">İnstagram</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            placeholder="İnstagam Linki"
            v-model="user.instagram"
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
  </main>
</template>
<script>
import ApiUrls from "../../mixin/ApiUrl";

export default {
  data() {
    return {
      user: {
        companyName: "",
        companyPhone: "",
        companyMail: "",
        password: "",
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        localation: "",
      },
      users: [],
    };
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
      });
    },
    updateUser(val) {
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
    },
    post() {
      this.$http
        .post(ApiUrls + "about.json", { about: this.user })
        .then((resp) => {
        });
    },
  },
};
</script>
<style scoped>
</style>