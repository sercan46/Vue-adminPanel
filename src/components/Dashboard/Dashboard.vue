<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="text-center m-3">
      <h1 style="color: crimson">Dashboard</h1>
      <div class="btn-group me-2">
        <p>Veri Analizleri</p>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
          <div id="chartProdCount" style="height: 300px; width: 100%"></div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
          <div id="chartProdPrice" style="height: 300px; width: 100%"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
          <div id="chartGroupCategory" style="height: 300px; width: 100%"></div>
        </div>

        <div class="col-md-2"></div>

        <div class="col-md-5 shadow-lg p-3 mb-5 bg-white rounded">
          <div
            id="chartGroupCategoryPrice"
            style="height: 300px; width: 100%"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import ApiUrls from "../../mixin/ApiUrl";
import PieChart from "../../mixin/Chart";
export default {
  data() {
    return {
      products: [],
      mode: true,
    };
  },
  methods: {
    getProduct() {
      /**
       * Get ProdData
       */
      this.$http.get(ApiUrls + "product.json").then((resp) => {
        let product = resp.data;
        for (let key in product) {
          this.products.push({ id: key, product: product[key] });
        }
        /**
         * Product alt array
         */
        let prodName = this.products.map((x) => x.product.product);
        /**
         * 1 Chart
         */
        let nameAndCount = prodName.map((x) => {
          return {
            label: x.name,
            y: x.count,
          };
        });
        PieChart(
          "chartProdCount",
          true,
          "Ürün Adına Göre Adet Miktarı",
          "green",
          '##0 "Adet"',
          nameAndCount
        );
        /**
         * 2 chart
         */
        let nameAndPrice = prodName.map((x) => {
          return {
            label: x.name,
            y: x.price,
          };
        });
        PieChart(
          "chartProdPrice",
          true,
          "Ürün Adına Göre Fiyatı",
          "green",
          '##0.00 "₺"',
          nameAndPrice
        );
        /**
         * 3. Chart
         */
        var resultProdCount = [];
        prodName.reduce(function (res, value) {
          if (!res[value.category]) {
            res[value.category] = { category: value.category, count: 0 };
            resultProdCount.push(res[value.category]);
          }
          res[value.category].count += parseInt(value.count);
          return res;
        }, {});

        let groupByGroup = resultProdCount.map((x) => {
          return {
            label: x.category,
            y: x.count,
          };
        });
        PieChart(
          "chartGroupCategory",
          true,
          "Ürün Kategorisine Göre Adet",
          "green",
          '##0.00 "Adet"',
          groupByGroup
        );
        /**
         * 4. Chart
         */
        var resultProdPrice = [];
        prodName.reduce(function (res, value) {
          if (!res[value.category]) {
            res[value.category] = { category: value.category, price: 0 };
            resultProdPrice.push(res[value.category]);
          }
          res[value.category].price += parseInt(value.price);
          return res;
        }, {});

        let groupByGroupPrice = resultProdPrice.map((x) => {
          return {
            label: x.category,
            y: x.price,
          };
        });
        PieChart(
          "chartGroupCategoryPrice",
          true,
          "Ürün Kategorisine Göre Fiyat",
          "green",
          '##0.00 "₺"',
          groupByGroupPrice
        );
      });
    },
    modeChange() {
      this.mode = !this.mode;
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
<style scoped>
cardStyle {
  box-shadow: 2px;
}
</style>