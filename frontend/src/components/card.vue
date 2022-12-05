<template>
  <div class="card" style="width: 14rem">
    <img
      :src="'http://localhost:3000/' + imgName"
      class="img-thumbnail"
      :alt="imgName"
      style="height: 230px"
    />
    <div
      class="card-body d-flex flex-column justify-content-between"
      style="height: 16rem"
    >
      <div>
        <h5 class="card-title">{{ title }}</h5>
        <h6 class="card-title fw-bold">Rp. {{ price }}</h6>
        <p class="card-text"  >{{ description }}</p>
      </div>
      <button @click="addCart(id)" class="btn btn-orange">Add to cart</button>
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      cookie_idUser: String,
    };
  },

  props: {
    imgName: String,
    title: String,
    description: String,
    price: Number,
    id: String,
  },

  methods: {
    addCart: function (id) {
      console.log(this.cookie_idUser);
      if (this.cookie_idUser != undefined) {
        axios
          .post("/api/addtroli", {
            idUser: this.cookie_idUser,
            idBarang: id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

          alert("Behasil Di tambahkan ke keranjang");
      }
    },
  },

  mounted() {
    // this.cookies.set("idUser", "63627b10624c231aa07a7cff");
    this.cookie_idUser = this.cookies.get("idUser");
    // console.log(this.id);
  },
};
</script>

<style>
.btn-orange,
.btn-orange:active,
.btn-orange:visited {
  background-color: #fd841f !important;
  color: white !important;
}

.btn-orange:hover {
  background-color: #e14d2a !important;
  color: white !important;
}

.bg-orage {
  background-color: #fd841f;
}
</style>