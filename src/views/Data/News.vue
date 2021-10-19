<template>
  <div :v-if="news">
    <el-table
        :data="news"
        border
        style="width: 100%;height: 100%">
      <el-table-column
          type="index"
          width="50px">
      </el-table-column>
      <el-table-column
          prop="title"
          label="Title"
          width="200">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="Content"
          width="450">
      </el-table-column>
      <el-table-column
          prop="source"
          label="Source"
          width="120">
      </el-table-column>
      <el-table-column
          prop="channelName"
          label="ChannelName"
          width="120">
      </el-table-column>
      <el-table-column
          prop="pubDate"
          label="Date"
          width="150">
      </el-table-column>
      <el-table-column
          label="Link"
          width="185">
        <template slot-scope="scope">
          <a :href="scope.row.link" target="_blank" class="buttonText">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "Government.vue",

  data() {
    return {
      adcode: "",
      location: "",
      title: "",
      news: null
    }
  },

  methods: {
    async getNews() {
      let that = this;
      let newUrl = "https://route.showapi.com/109-35?";
      axios({
        methods: 'get',
        url: newUrl,
        params: {
          showapi_appid: "797072",
          showapi_sign: "f9f90e83fc5542a5af26750fc71ed747",
          title: that.title
        }
      }).then((res) => {
        if (res.data.showapi_res_code != "0") {
          that.$message.error("There is something wrong!Please try again!");
          return;
        }
        that.news = res.data.showapi_res_body.pagebean.contentlist;
        console.log(that.news)
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    }
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.location = this.$route.params.location;
    this.title = this.$route.params.title;
    this.getNews();
  }
}
</script>

<style scoped>

</style>