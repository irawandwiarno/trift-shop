<template>
  <NavBar></NavBar>
  <h1>This is an about page</h1>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'profile',
  components: {
    NavBar,
  },
  mounted(){
    // if(this.cookies.get("role") == undefined){
    //   this.$router.push("login");
    // }
  }
}
</script>
