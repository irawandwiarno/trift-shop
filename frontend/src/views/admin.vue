<template>
  <NavBar />
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Foto</th>
          <th scope="col">Title</th>
          <th scope="col">Deskripsi</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, $index) in listData" :key="$index">
          <th scope="row">{{ $index + 1 }}</th>
          <td>
            <img
              :src="'http://localhost:3000/'+item.image"
              class=""
              width="100"
              alt=""
            />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.deskripsi }}</td>
          <td>{{ item.price }}</td>
          <td>
            <router-link class="btn btn-orange mx-1" :to="'/edit?id=' + item._id">
              Edit
            </router-link>
            <button class="btn btn-danger mx-1" @click="hapus(item._id)">
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarAdmin.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      listData: {},
    };
  },
  components: {
    NavBar,
  },

  methods: {
    hapus(id) {
      const c = confirm(
        "Do you really want to delete it? You will not be able to restore this data again!"
      );
      if (c) {
        axios
          .delete("/api/barang", {
            params: { id },
          })
          .then((res) => {
            console.log(res);
            alert(res.data.message);
          });

        location.reload();
      }
    },
  },
  mounted() {
    if (this.cookies.get("role") == undefined) {
      this.$router.push("login");
    } else if (this.cookies.get("role") != "admin") {
      this.$router.push("/");
    }

    axios
      .get("/home")
      .then((res) => {
        this.listData = res.data;
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
</style>