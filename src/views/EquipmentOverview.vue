<!--  -->
<template>
  <div class='body'>
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
              <input type="text" name="" id="" placeholder="请填写任务名称">
            </div>
            <div class="name">
              <span>描述简介:</span>
              <input type="text" name="" id="" placeholder="请填写任务描述">
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
              <Button name="创建" slot="A">
                <img src="@/assets/image/home/icon_add_n.svg" alt="">
              </Button>
            </TopBar>
            <!--内容表格-->

            <el-table :header-cell-style="{background:'#EDEFF3', color:'#000000'}" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" :cell-style="{textAlign: 'center'}">
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
        <Button name="创建" slot="A">
          <img src="@/assets/image/home/icon_add_n.svg" alt="">
        </Button>
      </TopBar>
      <el-table :header-cell-style="{background:'#EDEFF3', color:'#000000'}" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" :cell-style="{textAlign: 'center'}">
        </el-table-column>
        <el-table-column prop="date" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="180">
        </el-table-column>
        <el-table-column prop="province" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="city" label="定时模式" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="800">
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
  </div>
</template>

<script>
import TopBar from "@/components/topBar/TopBar.vue";
import Button from "@/components/button/Button.vue";
export default {
  components: {
    TopBar,
    Button,
  },
  data() {
    return {
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

  mounted() {},

  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange() {},
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
          width: 4rem;
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
    .pagination {
      height: 0.5rem;
      display: flex;
      padding-top: 0.7rem;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>