<template>
  <section class="loginFrame">
    <div class="login">
      <div class="form_legend">登录</div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" style="width:300px;" v-on:submit.prevent>
        <el-form-item label="学号/工号" prop="sid">
          <el-input v-model="loginForm.sid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="certificate">
          <el-radio-group v-model="loginForm.certificate">
            <el-radio label="普通用户"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',
  data () {
    var checkSid = (rule,value,callback) => {
      if (!Number(value)) {
        callback(new Error('请输入数字值'));
      }else {
        callback();
      }
    }
    return {
      loginForm: {
        sid: '',
        password: '',
        msg: '',
        certificate: ''
      },
      rules: {
        sid: [
          { required: true, message: '请输入学号或工号', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' },
          { validator: checkSid, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        certificate: [
          { required: true, message: '请选择登录身份', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    doLogin (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login({name: this.loginForm.sid, pwd: this.loginForm.password,type: this.loginForm.certificate})
            .then(data => {
              if (data.code === 100) {
                if (this.loginForm.certificate == '普通用户') {
                  this.$router.push('/');
                } else if (this.loginForm.certificate == '管理员') {
                  this.$router.push('/console');
                }
              }else if (data.code === 101) {
                this.$message({
                  type: 'success',
                  message:data.msg
                });
              }else {
                this.$message({
                  type: 'danger',
                  message: '登录出现问题，请重试!'
                });
              }    
            });
            return;
          } else {
            this.$message({
                  type: 'danger',
                  message: '登录条件不符合！'
                });
            return;
          }
        });
    },
    ...mapActions(['login'])   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
$color: #34AC81;
$w-color: #ffffff;
$padding: 15px;

.login{
  width: 400px;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 80px auto;
  padding: 25px;
  .form_legend{
    height: 40px;
    font-size: 16px;
    color: $w-color;
    margin: -25px -25px 25px -25px;
    padding-left:$padding;
    line-height: 40px;
    background-color:$color;
  }
  .frame-content {
    margin: $padding;
  }
  .form-group {
    input {
      height: 40px;
    }
    .radio {
      margin-left: 15px;
      label {
        margin-right: 55px;
      }
      input {
        height: auto;
      }
    }
    
  }
  .glyphicon{
    line-height: 40px;
    margin-right: -10px;
    color: $color; 
  }
  .btn-login {
    width: 100%;
    height: 40px;
    color: $w-color;
    background-color: $color;
  }
  .alert-info {
    padding: 10 15px;
  }
}

</style>
