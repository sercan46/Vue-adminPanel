<template>
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
          <th>Admin Resmi</th>
          <th>Admin Adı</th>
          <th>Admin Yetki</th>
          <th>Admin Mail</th>
          <th>Admin Şifre</th>
          <th>Aksiyonlar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ad, index) in adminItem" :key="ad.id">
          <td style="font-weight: bold; color: darkred; padding-top: 6vh">
            {{ index }}
          </td>
          <td>
            <img
              height="80"
              width="80"
              class="img-responsive text-center mb-3 ml-5"
              :src="ad.admin.admin.image"
            />
          </td>

          <td style="padding-top: 6vh">
            {{ ad.admin.admin.name }}
          </td>

          <td style="padding-top: 6vh">
            {{ ad.admin.admin.auth }}
          </td>
          <td style="padding-top: 6vh">
            {{ ad.admin.admin.mail }}
          </td>
          <td style="padding-top: 6vh">
            {{ ad.admin.admin.password }}
          </td>
          <td style="padding-top: 6vh">
            <button class="btn btn-primary btn-sm" @click="updateAdmin(ad)">
              Güncelle
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteAdmin(ad)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ApiUrls from "../../mixin/ApiUrl";
export default {
  props: ["adminItem", "modeChange"],

  methods: {
    //Ürün Silme
    deleteAdmin(value) {
      let conf = confirm(
        `${value.admin.admin.name} İsimli Admini Silmek İstiyormusunuz?`
      );
      if (conf == true) {
        this.$http
          .delete(ApiUrls + "admin/" + value.id + ".json")
          .then((resp) => {
            let index = this.adminItem.findIndex((i) => {
              return i.id == value.id;
            });
            this.adminItem.splice(index, 1);
            this.$toasted.show(`Admin Silindi`, {
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
    updateAdmin(value) {
      this.$emit("updateData", value);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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