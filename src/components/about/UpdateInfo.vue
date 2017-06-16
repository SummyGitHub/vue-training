<template>
  <section class="updateInfo">
    <div class="form-horizontal" @keyup.enter="doUpdate">
      <fieldset>
        <legend>修改密码</legend>
        <div class="frame-content">
          <div class="form-group">
            <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="username">学号/工号：</label>  
            <div class="col-lg-10 col-md-10 col-sm-10">{{user.sid}}</div>        
          </div>
          <div class="form-group">
            <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="old_username">原密码：</label> 
            <div class="col-lg-10 col-md-10 col-sm-10">
              <input class="form-control" id="old_username" type="old_username" placeholder="原密码" v-model.trim="old_username"
            >
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="new_username">新密码：</label> 
            <div class="col-lg-10 col-md-10 col-sm-10">
              <input class="form-control" id="new_username" type="new_username" placeholder="原密码" v-model.trim="new_username"
            >
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="confirm_username">确认密码：</label> 
            <div class="col-lg-10 col-md-10 col-sm-10">
              <input class="form-control" id="confirm_username" type="confirm_username" placeholder="确认密码" v-model.trim="confirm_username"
            >
            </div>
          </div>
          <p class="alert-info">{{msg}}</p>
          <button class="btn btn-login" @click="doUpdate()">修改</button>
        </div>       
      </fieldset>    
    </div>
  </section>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  name: 'updateInfo',
  data () {
    return {
      old_username: '',
      new_username: '',
      confirm_username: '',
      msg: '',
    }
  },
  watch: {
    sid: 'clearMsg',
    pwd: 'clearMsg'
  },
  computed: {
  	...mapState(['user'])
  },
  methods: {
    doUpdate () {
      if (!this.old_username) {
        alert('请输入原密码！');
        return;
      }
      if (!this.new_username) {
        alert("请输入新密码！");
        return;
      }
      if (!this.confirm_username) {
        alert("请输入原密码！");
        return;
      }
      if (this.old_username == this.new_username) {
      	alert('您设置的新密码与原密码一致！');
      	return;
      }
      if (this.new_username != this.confirm_username) {
      	alert('您设置的两次密码不一致！');
      	return;
      }
      this.updateInfo({name: this.user.sid, old: this.old_username,new: this.new_username})
      .then(data => {
        if (data.code === 100) {
        	alert('密码修改成功，请重新登录！');
        	this.signOut();
          this.$router.push('/login');
        }else{
         alert(data.msg);
      	}
    	})
    },
    ...mapActions(['updateInfo','signOut'])   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
$color: #34AC81;
$w-color: #ffffff;
$padding: 15px;

.form-horizontal{
  width: 700px;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 0 auto;
  legend{
    height: 40px;
    font-size: 16px;
    color: $w-color;
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
