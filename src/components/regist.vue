<template>
  <el-dialog v-cloak title="注册" :close-on-click-modal="false" :show-close="false"
             :close-on-press-escape="false" id="dialog" :visible.sync="registShow"
             width="23%">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px"
             label-position="left" size="mini" style="">
      <el-form-item label="用户名" class="item" prop="loginName">
        <el-input v-model="form.loginName" style="width: 170px"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" class="item" prop="realName">
        <el-input v-model="form.realName" style="width: 170px"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="item" prop="phone">
        <el-input v-model="form.phone" style="width: 170px"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="item" prop="sex">
        <el-select v-model="form.sex" filterable collapse-tags placeholder="请选择"
                   style="height:30px">
          <el-option v-for="item in sexOptions" :key="item.value"
                     :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" class="item" prop="loginPassword">
        <el-input type="input" v-model="form.loginPassword" style="width: 170px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-on:click="close()">关 闭</el-button>
      <el-button type="primary" v-on:click="submitForm('form')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "regist",
    props: {
      registShow: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        form: {},
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }],
        rules: {
          loginName: [
            {required: true, message: '该项不能为空', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur'},
            {
              validator: function (rule, value, callback) {
                let zzjgdmRegex = /^(\w|[0-9])*$/;
                if (!zzjgdmRegex.test(value)) {
                  callback(new Error('只能输入英文和数字！'))
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          realName:
            [
              {required: true, message: '该项不能为空', trigger: 'blur'},
              {min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur'},
              {
                validator: function (rule, value, callback) {
                  let nameRegex = /^[\u4E00-\u9FFFa-zA-Z]+$/;
                  if (!nameRegex.test(value)) {
                    callback(new Error('只能输入中文英文！'))
                  } else {
                    callback();
                  }
                },
                trigger: 'blur'
              }
            ],
          phone:
            [
              {required: true, message: '该项不能为空', trigger: 'blur'},
              {min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur'},
              {
                validator: function (rule, value, callback) {
                  let telRegex = /^([0-9])*$/;
                  if (!telRegex.test(value)) {
                    callback(new Error('只能输入数字！'))
                  } else {
                    callback();
                  }
                },
                trigger: 'blur'
              }
            ],
          sex:
            [
              {required: true, message: '该项不能为空', trigger: 'blur'}
            ],
          loginPassword:
            [
              {required: true, message: '该项不能为空', trigger: 'blur'},
              {min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur'}
            ],
        }
      }
    },
    methods: {
      submitForm: function (formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/register", {
              'loginName': vm.form.loginName,
              'realName': vm.form.realName,
              'phone': vm.form.phone,
              'loginPassword': vm.form.loginPassword,
              'sex': vm.form.sex
            }).then(function (response) {
              debugger;
              if(response.status !== 200){
                vm.$alert("系统异常,请联系管理员");
                return false;
              }
              let data = response.data;
              vm.form = {};
              vm.close();
              if (data.hasOwnProperty('msg')) {
                vm.$alert(data.msg);
              }
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close() {
        this.$emit("change", false);
      }
    }
  }
</script>

<style scoped>

</style>
