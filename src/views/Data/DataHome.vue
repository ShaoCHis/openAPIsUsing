<template>
  <div>
    <el-header>
      <el-button class="el-icon-caret-left"
                 @click=goBack()
                 style="background-color: #efe4ff;font-size: 30px;font-weight: bold;position: fixed;left: 160px"
                 round
      >
        <span style="font-size: 20px">BACK</span>
      </el-button>
      <span class="headSpan">Welcome to Your Beautiful City!</span>
      <el-button class="el-icon-question"
                 @click=show()
                 style="background-color: #efe4ff;font-size: 30px;font-weight: bold;position: fixed;right: 0px;color:lightskyblue"
                 round></el-button>
    </el-header>
    <div id="container">
      <img :src="map" alt="" style="width:400px;height:400px;position:absolute;left: 13%;top: 15%">
      <span style="width:400px;position:absolute;left: 13%;top: 75%;font-size: 20px;font-style: italic;font-weight: bold">{{text}}</span>
      <div style="height: 200px">
        <el-table
            :data="weather"
            border
            style="width: 650px;position:absolute;right:7%;top: 10%;font-size: 18px">
          <!--          :data="weather.data.forecasts[0].casts"-->
          <el-table-column
              type="index"
              width="50px">
          </el-table-column>
          <el-table-column
              prop="date"
              label="日期"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="daytemp"
              label="日间温度"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="nighttemp"
              label="夜间温度"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="dayweather"
              label="天气"
              width="120px">
          </el-table-column>
          <el-table-column
              prop="power"
              label="风力"
              width="120px">
          </el-table-column>

        </el-table>
      </div>
      <span
          style="width:670px;height:300px;position:absolute;right: 7%;top: 48%;font-size: 20px;font-style: italic;font-weight: bold">{{ introduction }}</span>
      <span
          style="width:670px;height:300px;position:absolute;right: 7%;top: 77%;font-size: 30px;font-style: italic;font-weight: bold">This is a little thumbnail of the city you want to get to know, you can look at the geographical distribution of the city and so on</span>
    </div>
  </div>
</template>


<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "DataHome",

  data() {
    return {
      adcode: "",
      location: "",
      title: "",
      weather: [],
      map: null,
      introduction: "",
      airQuality: "",
      text:""
    }
  },

  methods: {

    async getWeather() {
      let that = this;
      let newUrl = "https://restapi.amap.com/v3/weather/weatherInfo?"
      axios({
        url: newUrl,
        methods: 'get',
        params: {
          key: "5c49a29bd677e41e010643b3e3cd1850",
          city: that.adcode,
          extensions: "all",
          output: "XML"
        }
      }).then((res) => {
        let parser = null;
        let xmlDoc = null;
        if (window.DOMParser) {
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(res.data, "text/xml");
        } else // Internet Explorer
        {
          // eslint-disable-next-line no-undef
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(res.data);
        }
        let x = xmlDoc.getElementsByTagName("cast");
        let temp = [];
        for (let i = 0; i < x.length; i++) {
          temp.push({
            date: x[i].childNodes[0].innerHTML,
            daytemp: x[i].childNodes[4].innerHTML,
            nighttemp: x[i].childNodes[5].innerHTML,
            dayweather: x[i].childNodes[2].innerHTML,
            power: x[i].childNodes[9].innerHTML
          });
        }
        that.weather = temp;
      })
    },

    async getMap() {
      let that = this;
      let newUrl = "https://restapi.amap.com/v3/staticmap?";
      axios({
        url: newUrl,
        methods: 'get',
        responseType: 'blob',
        params: {
          key: "5c49a29bd677e41e010643b3e3cd1850",
          location: that.location,
          zoom: "8",
          scale: "2",
          size: "400*400",
          markers: "large,," + "A:" + that.location,
          traffic: "0"
        }
      }).then((res) => {
        that.map = window.URL.createObjectURL(res.data); // 后端返回前端渲染
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    },

    async getIntroduction() {
      let that = this;
      let newUrl = "//zh.wikipedia.org/api/rest_v1/page/summary/" + that.title;
      axios({
        methods: 'get',
        url: newUrl,
      }).then((res) => {
        console.log(res);
        that.introduction = res.data.extract
        console.log(that.introduction)
      })
    },

    async getAirQuality() {
      let that = this;
      let newUrl = "http://route.showapi.com/104-42";
      axios({
        methods: 'get',
        url: newUrl,
        params: {
          showapi_appid: "797072",
          showapi_sign: "f9f90e83fc5542a5af26750fc71ed747",
          area: that.title
        }
      }).then((res) => {
        if (res.data.showapi_res_code != "0") {
          that.$message.error("There is something wrong!Please try again!");
          return;
        }
        that.airQuality = res.data.showapi_res_body;
        that.text="空气质量(单位ug/m3):so2:"+that.airQuality.so2+"(二氧化硫平均一小时);o3:"+that.airQuality.o3+"(臭氧平均一小时);pm2.5:"+that.airQuality.pm2_5+"(pm2.5平均一小时);空气质量指数："+that.airQuality.quality;
      }).catch((res) => {
        console.log(res);
        that.$message.error("There is something wrong!Please try again!");
      })
    },

    show() {
      this.$alert(
          "Welcome to my web;There I use some open APIS to support this web service.As you can see,when you type a city name,you will get many information about it.That's the function this web has!",
          "Some Ray",
          {
            confirmButtonText: "Confirm",
          }
      )
    },

    goBack() {
      this.$message("Come Back!");
      this.$router.push({name: 'Home'});
    },
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.location = this.$route.params.location;
    this.title = this.$route.params.title;
    this.getWeather();
    this.getMap();
    this.getIntroduction();
    this.getAirQuality();
  },
}
</script>

<style scoped>
.headSpan {
  /*transform: translate(-50%, -50%);*/
  color: black;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
}

.el-header {
  background-color: #efe4ff;
}

.container {
  width: 300px;
  height: 180px;
}
</style>