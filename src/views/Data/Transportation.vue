<template>
  <div>
    <el-header>
      <el-input
          placeholder="请输入起始地"
          suffix-icon="el-icon-location"
          v-model="departStation"
          style="width:10%;position:absolute;left: 15%;top: 1.5%">
      </el-input>
      <el-input
          placeholder="请输入目的地"
          suffix-icon="el-icon-location-information"
          v-model="arrivalStation"
          style="width:10%;position:absolute;left: 30%;top: 1.5%">
      </el-input>
      <el-input
          placeholder="请输入日期(如：20210101)"
          suffix-icon="el-icon-date"
          v-model="date"
          style="width:20%;position:absolute;left: 45%;top: 1.5%">
      </el-input>
      <el-select v-model="type" placeholder="请选择票的种类" style="width:10%;position:absolute;left: 75%;top: 1.5%">
        <el-option
            v-for="item in ticketType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button icon="el-icon-search" circle @click="submit()" style="position: absolute;left: 90%;top: 1.5%;background-color: lightskyblue"></el-button>
    </el-header>
    <br>
    <div :v-if="transport">
      <el-table
          :data="transport"
          border
          style="width: 100%;height: 100%">
        <el-table-column
            type="index"
            width="50px">
        </el-table-column>
        <el-table-column
            prop="bookingState"
            label="bookingState"
            width="150">
          <template scope="scope">
            <p v-if="scope.row.bookingState=='0'">不可预订</p>
            <p v-if="scope.row.bookingState=='1'">可预订</p>
            <p v-if="scope.row.bookingState=='2'">不可预订</p>
            <p v-if="scope.row.bookingState=='3'">发车前半小时不可预订</p>
          </template>
        </el-table-column>
        <el-table-column
            prop="trainNum"
            label="TrainNum"
            width="150">
        </el-table-column>
        <el-table-column
            prop="departStation"
            label="DepartStation"
            width="150">
        </el-table-column>
        <el-table-column
            prop="arrivalStation"
            label="ArrivalStation"
            width="150">
        </el-table-column>
        <el-table-column
            prop="departTime"
            label="Start"
            width="130">
        </el-table-column>
        <el-table-column
            prop="arrivalTime"
            label="End"
            width="130">
        </el-table-column>
        <el-table-column
            prop="trainType"
            label="TrainType"
            width="150">
        </el-table-column>
        <el-table-column
            label="Learn More"
            width="240">
          <template>
            <a href="https://trains.ctrip.com/" target="_blank" class="buttonText">https://trains.ctrip.com/</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {

  name: "Transportation.vue",

  data() {
    return {
      adcode: "",
      location: "",
      title: "",
      date: "",
      departStation: "",
      arrivalStation: "",
      type: "",
      transport: "",
      ticketType:[{
        value:'1',
        label:"普通票"
      },{
        value:'2',
        label:"学生票"
      }]
    }
  },

  methods: {
    async getTransportation() {
      let that = this;
      let newUrl = "https://route.showapi.com/1651-1?"
      axios({
        methods: 'get',
        url: newUrl,
        params: {
          showapi_appid: "797072",
          showapi_sign: "f9f90e83fc5542a5af26750fc71ed747",
          date: that.date,
          type: that.type,
          departStation: that.departStation,
          arrivalStation: that.arrivalStation
        }
      }).then((res) => {
        console.log(res)
        if (res.data.showapi_res_code != "0") {
          that.$message.error("There is something wrong!Please try again!");
          return;
        }
        that.transport = res.data.showapi_res_body.trains;
        that.$message.success(res.data.showapi_res_body.remark);
      }).catch((err) => {
        console.log(err);
        that.$message.error("There is something wrong!Please try again!");
      })
    },

    submit() {
      this.$message.warning("Searching!Please Waiting!");
      this.getTransportation();
    }
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.location = this.$route.params.location;
    this.title = this.$route.params.title;
    this.getTransportation();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #efe4ff;
}
</style>