<template>
  <NavBar></NavBar>
  <div class="container mt-3">
    <div class="row">
      <div class="col-3 mb-3" v-for="(item, $index) in barang" :key="$index">
        <Card
          :title="item.title"
          :price="item.price"
          :imgName="item.image"
          :description="item.deskripsi"
          :id="item._id"
          class="shadow"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Card from "@/components/card.vue";
import { useCookies } from "vue3-cookies";


export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  name: "HomeView",
  components: {
    NavBar,
    Card,
  },
  data() {
    return {
      barang: [],
    };
  },

  mounted() {

    if(this.cookies.get("role") == undefined){
      this.$router.push("login");
    }
    
    // Simple GET request using fetch
    fetch("http://localhost:3000/home")
      .then((res) => res.json())
      .then((res) => {
        this.barang = res;
      })
      .catch((err) => console.log(err));
  },

  // setup(){
  //   let barangData = ref([]);

  //   onMounted(() => {
  //     axios
  //       .get("/home")
  //       .then((result) => {
  //         barangData.value = result.data;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   })
  // }
};
</script>

<style scoped>
.bg-orage {
  background-color: #fa9c18;
}
</style>
