<!--  -->
<template>
  <div class="body">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的设备</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="32" class="el-row">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="top-bar">
          <HeaderTitle name="所有设备" />
          <div class="button" @click="createMqttShow = true">
            <el-button class="create-button" type="primary"><i class="el-icon-plus"></i>创建</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <Navigation :tabList="tabList" @tabsIndex="tabsIndex" :filtrate="true" />
      </el-col>
    </el-row>
    <EquipmentContent :mqttList="mqttList" v-if="tabIndex == 0" />
    <!-- </div> -->

    <!-- 创建订阅 -->
    <el-dialog title="" :visible.sync="createMqttShow" width="30%" :show-close="false" top="30vh">
      <h2>创建订阅</h2>
      <div class="create-name"><span>设备名:</span><input class="course-input" type="text" v-model="name" /></div>
      <div class="create-name"><span>MQTT话题:</span><input class="course-input" type="text" v-model="topic" /></div>
      <div class="create-name"><span>设备介绍:</span><input class="course-input" type="text" v-model="des" /></div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="createMqttShow = false">取 消</el-button>
        <el-button type="primary" @click="createMqtt">创 建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tabs from "@/components/tabs/Tabs.vue";
import HeaderTitle from "@/components/headerTitle/HeaderTitle.vue";
import Navigation from "@/components/navigation/Navigation.vue";
import EquipmentContent from "@/components/equipmentContent/EquipmentContent.vue";
import { getMqttList,createMqtt } from "@/api/home/home";
export default {
  components: {
    Tabs,
    HeaderTitle,
    Navigation,
    EquipmentContent,
  },

  data() {
    return {
      tabIndex: 0,
      createMqttShow: false,
      name: "",
      topic: "",
      des: "",
      id: null,
      mqttList: [],
      tabList: [
        {
          title: "全部",
        },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  mounted() {
    this.getMqttList();
  },

  methods: {
    async getMqttList() {
      let id = this.$store.getters.getUserInfo;
      try {
        const res = await getMqttList(id);
        if (res.code == 200) {
          this.mqttList = res.data[0].subscribe.reverse();
        }
      } catch (error) {}
    },
       async createMqtt() {
      let data = {
        id: this.userInfo,
        name: this.name,
        topic: this.topic,
        discription: this.des,
      };
      if (this.name.length <= 0) {
        this.$message.error("设备名不能为空");
      } else {
        try {
          await createMqtt(data);
          this.name = "";
          this.topic = "";
          this.des = "";
          this.createMqttShow = false;
          this.getMqttList();
          this.$message({
            message: "创建成功",
            type: "success",
          });
        } catch (error) {
          this.$message.error("创建失败");
          this.name = "";
          this.topic = "";
          this.des = "";
          this.createMqttShow = false;
        }
      }
    },
    tabsIndex() {},
  },
};
</script>

<style lang='scss' scoped>
::v-deep .el-dialog {
  // height: 3rem;
  line-height: 0rem;
}
::v-deep .el-dialog__title {
  font-size: 0.2rem;
  font-weight: bold;
  line-height: 0rem;
  color: #2a77ff;
  margin-left: 0.43rem;
}
h2 {
  position: absolute;
  top: 0.48rem;
  color: #000000;
  font-size: 0.2rem;
}
.create-name {
  text-align: left;
  display: flex;
  align-items: center;
  span {
    display: block;
    width: 0.8rem;
    padding-top: 0.5rem;
  }
}
.course-input {
  margin: 0.3rem 0rem 0rem 0.3rem;
  font-size: 0.2rem;
  color: #666666;
  padding: 0.1rem 0rem 0.1rem 0rem;
  width: 80%;
  border-bottom: 0.01rem solid #e0e0e0 !important;
  border: none;
}
.cancel-button {
  border: none;
  background: #fff !important;
  box-shadow: 0 !important;
  font-size: 0.14rem;
  font-weight: bold;
  color: #666666;
  margin-right: 0.15rem;
}
.el-button {
  margin-top: 0.4rem;
  background: #2a77ff;
  // box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.2);
  &:hover {
    background: #5592fe;
  }
  &:active {
    background: #2065e0;
  }
}
.delete-text {
  font-size: 0.14rem;
  line-height: 0.02rem;
  color: #666666;
}
.top-bar {
  margin-top: 0.12rem;
  // width: 15.84rem;
  height: 0.8rem;
  background: #ffffff;
  box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  position: relative;
  .title {
    // background-color: #2a77ff;
    width: 100%;
    // height: 2rem;
    margin: 0.2rem;
    font-size: 0.2rem;
    font-weight: bold;
    line-height: 0.34rem;
    color: #666666;
    border-left: 0.08rem solid #5592fe;
    .name {
      margin-left: 0.12rem;
    }
  }
  .button {
    margin-right: 0.3rem;
    font-size: 0.14rem;
    font-weight: bold;
    color: #f4f4f4;
    width: 1.2rem;
    position: absolute;
    right: 0;
    .el-icon-plus {
      margin-right: 0.07rem;
      font-size: 0.14rem;
    }
    .create-button {
      margin-bottom: 0.4rem;
      background: #2a77ff;
      box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.2);
      &:hover {
        background: #5592fe;
      }
      &:active {
        background: #2065e0;
      }
    }
  }
}
</style>