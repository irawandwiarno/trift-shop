<template>
  <div
    class="container-fluid login d-flex align-items-center"
    style="height: 100vh"
  >
    <div class="d-flex justify-content-center" style="width: 100%">
      <div class="box shadow">
        <form @submit.prevent="update">
          <div class="mb-3">
            <label for="col1" class="form-label">Title</label>
            <input type="text" class="form-control" id="col1" v-model="title" />
          </div>
          <div class="mb-3">
            <label for="col2" class="form-label">Deskripsi</label>
            <input
              type="text"
              class="form-control"
              id="col2"
              v-model="deskripsi"
            />
          </div>
          <div class="mb-3">
            <label for="col3" class="form-label">Harga</label>
            <input
              type="number"
              class="form-control"
              id="col3"
              v-model="harga"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button @click="update()" class="btn btn-orange">Submit</button>
            <button @click="back()" class="btn btn-danger">cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {},
      atribut: {},
      title: "",
      deskripsi: "",
      harga: 0,
    };
  },

  methods: {
    update() {
      const idEdit = this.$route.query.id;
      axios.put("/api/update-barang", {
        id: idEdit,
        title: this.title,
        deskripsi: this.deskripsi,
        price: this.harga,
      });
      window.alert("Berhasil meng edit");
      this.$router.push("admin");
    },
    back() {
      this.$router.push("admin");
    },
  },

  mounted() {
    const idEdit = this.$route.query.id;
    // console.log(idEdit);

    axios
      .get("/api/get-barang", {
        params: { id: idEdit },
      })
      .then((res) => {
        this.data = res.data;
        this.atribut = this.data.data;
        this.title = this.atribut.title;
        this.deskripsi = this.atribut.deskripsi;
        this.harga = this.atribut.price;
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scope>
.box {
  background-color: #ffffff;
  width: 35rem;
  height: auto;
  border-radius: 3%;
  padding: 2rem;
}

.login {
  background-color: #f0f2f5;
}
</style>