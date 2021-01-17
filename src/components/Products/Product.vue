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
        <h1 class="h2">Ürünler</h1>
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
              name="urunler.xls"
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
            @click="showProdAdd()"
          >
            Ürün Ekle
          </button>
        </div>
        <div class="col-sm-2">
          <p style="color: crimson; font-weight: bold">
            Ürün Sayısı: {{ products.length }}
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
                    @click="hideProdAdd()"
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
                            product.image == null
                              ? '../../src/assets/default.png'
                              : product.image
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
                    <div class="error">
                      <span v-if="!$v.product.image.required"
                        >Resim Alanı Zorunludur.</span
                      >
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
                        placeholder="Ürün Adı"
                        v-model="product.name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <select class="form-control" v-model="product.category">
                        <option value="" disabled selected hidden>
                          Kategori Seç
                        </option>
                        <option
                          v-for="category in categories"
                          :value="category.name"
                          :key="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Ürün Fiyatı"
                        v-model="product.price"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Ürün Adeti"
                        v-model="product.count"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        placeholder="Ürün Açıklaması"
                        v-model="product.description"
                        :class="{
                          'is-invalid': $v.product.description.$invalid,
                          'is-valid': !$v.product.description.$invalid,
                        }"
                      />
                    </div>
                    <div class="error">
                      <span v-if="!$v.product.description.minLength"
                        >Name must have at least letters.</span
                      >
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    v-if="titleButton == 'Ekle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="addProduct(product)"
                  >
                    {{ title }}
                  </button>
                  <button
                    v-if="titleButton == 'Güncelle'"
                    type="submit"
                    class="btn btn-primary"
                    @click="updateProduct(product)"
                  >
                    {{ title }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductForm
        @updateData="celldata"
        :prodItem="products"
        :modeChange="formMode"
      ></ProductForm>
    </div>
  </main>
</template>
<script>
import ProductForm from "../Products/ProductForm";
import ApiUrls from "../../mixin/ApiUrl";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  components: {
    ProductForm: ProductForm,
  },
  data: function () {
    return {
      //Ürün Model
      product: {
        name: null,
        category: null,
        price: null,
        count: null,
        image: null,
        description: null,
      },
      //Ürünler dizi
      products: [],
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
        "Urun No": "key",
        "Urun Adı": "name",
        "Urun Kategorisi": "category",
        "Urun Fiyatı": "price",
        "Urun Adeti": "count",
        "Urun Toplamı": "totalPrice",
        "Urun Açıklama": "description",
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

  validations: {
    product: {
      image: {
        required,
      },
      description: {
        required,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    //Popup göster
    showProdAdd() {
      this.title = "Ürün Ekle";
      this.titleButton = "Ekle";
      this.product.name = "";
      this.product.category = "";
      this.product.price = "";
      this.product.count = "";
      this.product.description = "";
      this.product.image = null;
      $("#edit").modal("show");
    },
    //Popup gizle
    hideProdAdd() {
      $("#edit").modal("hide");
    },
    //Ürünleri çek
    getProduct() {
      this.$http.get(ApiUrls + "product.json").then((resp) => {
        let product = resp.data;
        for (let key in product) {
          this.products.push({ id: key, product: product[key] });
        }
        for (let i in this.products) {
          this.json_data.push({
            key: i,
            name: this.products[i].product.product.name,
            category: this.products[i].product.product.category,
            count: this.products[i].product.product.count,
            price: this.products[i].product.product.price + " ₺",
            totalPrice:
              this.products[i].product.product.count *
                this.products[i].product.product.price +
              " ₺",
            description: this.products[i].product.product.description,
          });
        }
        this.isLoading = true;
      });
    },
    //Kategorileri çek
    getCategory() {
      this.$http.get(ApiUrls + "/category.json").then((resp) => {
        let categoryData = resp.data;
        for (let key in categoryData) {
          this.categories.push({
            id: key,
            name: categoryData[key].category.name,
          });
        }
      });
    },
    //Ürün ekle
    addProduct() {
      if (this.$v.product.$invalid) {
        this.$toasted.show(`Alanları Doğru Giriniz`, {
          duration: 3000,
          icon: "error_outline",
          type: "error",
        });
      } else {
        this.$http
          .post(ApiUrls + "product.json", { product: this.product })
          .then((resp) => {
            this.products = [];
            this.getProduct();
            this.$toasted.show(`Ürün Eklendi`, {
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
      }
    },
    //Seçilen satırın datasını popupa gönderme
    celldata(event) {
      this.product.id = event.id;
      this.product.name = event.product.product.name;
      this.product.category = event.product.product.category;
      this.product.price = event.product.product.price;
      this.product.count = event.product.product.count;
      this.product.image = event.product.product.image;
      this.product.description = event.product.product.description;
      $("#edit").modal("show");
      this.title = "Ürün Güncelle";
      this.titleButton = "Güncelle";
    },
    updateProduct(value) {
      let updateProd = this.products.filter((val) => {
        if (val.id == value.id) {
          val.product.product.category = value.category;
          val.product.product.count = value.count;
          val.product.product.name = value.name;
          val.product.product.price = value.price;
          val.product.product.description = value.description;
          val.product.product.image = value.image;
          return val;
        }
      });

      this.$http
        .put(ApiUrls + "product/" + value.id + "/.json", {
          product: updateProd[0].product.product,
        })
        .then(
          (resp) => {
            this.$toasted.show(`Ürün Güncellendi`, {
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
        this.product.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    modeChange() {
      this.formMode = !this.formMode;
    },
  },
  mounted() {
    this.getProduct();
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