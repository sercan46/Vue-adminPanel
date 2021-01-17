<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div v-if="isLoading == false" class="text-center" style="margin-top: 20vw">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-if="isLoading == true">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">Adminler</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="modeChange()"
            >
              Koyu / Açık Mod
            </button>
            <download-excel
              class="btn btn-sm btn-danger"
              :data="json_data"
              :fields="json_fields"
              worksheet="My Worksheet"
              name="adminler.xls"
            >
              Excel
            </download-excel>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10">
          <button
            type="button"
            class="btn btn-info mb-3"
            @click="showAdminAdd()"
          >
            Admin Ekle
          </button>
        </div>
        <div class="col-sm-2">
          <p style="color: crimson; font-weight: bold">
            Admin Sayısı: {{ admins.length }}
          </p>
        </div>
      </div>

      <div
        class="modal fade"
        id="edit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="hideAdminAdd()"
                  >
                    &times;
                  </button>
                  <h4 class="modal-title">{{ this.title }}</h4>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <div class="text-center">
                        <img
                          height="150"
                          width="150"
                          class="img-responsive text-center mb-3 ml-5"
                          :src="
                            admin.image == null
                              ? '../../src/assets/default.png'
                              : admin.image
                          "
                        />
                        <input
                          ref="file"
                          type="file"
                          style="display: none"
                          @change="onChange($event)"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="text-center">
                      <button
                        class="btn btn-warning"
                        type="button"
                        @click="$refs.file.click()"
                      >
                        Resim Seç
                      </button>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Admin Adı"
                        v-model="admin.name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        placeholder="Admin Yetkisi"
                        v-model="admin.auth"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Admin Mail Adresi"
                        v-model="admin.mail"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Admin Şifresi"
                        v-model="admin.password"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    v-if="titleButton == 'Ekle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="addAdmin()"
                  >
                    {{ title }}
                  </button>
                  <button
                    v-if="titleButton == 'Güncelle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="updateAdmin(admin)"
                  >
                    {{ title }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminForm
        @updateData="celldata"
        :adminItem="admins"
        :modeChange="formMode"
      ></AdminForm>
    </div>
  </main>
</template>
<script>
import AdminForm from "../Admin/AdminForm";
import ApiUrls from "../../mixin/ApiUrl";

export default {
  components: {
    AdminForm: AdminForm,
  },
  data: function () {
    return {
      //Kategori Model
      admin: {
        name: null,
        image: null,
        auth: null,
        mail: null,
        password: null,
      },

      //Kategoriler dizi
      admins: [],
      //Güncelle butonuna bastıktan sonra gelen kolon bilgisi
      updateData: [],
      //Form bilgilerinin değiştirilmesi
      title: "",
      titleButton: "",
      //Excel download için gerekli kısımlar...
      // Excel field isimleri ve alt dataları
      json_fields: {
        "Admin No": "key",
        "Admin Adı": "name",
        "Admin Yetkisi": "auth",
        "Admin Şifresi": "password",
        "Admin Mail Adres": "mail",
      },
      //Excel data
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      //Dark and light
      formMode: false,
      isLoading: false,
    };
  },
  methods: {
    //Popup göster
    showAdminAdd() {
      this.title = "Admin Ekle";
      this.titleButton = "Ekle";
      this.admin.name = "";
      this.admin.auth = "";
      this.admin.image = null;
      this.admin.mail = "";
      this.admin.password = "";
      $("#edit").modal("show");
    },
    //Popup gizle
    hideAdminAdd() {
      $("#edit").modal("hide");
    },
    //Kategorileri çek
    getAdmin() {
      
      this.$http.get(ApiUrls + "admin.json",).then((resp) => {
        let admin = resp.data;
        for (let key in admin) {
          this.admins.push({ id: key, admin: admin[key] });
        }
        for (let i in this.admins) {
          this.json_data.push({
            key: i,
            name: this.admins[i].admin.admin.name,
            auth: this.admins[i].admin.admin.auth,
            mail: this.admins[i].admin.admin.mail,
            password: this.admins[i].admin.admin.password,
          });
        }
        this.isLoading = true;
      });
    },
    //Kategori ekle
    addAdmin() {
      this.$http
        .post(ApiUrls + "admin.json", { admin: this.admin })
        .then((resp) => {
          this.admins = [];
          this.getAdmin();
          this.$toasted.show(`Admin Eklendi`, {
            duration: 3000,
            icon: "done_all",
            type: "success",
          });
          $("#edit").modal("hide");
        })
        .catch((err) => {
          this.$toasted.show(`${err}!`, {
            duration: 3000,
            icon: "error_outline",
            type: "error",
          });
        });
    },
    //Seçilen satırın datasını popupa gönderme
    celldata(event) {
      this.admin.id = event.id;
      this.admin.name = event.admin.admin.name;
      this.admin.image = event.admin.admin.image;
      this.admin.auth = event.admin.admin.auth;
      this.admin.mail = event.admin.admin.mail;
      this.admin.password = event.admin.admin.password;
      $("#edit").modal("show");
      this.title = "Admin Güncelle";
      this.titleButton = "Güncelle";
    },
    updateAdmin(value) {
      let updateAd = this.admins.filter((val) => {
        if (val.id == value.id) {
          val.admin.admin.name = value.name;
          val.admin.admin.auth = value.auth;
          val.admin.admin.image = value.image;
          val.admin.mail.image = value.mail;
          val.admin.admin.password = value.password;

          return val;
        }
      });

      this.$http
        .put(ApiUrls + "admin/" + value.id + "/.json", {
          admin: updateAd[0].admin.admin,
        })
        .then(
          (resp) => {
            this.$toasted.show(`Admin Güncellendi`, {
              duration: 3000,
              icon: "done_all",
              type: "success",
            });
            $("#edit").modal("hide");
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
    onChange(e) {
      const file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = () => {
        this.admin.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    modeChange() {
      this.formMode = !this.formMode;
    },
  },
  mounted() {
    this.getAdmin();
  },
};
</script>
<style scoped>
input {
  margin-top: 20px;
}
select {
  margin-top: 20px;
}
textarea {
  margin-top: 20px;
}
div img :hover,
div img :focus {
  width: 300px;
  height: 300px;
}
</style>