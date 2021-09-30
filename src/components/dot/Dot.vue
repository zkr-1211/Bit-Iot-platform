<!--  -->
<template>
  <div class="body">
    <div class="dot">
      <div class="dynamic_right2">
        <div class="dynamic_right2_dot"></div>
        <div class="dynamic_right2_dot"></div>
        <div class="dynamic_right2_dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.dot {
     cursor: pointer;
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
             margin-bottom: 0.03rem;
             margin-right: 0.1rem;
             width: 0.04rem;
             height: 0.04rem;
             background: #999999;
             border-radius: 50%;
        }
    }
}
 
</style>