<template>
  <div>
    <el-row :span="24">
      <el-col :span="11" :push="6">
        <el-input v-model="input" placeholder="Please Enter your favorite!" clearable
                  align="center" size="large" @keydown.enter.native="submit()">
        </el-input>
      </el-col>
      <!--      <el-col>-->
      <el-button icon="el-icon-search" circle @click="submit()"></el-button>
      <!--      </el-col>-->
    </el-row>
    <div :v-if="more">
      <el-carousel :interval="2000" type="card" style="height:270px;top:30px">
        <el-carousel-item v-for="item in imgUrl" :key="item.index">
          <!--        <div>-->
          <img :src="item" style="max-height: 280px">
          <!--        </div>-->
        </el-carousel-item>
      </el-carousel>
      <el-table
          :data="more.pois"
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
            width="320">
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
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "More",

  data() {
    return {
      adcode: "",
      more: "",
      input: "",
      imgUrl: []
    }
  },

  methods: {
    async getMore() {
      let that = this;
      let newUrl = "https://restapi.amap.com/v3/place/text?";
      axios({
        methods: 'get',
        url: newUrl,
        params: {
          key: "5c49a29bd677e41e010643b3e3cd1850",
          keywords: that.input,
          city: that.adcode
        }
      }).then((res) => {
        if (res.data.count == "0") {
          this.$message.error("Sorry!!There is no" + this.input + "!");
          return;
        }
        that.more = res.data;
        for (let i in that.more.pois) {
          if (that.more.pois[i].photos != '') {
            that.imgUrl.push(that.more.pois[i].photos[0].url)
          } else {
            continue;
          }
        }
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    },

    submit() {
      this.$message.warning("Searching!Please Waiting!");
      this.getMore();
    }
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.getMore();
  }
}
</script>

<style scoped>

</style>