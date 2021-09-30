<!--  -->
<template>
  <div class='body'>
    <div class="top-bar">
      <HeaderTitle :name="name" />
      <div class="button">
        <slot name="A"></slot>
        <slot name="B"></slot>
        <slot name="C"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "@/components/headerTitle/HeaderTitle";
import Button from "@/components/button/Button";
export default {
  components: {
    HeaderTitle,
    Button,
  },
  props: {
    name: {
      type: String,
      default: "默认标题",
    },
  },
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.top-bar {
  margin-top: 0.12rem;
  height: 0.8rem;
  background: #ffffff;
  box-shadow: 0rem 0.03rem 0.06rem rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  // position: relative;
  justify-content: space-between;
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
    // width: 1.2rem;
    display: flex;
    .save {
      cursor: pointer;
      width: 90px;
      height: 40px;
      background: #ffffff;
      opacity: 1;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      line-height: 40px;
      color: #666666;
      opacity: 1;
    }
  }
}
</style>