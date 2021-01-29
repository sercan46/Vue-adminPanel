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
            <th>Kategori Resmi</th>
            <th>Kategori Adı</th>
            <th>Kategori Açıklama</th>
            <th>Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cat, index) in categoryItem" :key="cat.id">
            <td style="font-weight: bold; color: darkred; padding-top: 6vh">
              {{ index }}
            </td>
            <td>
              <img
                height="80"
                width="80"
                class="img-responsive text-center mb-3 ml-5"
                :src="cat.category.category.image"
                @click="
                  imageShow(
                    cat.category.category.image,
                    cat.category.category.name
                  )
                "
              />
            </td>

            <td style="padding-top: 6vh">
              {{ cat.category.category.name }}
            </td>

            <td style="padding-top: 6vh">
              {{ cat.category.category.description }}
            </td>
            <td style="padding-top: 6vh">
              <button
                class="btn btn-primary btn-sm"
                @click="updateCategory(cat)"
              >
                Güncelle
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteCategory(cat)"
              >
                Sil
              </button>
            </td>
          </tr>
        </tbody>
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
                <h4 class="modal-title">{{ categoryName }}</h4>
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
  props: ["categoryItem", "modeChange"],
  data() {
    return {
      totalPrice: 0,
      totalCount: 0,
      maxTotalPrice: 0,
      deger: [],
      image: "",
      categoryName: "",
    };
  },

  methods: {
    //Ürün Silme
    deleteCategory(value) {
      let conf = confirm(
        `${value.category.category.name} İsimli Kategoriyi Silmek İstiyormusunuz?`
      );
      if (conf == true) {
        this.$http
          .delete(ApiUrls + "category/" + value.id + ".json")
          .then((resp) => {
            let index = this.categoryItem.findIndex((i) => {
              return i.id == value.id;
            });
            this.categoryItem.splice(index, 1);
            this.$toasted.show(`Kategori Silindi`, {
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
    updateCategory(value) {
      this.$emit("updateData", value);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    imageShow(image, categoryName) {
      this.image = image;
      this.categoryName = categoryName;
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