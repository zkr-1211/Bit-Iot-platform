<!--  -->
<template>
  <div class="body">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的设备</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">设备概览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="32" class="el-row">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <TopBar name="设备概览" />
      </el-col>
    </el-row>

    <div class="top">
      <el-row :gutter="32" class="el-row">
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
          <div class="top-left">
            <div class="nav">
              <div class="status"></div>
              <div class="text">设备状态:在线</div>
            </div>
            <div class="name">
              <span>设备名称:</span>
              <input type="text" placeholder="请填写任务名称" />
            </div>
            <div class="name">
              <span>描述简介:</span>
              <input type="text" placeholder="请填写任务描述" />
            </div>
            <div class="button">
              <Button name="保存" class="b1" />
              <Button name="删除" />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
          <div class="top-right">
            <TopBar name="我的订阅">
              <Button name="创建" slot="A" @click.native="createMqttShow = true">
                <img src="@/assets/image/home/ic_button_add.svg" alt="" />
              </Button>
            </TopBar>
            <!--内容表格-->
            <div class="table">
              <el-table :header-cell-style="{ background: '#EDEFF3', color: '#000000' }" :data="mqttList" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" :cell-style="{ textAlign: 'center' }">
                </el-table-column>
                <el-table-column prop="name" label="设备名" width="120">
                </el-table-column>
                <el-table-column prop="topic" label="MQTT话题" width="120">
                </el-table-column>
                <el-table-column prop="description" label="设备介绍" width="200">
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="120">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="sendMessage(scope.row)">发消息</el-button>
                    <!-- <el-button type="text" size="small">查看</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :total="100">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="bottom">
      <TopBar name="计划任务">
        <Button name="创建" slot="A" @click.native="createTask = true">
          <img src="@/assets/image/home/ic_button_add.svg" alt="" />
        </Button>
      </TopBar>
      <div class="table">
        <el-table :header-cell-style="{ background: '#EDEFF3', color: '#000000' }" :data="periodList" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" :cell-style="{ textAlign: 'center' }">
          </el-table-column>
          <el-table-column prop="name" label="任务名" width="80">
          </el-table-column>
          <el-table-column prop="to_device" label="设备名" width="80">
          </el-table-column>
          <el-table-column prop="payload" label="消息" width="80">
          </el-table-column>
          <el-table-column prop="Pattern" label="定时时间单位" width="120">
          </el-table-column>
          <el-table-column prop="topic" label="MQTT话题" width="120">
          </el-table-column>
          <el-table-column prop="Count" label="定时时间间隔" width="120">
          </el-table-column>
          <el-table-column prop="At" label="执行的时间" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleClickTask(scope.row)" type="text" size="small">删除</el-button>
              <!-- <el-button type="text" size="small" @click="sendMessage(scope.row)">发消息</el-button> -->
              <!-- <el-button type="text" size="small">查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
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
    <!-- 创建任务计划 -->
    <el-dialog title="" :visible.sync="createTask" width="30%" :show-close="false" top="20vh">
      <h2>创建计划任务</h2>
      <div class="contentDv">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="任务名" prop="taskName">
            <el-input v-model="ruleForm.taskName"></el-input>
          </el-form-item>
          <el-form-item label="设备名" prop="device">
            <el-input v-model="ruleForm.device"></el-input>
          </el-form-item>
          <el-form-item label="MQTT话题" prop="topic">
            <el-input v-model="ruleForm.topic"></el-input>
          </el-form-item>
          <el-form-item label="发送消息" prop="msg">
            <el-input v-model="ruleForm.msg"></el-input>
          </el-form-item>
          <!-- <el-form-item label="任务类型" prop="region1">
            <el-select v-model="ruleForm.region1" placeholder="请选择执行时机">
              <el-option label="定期执行" value="定期执行"></el-option>
              <el-option label="定期执行1" value="定期执行1"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="定时时间单位" prop="peroid">
            <el-select v-model="ruleForm.peroid" placeholder="请选择周期间隔">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="执行的时间" prop="at" v-if="ruleForm.peroid=='day'||ruleForm.peroid=='week'||ruleForm.peroid=='month'">
            <el-col :span="11">
              <el-form-item prop="at">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.at" style="width: 100%" value-format="HH|mm|ss"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="定时时间间隔" prop="every">
            <el-input v-model.number="ruleForm.every"></el-input>
          </el-form-item>
          <!-- <el-form-item label="间隔" prop="region3">
            <el-select v-model="ruleForm.region3" placeholder="请选择周期间隔">
              <el-option label="5分钟" value="5分钟"></el-option>
              <el-option label="10分钟" value="10分钟"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="选择事件" prop="region4">
            <el-select v-model="ruleForm.region4" placeholder="请选择事件">
              <el-option label="进入玄关" value="进入玄关"></el-option>
              <el-option label="进入玄关1" value="进入玄关1"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div class="dialog-footer">
          <el-button class="cancel-button" @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">添 加</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopBar from "@/components/topBar/TopBar.vue";
