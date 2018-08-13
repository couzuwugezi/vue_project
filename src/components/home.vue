<template>
  <div>
    <el-header height="50px" class="app-container__header" id="header">
      <div class="container-header__element" style="width: 100%;">
        <div class="container-header__logo" style="width: 100%;">
          <span></span>
          <span class="container-header__text">长天长环保智能平台</span>
          <span class="demonstration" style="float:right;">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    操作菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">系统登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
        </div>
        <div class="container-header__setting"><i class="fas fa-wrench"></i></div>
        <div style="clear:both"></div>
      </div>
    </el-header>
    <div id="headerDialog">
      <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
                 :show-close="false">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="140px">
          <el-form-item label="原始密码" prop="oldPass">
            <el-input v-model.number="form.oldPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="nowPass">
            <el-input type="password" v-model="form.nowPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="surePass">
            <el-input type="password" v-model="form.surePass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = !dialogVisible">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="app-container">
      <div class="main" style="display: block;">
        <el-aside class="aside-container" width="90" id="menu">
          <div class="aside-container__switch-icon">
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="true"><i class="el-icon-caret-left"></i></el-radio-button>
              <el-radio-button :label=" false"><i class="el-icon-caret-right"></i></el-radio-button>
            </el-radio-group>
          </div>
          <div class="aside-container__line"></div>
          <div class="aside-container-height">
            <el-menu class="el-menu-vertical-demo aside-container__menu " :collapse="isCollapse"
                     default-active="2" @select="handleSelect" style="height: 100%;">
              <el-submenu index="1" class="aside-container__title">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>机构管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" class="aside-container__option">组织机构管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" class="aside-container__option">人员管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-3" class="aside-container__option">角色管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i>
                  <span color="black">应用管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" class="aside-container__option">子系统管理</el-menu-item>
                  <el-menu-item index="2-2" class="aside-container__option">内网入口管理</el-menu-item>
                  <el-menu-item index="2-3" class="aside-container__option">外网窗口管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="4" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i><span>一源一档管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" class="aside-container__option">一源一档目录</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i><span>资源目录管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="5-1" class="aside-container__option">目录管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="5-2" class="aside-container__option">资源挂载</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i><span>资源管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="6-1" class="aside-container__option">数据表管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="6-2" class="aside-container__option">文件集管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="6-3" class="aside-container__option">协同服务管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="6-4" class="aside-container__option">数据交换服务管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="6-5" class="aside-container__option">数据交换构建管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="7" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i><span>流程协同管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="7-1" class="aside-container__option">子流程管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="7-2" class="aside-container__option">主流程管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="8" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i><span>访问日志管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="8-1" class="aside-container__option">短信发送日志</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="8-2" class="aside-container__option">协同接口访问日志</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="8-3" class="aside-container__option">数据交换访问日志</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="10" v-show="show">
                <template slot="title"><i class="el-icon-menu"></i><span>数据抽取</span></template>
                <el-menu-item-group>
                  <el-menu-item index="10-1" class="aside-container__option">作业管理</el-menu-item>
                  <el-menu-item index="10-2" class="aside-container__option">运行监控</el-menu-item>
                  <el-menu-item index="10-3" class="aside-container__option">运行统计</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="11">
                <template slot="title"><i class="el-icon-menu"></i><span>搜索管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="11-1" class="aside-container__option">索引管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="12" class="aside-container__title">
                <template slot="title"><i class="el-icon-menu"></i>
                  <span>敏感信息管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="12-1" class="aside-container__option">敏感字段管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="13"><i class="el-icon-location-outline"></i><span>配置管理页面</span></el-menu-item>
              <el-submenu index="9" v-show="show">
                <template slot="title"><i class="el-icon-menu"></i><span>运维管理</span></template>
                <el-menu-item-group>
                  <el-menu-item index="9-1" class="aside-container__option">运维人员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <div id="content" class="main-container" style="float: right;width: 95.5%">
        </div>
      </div>
    </div>
    <link rel="stylesheet" type="text/css" href="/static/css/commonality.css"/>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        isCollapse: false,
        show: false,
        form: {
          oldPass: '',
          nowPass: '',
          surePass: ''
        },
        dialogVisible: false,
        rules: {
          oldPass: [{required: true, message: '请输入原密码'},
            {
              validator: function (rule, value, callback) {
                vm.$axios.post('/manage/operateMana/checkPassword', {
                  loginname: '',
                  oldPass: value
                }).then((response) => {
                  if (response.status !== 200) {
                    this.$alert("系统异常,请联系管理员");
                    return false;
                  }
                  let data = response.data;
                  if (data.hasOwnProperty('code')) {
                    if (data.code !== '1') {
                      callback(new Error(data.msg))
                    } else {
                      callback();
                    }
                  }
                }).catch((error) => {
                  console.log(error);
                });
              },
              trigger: 'blur'
            }
          ],
          nowPass: [{required: true, message: '密码不能为空'}],
          surePass: [{required: true, message: '请再次输入密码'},
            {
              validator: function (rule, value, callback) {
                if (value !== this.form.nowPass) {
                  callback(new Error("两次输入的密码不一致"))
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }]
        },
        loginname: ''
      }
    },
    methods: {
      handleCommand(val) {

      },
      submitForm(form) {

      },
      handleSelect(key, index) {

      },
      updateName() {
        let params = this.$route.params;
        if (params.hasOwnProperty('loginname') && params.loginname === 'superadmin') {
          this.show = true;
        }
      }
    },
    mounted() {
    },
    created() {
      this.updateName();
    },
    watch: {
      '$route': 'updateName'
    }
  }
</script>

<style scoped>
</style>
