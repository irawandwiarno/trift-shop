<template>
  <NavBar />
  <div
    class="container-fluid d-flex login align-items-center"
    style="height: 100vh"
  >
    <div class="d-flex justify-content-center" style="width: 100%">
      <div class="box shadow">
        <div class="d-flex justify-content-center">
          <span class="pb-3 px-3">
            <div class="fs-roboto fw-bold">Tambah Bar</div>
          </span>
        </div>
        <form @submit.prevent="onUpload">
          <div class="mb-3">
            <label for="fileIn" class="form-label">Title</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              class="form-control"
              id="fileIn"
              @change="fileKontrol"
            />
          </div>
          <div class="mb-3">
            <label for="col1" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              id="col1"
              autocomplete="off"
              v-model="barang.title"
            />
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style="height: 100px"
              v-model="barang.deskripsi"
            ></textarea>
            <label for="floatingTextarea2">Deskripsi</label>
          </div>
          <div class="mb-3">
            <label for="col3" class="form-label">Harga</label>
            <input
              type="number"
              class="form-control"
              id="col3"
              v-model="barang.price"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-orange">Submit</button>
            <button @click="back()" class="btn btn-danger">cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavbarAdmin.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    NavBar,
  },
  data() {
    return {
      files: null,
      barang: {
        title: null,
        deskripsi: null,
        price: null,
        image: null,
      },
    };
  },
  methods: {
    back() {
      this.$router.push("admin");
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.files, this.files.name);
      fd.append("title", this.barang.title);
      fd.append("deskripsi", this.barang.deskripsi);
      fd.append("price", this.barang.price);
      // console.log(this.barang.image);
      axios
        .post("/barang", fd)
        .then((res) => {
          const data = res.data;
          alert("Tambah Data " + data.message);
        })
        .catch((err) => console.log(err));
    },
    fileKontrol(event) {
      this.files = event.target.files[0];
    },

    mounted() {
      if (this.cookies.get("role") == undefined) {
        this.$router.push("login");
      } else if (this.cookies.get("role") != "admin") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #f0f2f5;
}

.box {
  background-color: #ffffff;
  width: 35rem;
  height: auto;
  border-radius: 3%;
  padding: 2rem;
}
</style>