import Button from "@/components/button/Button.vue";
import {
  getMqttList,
  createMqtt,
  deleteMqtt,
  deleteTask,
  sendMsg,
  createTask,
  getPeriodList,
} from "@/api/home/home";
export default {
  components: {
    TopBar,
    Button,
  },
  data() {
    return {
      createTask: false,
      createMqttShow: false,
      editDV: false,
      deleteDV: false,
      mqttList: [],
      periodList: [],
      name: "",
      topic: "",
      des: "",
      ruleForm: {
        taskName: "",
        peroid: "",
        every: null,
        at: "",
        device: "",
        topic: "",
        msg: "",
      },
      rules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        device: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        msg: [{ required: true, message: "请输入消息", trigger: "blur" }],
        topic: [{ required: true, message: "请输入话题名称", trigger: "blur" }],
        peroid: [
          { required: true, message: "请选择执行时机", trigger: "change" },
        ],
        every: [
          { required: true, message: "请选输入时间间隔", trigger: "blur" },
        ],
      },
      options: [
        {
          value: "day",
          label: "每天",
        },
        {
          value: "week",
          label: "每周",
        },
        {
          value: "month",
          label: "每月",
        },
        {
          value: "second",
          label: "每秒",
        },
        {
          value: "minute",
          label: "每分",
        },
        {
          value: "hour",
          label: "每时",
        },
      ],
      value: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  mounted() {
    this.getMqttList();
    this.getPeriodList();
  },

  methods: {
    async getMqttList() {
      try {
        const res = await getMqttList(this.userInfo);
        if (res.code == 200) {
          this.mqttList = res.data[0].subscribe.reverse();
        }
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    async getPeriodList() {
      try {
        const res = await getPeriodList(this.userInfo);
        if (res.code == 200) {
          this.periodList = res.data;
        }
      } catch (error) {
        this.$message.error(error.message);
      }
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
    handleClick(row) {
      let data = {
        id: this.userInfo,
        name: row.name,
        topic: row.topic,
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await deleteMqtt(data);
            this.getMqttList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (error) {
            this.$message({
              type: "error",
              message: error.message,
            });
          }
        })
        .catch(() => {
        });
    },
    handleClickTask(row) {
      let data = {
        id: this.userInfo,
        taskName: row.name,
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await deleteTask(data);
            this.getPeriodList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (error) {
            this.$message({
              type: "error",
              message: error.message,
            });
          }
        })
        .catch(() => {
        });
    },
    sendMessage(row) {
      let data = {
        id: this.userInfo,
        name: row.name,
        topic: row.topic,
      };
      this.$prompt("请输入消息内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern:
        //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确",
      })
        .then(async ({ value }) => {
          try {
            await sendMsg(data);
            this.$message({
              type: "success",
              message: "你发送的消息是: " + value,
            });
          } catch (error) {
            this.$message({
              type: "error",
              message: error.message,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消发送",
          });
        });
    },
    handleSelectionChange() {},
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (
            this.ruleForm.peroid == "hour" ||
            this.ruleForm.peroid == "minute" ||
            this.ruleForm.peroid == "second"
          ) {
            this.ruleForm.at = "";
          }
          let data = {
            id: this.userInfo,
            ...this.ruleForm,
          };
          try {
            await createTask(data);
            this.getPeriodList();
            this.createTask = false;
            this.$refs[formName].resetFields();
            this.$message({
              type: "success",
              message: "创建成功!",
            });
          } catch (error) {
            this.$message({
              type: "error",
              message: error.message,
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.createTask = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-checkbox__inner {
  margin-left: 0.07rem;
}
.body {
  .top {
    margin-top: 0.2rem;

    .top-left {
      height: 4.12rem;
      background: #ffffff;

      .nav {
        height: 0.8rem;
        margin-top: 0.12rem;
        display: flex;
        align-items: center;
        .status {
          margin-left: 0.2rem;
          width: 0.1rem;
          height: 0.1rem;
          background: #33d182;
          border-radius: 0.05rem;
        }
        .text {
          margin-left: 0.1rem;
          font-size: 0.16rem;
          font-weight: bold;
          //   color: #e45454;
        }
      }
      .name {
        margin-top: 0.3rem;
        margin-left: 0.4rem;
        font-size: 0.16rem;
        color: #666666;
        input {
          margin-left: 0.3rem;
          padding-left: 0.2rem;
          width: 60%;
          height: 0.44rem;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          opacity: 1;
          border-radius: 4px;
        }
      }
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.5rem;
        .b1 {
          margin-right: 0.3rem;
        }
      }
    }
    .top-right {
      height: 4.12rem;
      background: #ffffff;
      .table {
        overflow: auto;
        height: 2.8rem;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
      .pagination {
        height: 0.5rem;
        // line-height: 2.8rem;
        // background-color: #fff;
        display: flex;
        padding-top: 0.7rem;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .bottom {
    height: 4.12rem;
    background: #ffffff;
    margin-top: 0.32rem;
    .table {
      overflow: auto;
      height: 2.8rem;
    }
    img {
      width: 0.15rem;
      height: 0.15rem;
    }
    .pagination {
      height: 0.5rem;
      display: flex;
      padding-top: 0.7rem;
      align-items: center;
      justify-content: center;
    }
  }
  .contentDv {
    margin: 0.2rem auto;
  }
}
::v-deep .el-dialog {
  line-height: 0rem;
}
::v-deep .el-dialog__title {
  font-size: 0.2rem;
  font-weight: bold;
  line-height: 0.4rem;
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
::v-deep .el-dialog__header {
  padding: 0px;
}
::v-deep .el-input__inner {
  border: none;
  border-bottom: 1px solid #dcdfe6;
}
.dialog-footer {
  text-align: right;
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
}
</style>