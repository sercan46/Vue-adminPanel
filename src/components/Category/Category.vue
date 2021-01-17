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
        <h1 class="h2">Kategoriler</h1>
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
              name="kategoriler.xls"
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
            @click="showCategoryAdd()"
          >
            Kategori Ekle
          </button>
        </div>
        <div class="col-sm-2">
          <p style="color: crimson; font-weight: bold">
            Kategori Sayısı: {{ categories.length }}
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
                    @click="hideCategoryAdd()"
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
                            category.image == null
                              ? '../../src/assets/default.png'
                              : category.image
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
                        placeholder="Kategori Adı"
                        v-model="category.name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        placeholder="Kategori Açıklaması"
                        v-model="category.description"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    v-if="titleButton == 'Ekle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="addCategory()"
                  >
                    {{ title }}
                  </button>
                  <button
                    v-if="titleButton == 'Güncelle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="updateCategory(category)"
                  >
                    {{ title }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryForm
        @updateData="celldata"
        :categoryItem="categories"
        :modeChange="formMode"
      ></CategoryForm>
    </div>
  </main>
</template>
<script>
import CategoryForm from "../Category/CategoryForm";
import ApiUrls from "../../mixin/ApiUrl";

export default {
  components: {
    CategoryForm: CategoryForm,
  },
  data: function () {
    return {
      //Kategori Model
      category: {
        name: null,
        image: null,
        description: null,
      },

      //Kategoriler dizi
      categories: [],
      //Güncelle butonuna bastıktan sonra gelen kolon bilgisi
      updateData: [],
      //Form bilgilerinin değiştirilmesi
      title: "",
      titleButton: "",
      //Excel download için gerekli kısımlar...
      // Excel field isimleri ve alt dataları
      json_fields: {
        "Kategori No": "key",
        "Kategori Adı": "name",
        "Kategori Açıklama": "description",
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
    showCategoryAdd() {
      this.title = "Kategori Ekle";
      this.titleButton = "Ekle";
      this.category.name = "";
      this.category.description = "";
      this.category.image = null;
      $("#edit").modal("show");
    },
    //Popup gizle
    hideCategoryAdd() {
      $("#edit").modal("hide");
    },
    //Kategorileri çek
    getCategory() {
      this.$http.get(ApiUrls + "category.json").then((resp) => {
        let category = resp.data;
        for (let key in category) {
          this.categories.push({ id: key, category: category[key] });
        }
        for (let i in this.categories) {
          this.json_data.push({
            key: i,
            name: this.categories[i].category.category.name,
            description: this.categories[i].category.category.description,
          });
        }
        this.isLoading = true;
      });
    },
    //Kategori ekle
    addCategory() {
      this.$http
        .post(ApiUrls + "category.json", { category: this.category })
        .then((resp) => {
          this.categories = [];
          this.getCategory();
          this.$toasted.show(`Kategori Eklendi`, {
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
      this.category.id = event.id;
      this.category.name = event.category.category.name;
      this.category.image = event.category.category.image;
      this.category.description = event.category.category.description;
      $("#edit").modal("show");
      this.title = "Kategori Güncelle";
      this.titleButton = "Güncelle";
    },
    updateCategory(value) {
      let updateCat = this.categories.filter((val) => {
        if (val.id == value.id) {
          val.category.category.name = value.name;
          val.category.category.description = value.description;
          val.category.category.image = value.image;
          return val;
        }
      });

      this.$http
        .put(ApiUrls + "category/" + value.id + "/.json", {
          category: updateCat[0].category.category,
        })
        .then(
          (resp) => {
            this.$toasted.show(`Kategori Güncellendi`, {
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
        this.category.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    modeChange() {
      this.formMode = !this.formMode;
    },
  },
  mounted() {
    this.getCategory();
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