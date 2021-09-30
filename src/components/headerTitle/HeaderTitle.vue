<!--  -->
<template>
  <div class="body">
    <div class="nav">
      <div class="title">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
.nav {
     display: flex;
     align-items: center;
     justify-content: space-between;
     height: 0.8rem;
    //  background: #ffffff;
     padding: 0.2rem;
     .title {
         // width: 0.8rem;
         padding-left: 0.12rem;
         height: 0.3rem;
         line-height: 0.3rem;
         font-size: 0.2rem;
         font-weight: bold;
         color: #666666;
         border-left: 0.08rem solid #2a77ff;
    }
}
 
</style>