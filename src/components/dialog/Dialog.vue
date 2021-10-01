<!--  -->
<template>
  <div class="body">
    <!-- 删除课程 -->
    <el-dialog
      title="空调"
      :visible.sync="deleteDV"
      width="30%"
      :show-close="false"
      top="40vh"
      :before-close="deleteHandleClose"
    >
      <h2>删除</h2>
      <span class="delete-text"
        >您确认删除该设备么？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="deleteDVCancle"
          >取 消</el-button
        >
        <el-button type="primary" @click="deleteDVconfirm">确认删除</el-button>
      </span>
    </el-dialog>
    <!-- 重命名课程 -->
    <el-dialog
      title=""
      :visible.sync="editDV"
      width="30%"
      :show-close="false"
      top="40vh"
       :before-close="editHandleClose"
    >
      <h2>修改设备名称</h2>
      <input class="course-input" type="text" />
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="editDVCancle">取 消</el-button>
        <el-button type="primary" @click="editDVconfirm">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    editDV: {
      type: Boolean,
      default: false,
    },
    deleteDV: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    };
  },
  computed: {},

  created() {

  },
  watch: { 

  },
  methods: {
    isCreate() {
      console.log("111");
      this.$emit("create");
      // this.editDV = false;
    },
    //点击遮罩
    editHandleClose() {
      this.$emit("editHandleClose");
    },
    //点击遮罩
    deleteHandleClose() {
      this.$emit("deleteHandleClose");
    },
    //删除框取消
    deleteDVCancle() {
      this.$emit("Cancle");
    },
    //编辑框取消
    editDVCancle() {
      this.$emit("Cancle");
    },
    //删除框确认
    deleteDVconfirm() {},
    //编辑框确认
    editDVconfirm() {},
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-dialog {
  // height: 3rem;
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
</style>