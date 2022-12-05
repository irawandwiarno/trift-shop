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
      <div class="div">
        <h5 class="card-title">{{ title }}</h5>
        <h6 class="card-title fw-bold">Rp. {{ price }}</h6>

        <p class="card-text">{{ description }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <button @click="hapus(idTroli)" class="btn btn-danger">hapus</button>
        <a
          :href="
            'https://wa.me/6285733791578?text=Hai+I+am+' +
            username +
            '%2C+i+need+Order%0D%0AItem+%3A+' +
            title +
            '%0D%0APrice+%3A+' +
            price
          "
          class="btn btn-orange"
          target="_blank"
          >Check-out</a
        >
      </div>
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
      username: null,
    };
  },

  props: {
    imgName: String,
    title: String,
    description: String,
    price: Number,
    id: String,
    idTroli: String,
  },

  methods: {
    hapus: function (id) {
      const c = confirm(
        "Do you really want to delete it? You will not be able to restore this data again!"
      );
      if (c) {
        axios
          .delete("/api/troli", {
            params: { id },
          })
          .then((res) => {
            console.log(res);
          });

        location.reload();
      }
    },
    cekOut() {
      "Hai+I+need+Order%0D%0ABarang+%3A+nama+barang%0D%0Aharga+%3A+harga";
    },
  },

  mounted() {
    // this.cookies.set("idUser", "63627b10624c231aa07a7cff");
    this.cookie_idUser = this.cookies.get("idUser");
    // console.log(this.id);
    axios
      .get("/user/getOne", {
        params: {
          id: this.cookie_idUser,
        },
      })
      .then((res) => {
        this.username = res.data.data.username;
      });
  },
};
</script>

<style scoped>
.btn-orange,
.btn-orange:hover,
.btn-orange:active,
.btn-orange:visited {
  background-color: var(--second-color) !important;
}
</style>
