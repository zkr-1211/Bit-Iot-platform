<template>
  <div class="home" id="full-Screen">
    <el-container>
      <el-header>
        <div class="nav_drawer drawer-show" @click="drawer = true">
          <img src="@/assets/image/home/ic_nav_drawer.svg" alt="" />
        </div>
        <div class="shuke-logo">
          <img src="@/assets/image/home/logo.svg" alt="" />
        </div>
        <div class="right-person">
          <div class="trigon"></div>
          <div class="right">
            <el-dropdown trigger="click" placement="bottom-end">
              <span class="el-dropdown-link">
                <!-- 头像 -->
                <div class="header">
                  <img src="@/assets/image/home/header.svg" alt="">
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>账户信息</el-dropdown-item>
                <el-dropdown-item @click.native="Logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="name">{{ userInfo }}</div>
            <!-- <div class="message">
              <el-dropdown trigger="click" placement="bottom-end">
                <span class="el-dropdown-link">
                  <el-badge :value="12" class="item">
                    <img
                      src="@/assets/image/home/topbar_notice.svg"
                      alt=""
                      @click="isNoticF()"
                    />
                  </el-badge>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div class="notices">
                    <div class="time-img">
                      <a href="/allNotice">
                        <div class="img1"></div>
                      </a>
                    </div>
                    <el-tabs
                      value="first"
                      @tab-click="handleClick"
                      v-if="isNotic"
                    >
                      <el-tab-pane label="用户管理" name="first">
                        <div class="notice-message">
                          <div
                            class="notice"
                            v-for="(item, index) in 10"
                            :key="index"
                          >
                            <div class="left-item">
                              <div class="img">
                                <img
                                  src="@/assets/image/home/topbar_notice_label.svg"
                                  alt=""
                                />
                              </div>
                              <div class="info">
                                陈小平 提醒您修改 课程:UI设计 标设计陈小平
                                陈小平 提醒您修改 课程:UI设计 标设计陈小平
                                陈小平 提醒您修改 课程:UI设计 标设计陈小平
                              </div>
                            </div>

                            <div class="time">01月21日</div>
                          </div>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="配置管理" name="second">
                        <div class="notice-message">
                          <div
                            class="notice"
                            v-for="(item, index) in 0"
                            :key="index"
                          >
                            <div class="left-item">
                              <div class="img">
                                <img
                                  src="@/assets/image/home/topbar_notice_label.svg"
                                  alt=""
                                />
                              </div>
                              <div class="info">
                                陈小平 提醒您修改 课程:UI设计 标设计 111
                                提醒您修改 课程:UI设计 标设计
                              </div>
                            </div>

                            <div class="time">01月21日</div>
                          </div>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
            <div class="full-screen" @click="fullScreenEvent">
              <div class="image">
                <img src="@/assets/image/home/icon_fullscreen_b.svg" alt="" />
              </div>
              <div class="text">
                <span v-if="!isFullScren">全屏模式</span>
                <span v-else>退出全屏</span>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="hidden-md-and-down">
          <el-row class="tac">
            <el-col>
              <el-menu router text-color="#666666" :default-active="activePath" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
                <el-menu-item @click="saveNavState('/allequipment')" index="/allequipment" :class="
                    selectIndex == '/allequipment' ? 'selectStyle' : ''
                  ">
                  <img v-if="selectIndex == '/allequipment'" src="@/assets/image/leftbar/leftbar_home_s.svg" alt="" />
                  <img v-else src="@/assets/image/leftbar/leftbar_home_n.svg" alt="" />
                  <span>所有设备</span>
                </el-menu-item>

                <!-- <el-menu-item
                  @click="saveNavState('/equipmentoverview')"
                  index="/equipmentoverview"
                  :class="selectIndex == '/equipmentoverview' ? 'selectStyle' : ''"
                >
                  <img
                    v-if="selectIndex == '/equipmentoverview'"
                    src="@/assets/image/leftbar/leftbar_course_s.svg"
                    alt=""
                  />
                  <img
                    v-else
                    src="@/assets/image/leftbar/leftbar_course_n.svg"
                    alt=""
                  />
                  <span>所有设备</span>
                </el-menu-item> -->
                <!-- <el-menu-item @click="saveNavState('/home')" index="/" :class="selectIndex == '/home' ? 'selectStyle' : ''">
                  <img v-if="selectIndex == '/home'" src="@/assets/image/leftbar/leftbar_recordvideo_s.svg" alt="" />
                  <img v-else src="@/assets/image/leftbar/leftbar_recordvideo_n.svg" alt="" />
                  <span>事件管理</span>
                </el-menu-item> -->
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    style="marginleft: 0.2rem"
    <el-drawer :modal="true" :show-close="false" size="28%" title="" :visible.sync="drawer" :direction="direction">
      <el-menu router text-color="#666666" :default-active="activePath" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
        <el-menu-item @click="saveNavState('/allequipment')" index="/allequipment" :class="
                    selectIndex == '/allequipment' ? 'selectStyle' : ''
                  ">
          <img v-if="selectIndex == '/allequipment'" src="@/assets/image/leftbar/leftbar_home_s.svg" alt="" />
          <img v-else src="@/assets/image/leftbar/leftbar_home_n.svg" alt="" />
          <span style="margin-left: 0.2rem">所有设备</span>
        </el-menu-item>

        <!-- <el-menu-item
                  @click="saveNavState('/allequipment')"
                  index="/allequipment"
                  :class="selectIndex == '/allequipment' ? 'selectStyle' : ''"
                >
                  <img
                    v-if="selectIndex == '/allequipment'"
                    src="@/assets/image/leftbar/leftbar_course_s.svg"
                    alt=""
                  />
                  <img
                    v-else
                    src="@/assets/image/leftbar/leftbar_course_n.svg"
                    alt=""
                  />
                  <span style="margin-left: 0.2rem">所有设备</span>
                </el-menu-item> -->
        <!-- <el-menu-item @click="saveNavState('/home')" index="/" :class="selectIndex == '/home' ? 'selectStyle' : ''">
                  <img v-if="selectIndex == '/home'" src="@/assets/image/leftbar/leftbar_recordvideo_s.svg" alt="" />
                  <img v-else src="@/assets/image/leftbar/leftbar_recordvideo_n.svg" alt="" />
                  <span>事件管理</span>
                </el-menu-item> -->
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import { Logout } from "@/api/auth/auth";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      drawer: false,
      direction: "ltr",
      selectIndex: 1,
      activePath: "",
      activeName: "first",
      isNotic: false,
      isFullScren: false,
    };
  },
  created() {
    // this.activePath = window.sessionStorage.getItem("activePath");
    // this.selectIndex = this.activePath || "/allequipment";
    this.selectIndex = this.$route.path;
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  mounted() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    let that = this;
    document.addEventListener("fullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("mozfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("webkitfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
    document.addEventListener("msfullscreenchange", () => {
      that.isFullScren = !that.isFullScren;
    });
  },
  methods: {
    // 全屏事件
    fullScreenEvent() {
      //全屏
      // let el = document.documentElement;
      //局部全屏
      let el = document.getElementById("full-Screen");
      if (this.isFullScren) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
          el.webkitRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    Logout() {
      // try {
      //   const token = this.$store.getters.getToken;
      //   const id = this.$store.getters.getUserInfo;
      //   let data = {
      //     id,
      //     token,
      //   };
      // const res = await Logout(data);
      // console.log("res", res);
      // if (res.code == -1 && res.reason == "Failed to authorize") {
      this.$message({
        message: "退出登入",
        type: "success",
      });
      this.$store.commit("clearToken");
      this.$router.replace("/login");
      // } catch (error) {
      // this.$message.error(error.message);
      // }
    },
    handleSelect(index) {
      // console.log("index", index);
      this.selectIndex = index;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //下拉菜单嵌套Tabs第一次下划线不显示的解决办法
    isNoticF() {
      setTimeout(() => {
        this.isNotic = true;
      }, 10);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  background-color: #f7f6fa;
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-menu {
  border: none;
}
.selectStyle {
  background: linear-gradient(90deg, #2a77ff 0%, #5592fe 100%);
  box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.16);
  opacity: 1;
  border-radius: 0.04rem;
  color: #fff !important;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  // line-height: 0.6rem;
  width: 100%;
  height: 0.64rem !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem;
  position: relative;
  .nav_drawer {
    position: absolute;
    left: 0.2rem;
    bottom: -12px;
    margin-left: 0.15rem;
    display: none;
    cursor: pointer;
  }
  // .drawer-show{
  //   display: block;
  // }

  @media only screen and (max-width: 1200px) {
    .drawer-show {
      display: block;
    }
    .shuke-logo {
      margin-left: 0.9rem !important;
    }
  }
  @media only screen and (max-width: 550px) {
    .shuke-logo {
      font-size: 0.12rem !important;
      padding-right: 0.5rem;
    }
  }

  .shuke-logo {
    margin-left: 0.4rem;
    display: flex;
    align-items: center;
    img {
      width: 1.76rem;
      height: 0.36rem;
    }
  }
  .right-person {
    width: 3.8rem;
    height: 0.64rem;
    background-color: #2a77ff;
    display: flex;
    justify-content: center;
    position: relative;
    .trigon {
      left: -0.34rem;
      position: absolute;
      width: 0;
      height: 0;
      border-color: #2a77ff transparent;
      border-width: 0 0 0.64rem 0.34rem;
      border-style: solid;
    }
    .right {
      width: 3.6rem;
      // margin-left: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .header {
        width: 0.36rem;
        height: 0.36rem;
        box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        display: flex;
        align-items: center;
        overflow: hidden;
        img {
          width: 0.36rem;
          height: 0.36rem;
        }
      }
      .message {
        position: relative;
        width: 0.6rem;
        height: 0.64rem;
        display: flex;
        align-items: center;
        img {
          width: 0.36rem;
          height: 0.36rem;
        }
      }
      .full-screen {
        cursor: pointer;
        margin-left: 0.1rem;
        display: flex;
        align-items: center;
        .image {
          display: flex;
          width: 0.34rem;
          height: 0.34rem;
        }
        .text {
          font-size: 0.16rem;
          color: #ffffff;
          margin-left: 0.12rem;
        }
      }
    }
    .name {
      font-size: 0.2rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      margin-left: 0.2rem;
    }
  }
}
.el-aside {
  position: relative;
  background-color: #fff;
  color: #333;
  width: 2.56rem !important;
  height: 9.8rem;
  overflow: hidden;
  // margin-right: 2.56rem !important;
  .tac {
    // width: 2.57rem;
    margin-top: 0.26rem;
    .el-menu {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      .el-menu-item {
        display: flex;
        align-items: center;
        margin-top: 0.12rem;
        font-size: 0.14rem;
        font-weight: bold;
        color: #ffffff;
        border-radius: 0.04rem;
        img {
          width: 0.24rem;
          height: 0.24rem;
        }
        span {
          margin-left: 0.2rem;
        }
      }
      .el-menu-item:hover {
        border-radius: 0.04rem;
        background-color: #f6f6f6;
      }
    }
  }
}

.el-main {
  height: 92vh;
  margin-left: 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 2.6rem;
}
.el-container:nth-child(7) .el-aside {
  line-height: 3.2rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 4rem;
}
::v-deep .el-badge__content {
  background-color: #f56c6c;
  border-radius: 0.1rem;
  color: #fff;
  display: inline-block;
  font-size: 0.12rem;
  height: 0.18rem;
  line-height: 0.2rem;
  padding: 0 0.08rem;
  text-align: center;
  white-space: nowrap;
  border: none;
}
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: 0.05rem;
  right: 0.13rem;
  transform: translateY(-50%) translateX(100%);
}
.el-dropdown-link {
  cursor: pointer;
  // color: #409eff;
}
.el-icon-arrow-down {
  font-size: 0.12rem;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 0.14rem;
  margin-bottom: 0.2rem;
}
.el-dropdown-menu {
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0.1rem 0;
  margin: 0.05rem 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 0.04rem;
  box-shadow: 0rem 0.03rem 0.04rem rgba(0, 0, 0, 0.16);
  .notices {
    width: 4.6rem;
    height: 5.36rem;
    position: relative;
    .time-img {
      &:hover .img1 {
        background-image: url(../assets/image/home/topbar_notice_history_h.svg) !important;
      }
      &:active .img1 {
        background-image: url(../assets/image/home/topbar_notice_history_p.svg) !important;
      }
      .img1 {
        position: absolute;
        z-index: 98;
        right: 0.4rem;
        top: 0.12rem;
        width: 0.2rem;
        height: 0.2rem;
        display: flex;
        align-items: center;
        background-image: url(../assets/image/home/topbar_notice_history_n.svg) !important ;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
}
.el-tabs {
  padding-left: 0.3rem;
}
::v-deep .el-tabs__nav {
  white-space: nowrap;
  position: relative;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  float: left;
  z-index: 2;
  display: flex;
}
::v-deep .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0;
}
::v-deep .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0rem;
  background-color: #e4e7ed;
  z-index: 1;
}
::v-deep .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.04rem;
  background-color: #5592fe;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 0.5rem;
  list-style: none;
}
::v-deep .el-tabs__item.is-active {
  font-size: 0.16rem;
  color: #5592fe;
}
::v-deep .el-tabs__item {
  padding: 0 0.2rem;
  height: 0.4rem;
  box-sizing: border-box;
  line-height: 0.4rem;
  display: inline-block;
  list-style: none;
  font-size: 0.16rem;
  color: #666666;
  position: relative;
}
.notice-message {
  height: 4.95rem;
  width: 100%;
  overflow: auto;
  padding-right: 30px;
  // padding-left: 30px;
  // padding-right: 0.3rem;
  .notice {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.7rem;
    padding: 10px 0px 10px 0px;
    &:hover {
      background-color: #e8e8e8;
    }
    &:active {
      background-color: #c2c2c2;
    }
    .left-item {
      display: flex;
      align-items: center;

      .img {
        display: flex;
        align-items: center;
        width: 0.15rem;
        height: 0.15rem;
        // background-color: #2a77ff;
        img {
          width: 0.15rem;
          height: 0.15rem;
        }
      }
      .info {
        width: 100%;
        font-size: 0.14rem;
        color: #333334;
        padding-left: 0.15rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
    .time {
      min-width: 22%;
      // padding-right: 0.3rem;
      font-size: 0.14rem;
      color: #c3c3c3;
      text-align: right;
    }
  }
}
</style>
