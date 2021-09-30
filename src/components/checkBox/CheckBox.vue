<!--  -->
<template>
  <div class="body">
    <el-checkbox v-model="isCheck1" :checked="isCheck" @change="handleCheckAllChange"></el-checkbox>
  </div>
</template>

<script>
export default {
  components: {},
   model: {
    prop: "isCheck",
    event: "IsCheck",
  },
  props: {
    isCheck: {
      type: Boolean,
      default: null,
    },
  },
 
  data() {
    return {
      isCheck1:false,
    };
  },
  computed: {},
  watch: {
    isCheck(newVal, oldVal) {
      this.isCheck1 = newVal;
    },
  },

  mounted() {
  },

  methods: {
    handleCheckAllChange(e) {
      this.$emit("IsCheck",e);
    },
  },
};
</script>
<style lang='scss' scoped>
//选择框.el-checkbox__inner
::v-deep .el-checkbox__inner {
  margin-left: 0.2rem;
  display: inline-block;
  position: relative;
  border: 0.02rem solid #999999;
  border-radius: 0.02rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 0.2rem;
  height: 0.2rem;
  background-color: #fff;
  z-index: 1;
  -webkit-transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
::v-deep .el-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: "";
  border-left: 0;
  border-top: 0;
  height: 0.07rem;
  left: 0.06rem;
  position: absolute;
  top: 0.025rem;
  -webkit-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 0.04rem;
  -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: -webkit-transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s;
  transition: transform 0.15s ease-in 0.05s,
    -webkit-transform 0.15s ease-in 0.05s;
  -webkit-transform-origin: center;
  transform-origin: center;
}
</style>