<template>
  <div class="app-container">
    <div class="main-container__bg">
      <div class="main-content__text" align="center">
        <div>后台管理员登录平台</div>
      </div>
      <div class="main-container__drag">
        <div class="main-container__drag-login">
          <div class="main-content-right__form" align="center">
            <el-form :model="form" status-icon :rules="rules" ref="loginForm"
                     class="demo-ruleForm">
              <el-form-item label="" prop="loginname">
                <el-input placeholder="请输入账号" prefix-icon="el-icon-setting" type="loginname"
                          v-model="form.loginname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input placeholder="请输入密码" prefix-icon="el-icon-bell" type="password"
                          v-model="form.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitForm('loginForm')">登录</el-button>
                <el-button type="success" @click="registShow = true">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <regist :registShow="registShow" @change="closeDialog"/>
  </div>
</template>

<script>
  import regist from './regist';

  export default {
    name: "login",
    data() {
      return {
        registShow: false,
        form: {
          'loginname': '',
          'password': ''
        },
        rules: {
          loginname: [{required: true, message: '账号不能为空'}],
          password: [{required: true, message: '密码不能为空'}]
        }
      }
    },
    methods: {
      submitForm(form) {
        let vm = this;
        this.$refs[form].validate(function (valid) {
          if (valid) {
            let params = new URLSearchParams();
            params.append("loginname", vm.form.loginname);
            params.append("password", vm.form.password);
            vm.$axios.post('/manage/checkLogin', params).then((response) => {
              if (response.status !== 200) {
                vm.$alert("系统异常,请联系管理员");
                return false;
              }
              let data = response.data;

              if (data.hasOwnProperty('code')) {
                if (data.code !== '1') {
                  vm.$alert(data.msg);
                } else {
                  vm.$router.push({
                    name: 'home',
                    params: {
                      loginname: vm.form.loginname
                    }
                  });
                  vm.form = {};
                }
              }
            }).catch((error) => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeDialog(val) {
        this.registShow = val;
      }
    },
    components: {
      regist
    }
  }
</script>
<style scoped>
  .app-container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .main-container__bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("/static/img/unsplash.jpg") no-repeat fixed;
    box-sizing: border-box;
    background-size: cover;
    z-index: 1;
  }

  .main-container__bg:after {
    content: "";
    /*width: 100%;*/
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }

  .main-content__icon > embed {
    width: 60px;
    text-align: center;
    position: absolute;
    top: 100px;
    z-index: 20;
    margin: 0 auto;
  }

  .main-content__text {
    margin: 0 auto;
    width: 0;
  }

  .main-content__text > div {
    text-align: center;
    position: absolute;
    top: 150px;
    color: #FFFFFF;
    font-size: 20px;
    z-index: 26;
    left: 46%;
    margin-bottom: 10px;
    font-weight: lighter;
  }

  .main-container__drag {
    width: 30%;
    height: 30%;
    background: inherit;
    position: relative;
    margin: 200px auto;
  }

  .main-container__drag > div {
    width: 100%;
    height: 100%;
    text-align: center;
    /*line-height:200px;*/
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;

  }

  .main-container__drag-login {
    background-color: rgba(255, 255, 255, 0.44);
    border-radius: 10px;
    padding: 40px;
    border: 1px #1ED67D;
  }

  .main-container__drag:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(100px); /*为了模糊更明显，调高模糊度*/
    z-index: 2;
  }

  .main-content-right__form {
    width: 80%;
    margin: 0 auto;
  }

  .el-button {
    width: 47%;
  }
</style>
