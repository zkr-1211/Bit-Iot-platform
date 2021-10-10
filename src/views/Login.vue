<!--  -->
<template>
  <div class="body">
    <div class="top">
      <div class="logo">
        <img src="@/assets/image/home/icon_shuke.svg" alt="" />
      </div>
    </div>
    <div class="card">
      <div class="title" v-if="isLogin">登入</div>
      <div class="title" v-else>注册</div>
      <div class="content">
        <div>
          <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="" prop="nickname" v-if="!isLogin">
              <el-input placeholder="昵称" v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="" prop="account">
              <el-input placeholder="账号" v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input placeholder="密码" type="password" v-model.number="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="confirmPassword" v-if="!isLogin">
              <el-input type="password" placeholder="确认密码" v-model.number="ruleForm.confirmPassword" ="off"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="forget-password" v-if="isLogin">
                <div class="save-text">
                  <el-checkbox v-model="checked"></el-checkbox><span>保存密码</span>
                </div>
                <div class="text">忘记密码？</div>
              </div>
              <div class="buttons">
                <template>
                  <el-button v-if="isLogin" class="button1" type="primary" @click="submitForm('ruleForm')">登入</el-button>
                  <el-button v-else class="button1" type="primary" @click="register('ruleForm')">注册</el-button>
                </template>
                <template>
                  <el-button v-if="isLogin" class="button2" @click="toRegister('ruleForm')">注册</el-button>
                  <el-button v-else class="button2" @click="toLogin('ruleForm')">返回</el-button>
                </template>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RegisterApi, LoginApi } from "@/api/auth/auth";
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.confirmPassword !== "") {
          this.$refs.ruleForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLogin: true,
      checked: false,
      ruleForm: {
        nickname: "",
        account: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        nickname: [
          {
            required: true,
            message: "请填写呢称",
          },
        ],
        account: [
          {
            required: true,
            message: "ID必须为数字",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {},

  mounted() {},

  methods: {
    // 登入
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let id = this.ruleForm.account;
          let password = this.ruleForm.password;
          let data = {
            id,
            password,
          };
          // try {
            const res = await LoginApi(data);
            console.log("res", res)
            if (res.code === 200) {
              const token = res.data.token;
              this.$store.commit("setToken", token);
              this.$store.commit("setUserInfo", { id: id, password: 2 });
              this.$router.replace({
                path: "/equipmentoverview",
              });
              this.$message({
                message: "登入成功",
                type: "success",
              });
            } else {
                this.resetForm(formName);
              this.$router.replace({
                path: "/login",
              });
              this.$message.error("登入失败");
            }

          
          // } catch (error) {
            // this.$message.error("登入失败");
          // }
        } else {
          this.$message.error("请输入内容");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //注册
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let id = this.ruleForm.account;
          let password = this.ruleForm.password;
          let nickname = this.ruleForm.nickname;
          let data = {
            id,
            nickname,
            password,
          };
          try {
            const res = await RegisterApi(data);
            this.$message({
              message: "注册成功",
              type: "success",
            });
            setTimeout(() => {
              this.toLogin(formName);
            }, 1000);
          } catch (error) {
            this.$message.error("注册失败");
          }
        } else {
          this.$message.error("请输入内容");
          return false;
        }
      });
    },
    //去注册界面
    toRegister(formName) {
      this.ruleForm.confirmPassword = null;
      this.isLogin = false;
      this.resetForm(formName);
    },
    //去登入界面
    toLogin(formName) {
      this.isLogin = true;
      this.resetForm(formName);
    },
  },
};
</script>
<style lang='scss' scoped>
.body {
  height: 100vh;
  width: 100vw;
  background-image: url(../assets/image/login/background.svg);
  .top {
    padding: 0rem 0.7rem 0rem 0.7rem;
    height: 1.2rem;
    width: 100vw;
    background-color: #fff;
    line-height: 1.2rem;
    .logo {
      img {
        width: 2.8rem;
        height: 1.2rem;
      }
    }
  }
  .card {
    margin: 20vh auto;
    width: 3.2rem;
    height: 4rem;
    background: #ffffff;
    border-radius: 0.16rem;
    .title {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.16rem;
      text-align: center;
      font-weight: bold;
      color: #758093;
      border-bottom: 1px solid #eff0f5;
    }
    .demo-ruleForm {
      width: 80%;
      margin: 10% auto;
      ::v-deep .el-input__inner {
        background-color: #f7f8fc;
        border-radius: 0.04rem;
      }
      .forget-password {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.05rem;
        .save-text {
          span {
            margin-left: 0.08rem;
          }

          cursor: pointer;
          font-size: 0.12rem;
          line-height: 0.2rem;
          color: #758093;
        }
        .text {
          cursor: pointer;
          font-size: 0.12rem;
          line-height: 0.2rem;
          color: #2a77ff;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        margin-top: 0.2rem;
        .button1 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.8rem;
          height: 0.4rem;
          background: #2a77ff;
          border: none;
          box-shadow: 0rem 0.03rem 0.06rem rgba(42, 119, 255, 0.2);
          &:hover {
            background: #5592fe;
          }
          &:active {
            background: #2065e0;
          }
        }
        .button2 {
          height: 0.4rem;
          border: none;
          &:hover {
            // background: #5592fe;
          }
          &:active {
            color: #000000;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>