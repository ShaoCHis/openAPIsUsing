<template>
  <div style="height: 100%">
    <el-container>
      <el-aside width="160px">
        <el-menu class="menu" default-active="1">
          <el-menu-item class="menuItem" index="1" @click="goHome">
            <div class="item">
              <span class="span">Home</span>
              <i class="el-icon-star-on"></i>
            </div>
          </el-menu-item>
          <el-menu-item class="menuItem" index="2" @click="goSocial">
            <div class="item">
              <span class="span">Social</span>
              <i class="el-icon-video-camera-solid"></i>
            </div>
          </el-menu-item>
          <el-menu-item class="menuItem" index="4" @click="goNews">
            <div class="item">
              <span class="span">News</span>
              <i class="el-icon-s-cooperation"></i>
            </div>
          </el-menu-item>
          <el-menu-item class="menuItem" index="6" @click="goTransportation">
            <div class="item">
              <span class="span">Transportation</span>
              <i class="el-icon-position"></i>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "DataPage",

  data() {
    return {
      adcode: "",
      location:"",
      title:""
    };
  },

  methods: {
    goHome() {
      this.$router.push({
        name: 'dataHome',
        params: {
          adcode: this.adcode,
          location:this.location,
          title:this.title
        }
      })
    },
    goSocial() {
      this.$router.push({
        name: 'social',
        params: {
          adcode: this.adcode,
          location:this.location,
          title:this.title
        }
      })
    },
    goTransportation() {
      this.$router.push({
        name: 'transportation',
        params: {
          adcode: this.adcode,
          location:this.location,
          title:this.title
        }
      })
    },
    goNews() {
      this.$router.push({
        name: 'news',
        params: {
          adcode: this.adcode,
          location:this.location,
          title:this.title
        }
      })
    },
  },

  created() {
    this.adcode = this.$route.params.adcode;
    this.location=this.$route.params.location;
    this.title=this.$route.params.title;
    this.$router.push({
      name: "dataHome",
      params: {
        adcode: this.adcode,
        location:this.location,
        title:this.title
      }
    })
  }

}
</script>

<style scoped>
.el-container {
  height: 100%;
  border: 0;
  top: 0;
  margin: 0;
}

.el-aside {
  height: 100%;
  background-color: #4b5781
}

.el-main {
  /*line-height: 100vh;*/
  height: 100%;
  padding: 0;
}

.menu {
  background-color: #4B5781;
  border: 0;
  margin: 0;
  padding: 0;
}

.menuItem {
  height: 60px;
}

.span {
  color: white;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
}

.item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>