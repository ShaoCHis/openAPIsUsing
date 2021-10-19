<template>
  <div :v-if="scenicSpot">
    <el-carousel :interval="2000" type="card" style="height:300px;top:30px">
      <el-carousel-item v-for="item in imgUrl" :key="item.index">
        <!--        <div>-->
        <img :src="item">
        <!--        </div>-->
      </el-carousel-item>
    </el-carousel>
    <el-table
        :data="scenicSpot.pois"
        height="350"
        border
        style="width: 100%;top:60px">
      <el-table-column
          type="index"
          width="50px">
      </el-table-column>
      <el-table-column
          prop="name"
          label="Name"
          width="220">
      </el-table-column>
      <el-table-column
          prop="address"
          label="Location"
          width="220">
      </el-table-column>
      <el-table-column
          prop="biz_ext.opentime2"
          label="OpenTime"
          width="220">
      </el-table-column>
      <el-table-column
          prop="type"
          label="Type"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tel"
          label="Tel">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "ScenicSpot",

  data() {
    return {
      adcode: "",
      scenicSpot: "",
      imgUrl: []
    }
  },

  methods: {
    async getScenicSpot() {
      let that = this;
      let newUrl = "https://restapi.amap.com/v3/place/text?";
      axios({
        methods: 'get',
        url: newUrl,
        params: {
          key: "5c49a29bd677e41e010643b3e3cd1850",
          keywords: "景点",
          city: that.adcode
        }
      }).then((res) => {
        if(res.data.count=="0"){
          this.$message.error("Sorry!!There is no ScenicSpot!");
          return;
        }
        that.scenicSpot = res.data;
        for (let i in that.scenicSpot.pois) {
          if (that.scenicSpot.pois[i].photos != '') {
            that.imgUrl.push(that.scenicSpot.pois[i].photos[0].url)
          } else {
            continue;
          }
        }
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    },
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.getScenicSpot();
  }
}
</script>

<style scoped>

</style>