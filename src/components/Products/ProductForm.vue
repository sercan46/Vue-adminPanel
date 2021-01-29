<template>
<div>
  <div class="table-responsive">
    <table
      :class="{
        'table table-striped table-dark': modeChange,
        'table table-striped': !modeChange,
      }"
    >
      <thead>
        <tr>
          <th>No</th>
          <th>Ürün Resmi</th>
          <th>Ürün Adı</th>
          <th>Ürün Kategorisi</th>
          <th>Ürün Fiyatı</th>
          <th>Ürün Miktarı</th>
          <th>Toplam Fiyat</th>
          <th>Ürün Açıklama</th>
          <th>Aksiyonlar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod, index) in prodItem" :key="prod.id">
          <td style="font-weight: bold; color: darkred; padding-top: 6vh">
            {{ index }}
          </td>
          <td>
            <img
              height="80"
              width="80"
              class="img-responsive text-center mb-3 ml-5"
              :src="prod.product.product.image"
               @click="
                  imageShow(
                    prod.product.product.image,
                   prod.product.product.name
                  )
                "
            />
          </td>

          <td style="padding-top: 6vh">
            {{ prod.product.product.name }}
          </td>
          <td style="padding-top: 6vh">
            {{ prod.product.product.category }}
          </td>
          <td style="padding-top: 6vh">
            {{ formatPrice(prod.product.product.price) + " ₺" }}
          </td>
          <td style="padding-top: 6vh">{{ prod.product.product.count }}</td>
          <td style="padding-top: 6vh">
            {{
              formatPrice(
                prod.product.product.count * prod.product.product.price
              ) + " ₺"
            }}
          </td>
          <td style="padding-top: 6vh">
            {{ prod.product.product.description }}
          </td>
          <td style="padding-top: 6vh">
            <button class="btn btn-primary btn-sm" @click="updateProduct(prod)">
              Güncelle
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(prod)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="color: green; font-weight: bold; font-size: 12px">
            Toplam:
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td style="color: #cd853f; font-weight: bold; font-size: 12px">
            {{ formatPrice(totalPriceFonk) }} ₺
          </td>
          <td style="color: #cd853f; font-weight: bold; font-size: 12px">
            {{ totalCountFonk }}
          </td>
          <td style="color: #cd853f; font-weight: bold; font-size: 12px">
            {{ formatPrice(maxTotalPriceFonk) }} ₺
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
    <div
      class="modal fade"
      id="edit2"
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
                  @click="hideImageDetail()"
                >
                  &times;
                </button>
                <h4 class="modal-title">{{ productName }}</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <div class="text-center">
                      <img
                        height="250"
                        width="250"
                        class="img-responsive text-center mb-3 ml-5"
                        :src="image"
                      />
                    </div>
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
import ApiUrls from "../../mixin/ApiUrl";
export default {
  props: ["prodItem", "modeChange"],
  data() {
    return {
      totalPrice: 0,
      totalCount: 0,
      maxTotalPrice: 0,
      image: "",
      productName: "",
    };
  },
  computed: {
    totalPriceFonk: function () {
      this.totalPrice = 0;
      this.prodItem.forEach((resp) => {
        let deger = parseInt(resp.product.product.price);
        this.totalPrice += deger;
      });
      return this.totalPrice;
    },
    totalCountFonk: function () {
      this.totalCount = 0;

      this.prodItem.forEach((resp) => {
        let deger = parseInt(resp.product.product.count);
        this.totalCount += deger;
      });
      return this.totalCount;
    },
    maxTotalPriceFonk: function () {
      this.maxTotalPrice = 0;
      this.prodItem.forEach((resp) => {
        let deger =
          parseInt(resp.product.product.price) *
          parseInt(resp.product.product.count);
        this.maxTotalPrice += deger;
      });
      return this.maxTotalPrice;
    },
  },
  methods: {
    //Ürün Silme
    deleteProduct(value) {
      let conf = confirm(
        `${value.product.product.name} İsimli Ürünü Silmek İstiyormusunuz?`
      );
      if (conf == true) {
        this.$http
          .delete(ApiUrls + "product/" + value.id + ".json")
          .then((resp) => {
            let index = this.prodItem.findIndex((i) => {
              return i.id == value.id;
            });
            this.prodItem.splice(index, 1);
            this.$toasted.show(`Ürün Silindi`, {
              duration: 3000,
              icon: "done_all",
              type: "info",
            });
          })
          .catch((err) => {
            this.$toasted.show(`${err}`, {
              duration: 3000,
              icon: "error_outline",
              type: "error",
            });
          });
      }
    },
    //Ürün Güncelle butonuna tıklanınca
    updateProduct(value) {
      this.$emit("updateData", value);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  imageShow(image, productName) {
      this.image = image;
      this.productName = productName;
      $("#edit2").modal("show");
    },
    hideImageDetail() {
      $("#edit2").modal("hide");
    },
  },
};
</script>
<style scoped>
th {
  font-size: 15px;
}
td {
  font-size: 13px;
}
</style>