<template>
  <div>
    <el-menu :default-active="activeIndex" style="background-color: #efe4ff" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 15px;font-style: italic;font-weight: bold">Delicious</el-menu-item>
      <el-menu-item index="2" style="font-size: 15px;font-style: italic;font-weight: bold">ScenicSpot</el-menu-item>
      <el-menu-item index="3" style="font-size: 15px;font-style: italic;font-weight: bold">University</el-menu-item>
      <el-menu-item index="4" style="font-size: 15px;font-style: italic;font-weight: bold">More</el-menu-item>
      <el-menu-item index="5" style="font-size: 15px;font-style: italic;font-weight: bold"><a
          href="https://www.meituan.com/" target="_blank">NowBegin</a></el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "Social.vue",

  data() {
    return {
      activeIndex: "1",
      activeName: "delicious",
      adcode: "",
      location: "",
      delicious: ""
    }
  },

  methods: {
    handleSelect(key) {
      switch (key){
        case "1":
          this.goDelicious();
          break;
        case "2":
          this.goScenicSpot();
          break;
        case "3":
          this.goUniversity();
          break;
        case "4":
          this.goMore();
          break;
        default:
          break;
      }
    },

    goMore(){
      this.$router.push({
        name: 'more',
        params: {
          adcode: this.adcode
        }
      })
    },

    goDelicious(){
      this.$router.push({
        name: 'delicious',
        params: {
          adcode: this.adcode
        }
      })
    },

    goScenicSpot(){
      this.$router.push({
        name: 'scenicSpot',
        params: {
          adcode: this.adcode,
        }
      })
    },

    goUniversity(){
      this.$router.push({
        name: 'university',
        params: {
          adcode: this.adcode,
        }
      })
    }
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.location = this.$route.params.location;
    this.goDelicious();
  }
}
</script>

<style scoped>

</style>