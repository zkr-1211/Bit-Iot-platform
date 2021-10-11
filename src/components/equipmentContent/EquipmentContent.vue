<!--  -->
<template>
  <div class="body">
    <el-skeleton :rows="4" animated v-if="isLoading" />
    <div>
      <div class="course-content">

        <div class="course-item" v-for="(item, index) in mqttList" :key="index">
          <router-link to="/equipmentoverview">
            <div class="checkbox">
              <el-tooltip class="item" effect="dark" :content="item.name" placement="top">

                <div class="name">
                  {{item.name}}
                </div>

              </el-tooltip>
              <div v-if="isCheckBox" class="el-checkbox">
                <CheckBox />
              </div>
            </div>
            <div class="create">设备介绍: {{item.description}}</div>
          </router-link>
          <div class="bottom-message">
            <div class="classnum"></div>

            <div class="dot-bottom">
              <div class="num">MQTT话题: {{item.topic}}</div>
              <div class="dot" v-if="isCheckBox"></div>
              <el-dropdown trigger="click" placement="bottom-end" v-else>
                <span class="el-dropdown-link">
                  <Dot />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="editDV = true">
                    <el-dropdown-item>重命名</el-dropdown-item>
                  </div>
                  <div @click="deleteMqtt(item.name,item.topic)">
                    <el-dropdown-item>删除</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

          </div>

        </div>
      </div>
    </div>
    <Dialog :editDV="editDV" :deleteDV="deleteDV" @Cancle="(editDV = false), (deleteDV = false)" @editHandleClose="editDV = false" @deleteHandleClose="deleteDV = false" />
  </div>
</template>

<script>
import Dot from "@/components/dot/Dot";
import Dialog from "@/components/dialog/Dialog.vue";
import CheckBox from "@/components/checkBox/CheckBox.vue";
import { deleteMqtt } from "@/api/home/home";

export default {
  components: {
    Dot,
    Dialog,
    CheckBox,
  },
  props: {
    isCheckBox: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    mqttList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      editDV: false,
      deleteDV: false,
      checked: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },

  mounted() {},

  methods: {
    async deleteMqtt(name, topic) {
      let data = {
        id: this.userInfo,
        name,
        topic,
      };
      this.$confirm("此操作将删除该订阅, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await deleteMqtt(data);
            this.$parent.getMqttList();
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
        .catch(() => {});
    },
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
  line-height: 0.4rem;
  color: #2a77ff;
  margin-left: 0.43rem;
}
h2 {
  position: absolute;
  top: 0.25rem;
  color: #000000;
  font-size: 0.2rem;
}
.course-input {
  font-size: 0.2rem;
  color: #666666;
  padding: 0.1rem 0rem 0.1rem 0rem;
  width: 100%;
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
// .course-content::after {
//     content: "";
//     flex: 0 0 2.91rem;
// }
.course-content {
  margin-top: -0.15rem;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  .course-item {
    width: 2.91rem;
    height: 1.8rem;
    margin-top: 0.3rem;
    margin-right: 0.26rem;
    background: #ffffff;
    box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.03);
    border-radius: 0.08rem;
    position: relative;
    .img {
      width: 2.91rem;
      height: 1.68rem;
      img {
        width: 2.91rem;
        height: 1.68rem;
        background: rgba(0, 0, 0, 0);
        border-radius: 0.08rem;
      }
    }
    .checkbox {
      position: relative;
      .el-checkbox {
        position: absolute;
        right: 0.2rem;
        top: 0.05rem;
        font-size: 0.2rem;
      }
    }
    .name {
      width: 92%;
      font-size: 0.2rem;
      font-weight: bold;
      line-height: 0.34rem;
      color: #333333;
      padding-left: 0.17rem;
      margin: 0.2rem 0.15rem 0.05rem 0rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .create {
      font-size: 0.15rem;
      line-height: 0.27rem;
      min-height: 0.75rem;
      color: #666666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin: 0rem 0.15rem 0.1rem 0.2rem;
    }
    .bottom-message {
      font-size: 0.12rem;
      line-height: 0.18rem;
      color: #999999;
      justify-content: space-between;
      align-items: center;
      margin: 0.05rem 0.15rem 0.15rem 0.2rem;
      //条子
      .classnum {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.3rem;
        height: 0.07rem;
        background: #999999;
        opacity: 1;
      }
      .dot-bottom {
        // margin-top: 0.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .dot {
          width: 0.27rem;
          height: 0.27rem;
          .dynamic_right2 {
            width: 0.27rem;
            height: 0.27rem;
            // background-color: red;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            flex-direction: column;
            .dynamic_right2_dot {
              margin-bottom: 0.02rem;
              margin-right: 0.1rem;
              width: 3.05rem;
              height: 3.05rem;
              background: #999999;
              border-radius: 50%;
            }
          }
        }
        .num {
          font-size: 0.12rem;
          color: #999999;
          margin-right: 0.35rem;
        }
      }
    }
  }
}
</style>