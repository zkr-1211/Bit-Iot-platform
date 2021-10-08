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
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
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
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="top-right">
            <TopBar name="我的订阅">
              <Button name="创建" slot="A" @click.native="createMqtt = true">
                <img src="@/assets/image/home/ic_button_add.svg" alt="" />
              </Button>
            </TopBar>
            <!--内容表格-->

            <el-table :header-cell-style="{ background: '#EDEFF3', color: '#000000' }" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" :cell-style="{ textAlign: 'center' }">
              </el-table-column>
              <el-table-column prop="date" label="序号" width="150">
              </el-table-column>
              <el-table-column prop="name" label="调用名称" width="180">
              </el-table-column>
              <el-table-column prop="province" label="调用次数" width="120">
              </el-table-column>
              <el-table-column prop="city" label="创建时间" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="操作" min-width="200">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
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
      <el-table :header-cell-style="{ background: '#EDEFF3', color: '#000000' }" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" :cell-style="{ textAlign: 'center' }">
        </el-table-column>
        <el-table-column prop="date" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="180">
        </el-table-column>
        <el-table-column prop="province" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="city" label="定时模式" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
    <!-- 创建订阅 -->
    <el-dialog title="" :visible.sync="createMqtt" width="30%" :show-close="false" top="40vh">
      <h2>创建订阅</h2>
      <input class="course-input" type="text" />
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="createMqtt = false">取 消</el-button>
        <el-button type="primary" @click="createMqtt = false">创 建</el-button>
      </span>
    </el-dialog>
    <!-- 创建任务计划 -->
    <el-dialog title="" :visible.sync="createTask" width="30%" :show-close="false" top="20vh">
      <h2>创建计划任务</h2>
      <div class="contentDv">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="region1">
            <el-select v-model="ruleForm.region1" placeholder="请选择执行时机">
              <el-option label="定期执行" value="定期执行"></el-option>
              <el-option label="定期执行1" value="定期执行1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重复模式" prop="region2">
            <el-select v-model="ruleForm.region2" placeholder="请选择周期间隔">
              <el-option label="每天" value="每天"></el-option>
              <el-option label="每星期" value="每星期"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="起止时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="间隔" prop="region3">
            <el-select v-model="ruleForm.region3" placeholder="请选择周期间隔">
              <el-option label="5分钟" value="5分钟"></el-option>
              <el-option label="10分钟" value="10分钟"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择事件" prop="region4">
            <el-select v-model="ruleForm.region4" placeholder="请选择事件">
              <el-option label="进入玄关" value="进入玄关"></el-option>
              <el-option label="进入玄关1" value="进入玄关1"></el-option>
            </el-select>
          </el-form-item>
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
import { getMqttList } from "@/api/home/home";
export default {
  components: {
    TopBar,
    Button,
  },
  data() {
    return {
      createTask: false,
      createMqtt: false,
      editDV: false,
      deleteDV: false,
      ruleForm: {
        name: "",
        region1: "",
        region2: "",
        region3: "",
        date1: "",
        date2: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region1: [
          { required: true, message: "请选择执行时机", trigger: "change" },
        ],
        region2: [
          { required: true, message: "请选择周期间隔", trigger: "change" },
        ],
        region3: [
          { required: true, message: "请选择时间间隔", trigger: "change" },
        ],
        region4: [{ required: true, message: "请选择事件", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      tableData: [
        {
          date: "0001",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "0002",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "0003",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "0004",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
  computed: {},

  mounted() {
    this.getMqttList();
  },

  methods: {
    async getMqttList() {
      const id = this.$store.getters.getUserInfo;
      let query = {
        id,
      };
      try {
        const res = await getMqttList(query);
        console.log("res======", res);
      } catch (error) {}
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange() {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
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
.course-input {
  margin-top: 0.3rem;
  font-size: 0.2rem;
  color: #666666;
  padding: 0.1rem 0rem 0.1rem 0rem;
  width: 100%;
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