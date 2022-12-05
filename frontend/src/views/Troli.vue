<template>
  <NavBar></NavBar>
  <div class="container mt-3">
    <div
      class="d-flex justify-content-center"
      v-if="respon.message == 'Cart Kosong'"
    >
      <h1>Cart Kosong Bang</h1>
    </div>
    <div class="row" v-else>
      <div class="col-lg-3 col-md-4 col-6 my-2" v-for="(item, $index) in barangInCart" :key="$index">
        <CardAdd
          :title="item.title"
          :imgName="item.image"
          :description="item.deskripsi"
          :id="item._id"
          :idTroli="item.idTroli"
          :price="item.price"
        ></CardAdd>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";
import CardAdd from "@/components/cardInCart.vue";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  name: "My Shop",
  components: {
    NavBar,
    CardAdd,
  },

  data() {
    return {
      barangInCart: [],
      cookie_idUser: String,
      respon: {},
    };
  },

  mounted() {
    if (this.cookies.get("role") == undefined) {
      this.$router.push("login");
    }

    this.cookie_idUser = this.cookies.get("idUser");
    // console.log(this.cookies.get("username"));

    axios
      .get("http://localhost:3000/api/troli", {
        params: {
          iduser: this.cookie_idUser,
        },
      })
      .then(async (res) => {
        this.respon = res.data;
        if (this.respon.message == "Card Ditemukan") {
          this.barangInCart = this.respon.data;
        }
        // console.log(this.respon.message);
      })
      .catch((err) => console.log(err));

    // console.log(this.id);
  },
};
</script>

<style>
</style>