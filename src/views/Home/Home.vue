<template>
  <div class="background">
    <br><br><br>
    <br><br><br>
    <h1 style="color:white">
      CITY INFORMATION
    </h1>
    <br>
    <el-row :span="24">
      <el-col :span="11" :push="6">
        <el-input v-model="input" placeholder="Please Enter the Name of Your Beautiful City Name" clearable
                  align="center" size="large" :rows="100" @keydown.enter.native="submit()">
        </el-input>
      </el-col>
      <!--      <el-col>-->
      <el-button icon="el-icon-search" circle @click="submit()"></el-button>
      <!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "Home",

  data() {
    return {
      input: "",
      adcode: "",
      location: "",
      title: ""
    }
  },

  methods: {
    async getAdcode() {
      let that = this;
      axios({
        url: "https://restapi.amap.com/v3/geocode/geo?",
        methods: 'get',
        params: {
          key: '5c49a29bd677e41e010643b3e3cd1850',
          address: that.input,
          output: "XML"
        }
      }).then((res) => {
        let parser=null;
        let xmlDoc=null;
        if (window.DOMParser)
        {
          parser=new DOMParser();
          xmlDoc=parser.parseFromString(res.data,"text/xml");
        }
        else // Internet Explorer
        {
          // eslint-disable-next-line no-undef
          xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async=false;
          xmlDoc.loadXML(res.data);
        }
        if (xmlDoc.getElementsByTagName("count")[0].childNodes[0].nodeValue == "0") {
          that.$message.error("City is wrong!Please try again!");
        } else {
          that.adcode=xmlDoc.getElementsByTagName("adcode")[0].childNodes[0].nodeValue
          // that.adcode = res.data.geocodes[0].adcode;
          that.location=xmlDoc.getElementsByTagName("location")[0].childNodes[0].nodeValue
          // that.location = res.data.geocodes[0].location;
          that.title=xmlDoc.getElementsByTagName("formatted_address")[0].childNodes[0].nodeValue
          // that.title = res.data.geocodes[0].formatted_address;
          that.$message.success("this is " + that.title + "'s information!");
          that.goDataPage();
        }
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    },

    goDataPage() {
      this.$router.push({
        name: 'DataPage',
        params: {
          adcode: this.adcode,
          location: this.location,
          title: this.title
        }
      });
    },

    submit() {
      this.$message.warning("Searching!Please Waiting!");
      this.getAdcode();
    },
  },
}
</script>

<style scoped>
.background {
  background: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

* {
  margin: 0;
  border: 0;
  padding: 0;
}
</style>