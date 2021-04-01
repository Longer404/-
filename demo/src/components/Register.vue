<template>
    <!-- <div class="fatherbox">
        <div class="headerbox">
            头部
        </div>
        <div class="mainbox">
            主体内容
        </div>
        <div class="footerbox">
            尾部
        </div>
    </div> -->
  <div class="registerbox">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="register-ruleForm">
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <div class="register-botton-area">
      <!-- <el-form-item> -->
        <el-button type="primary" @click="register(ruleForm)">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      <!-- </el-form-item> -->
      </div>
      <!-- <test-slot></test-slot> -->
    </el-form>
    <!-- <div class="footerbox">
        尾部
    </div> -->
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '../store'
// import { useRouter } from 'vue-router'
import { setToken } from '../helpers/token'

export default defineComponent({
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const ruleForm = reactive({
          email: '',
          name: '',
          pass: '',
          checkPass: '',

        }) ;
      return {
        dynamicValidateForm: {
          email: ''
        },
        // ruleForm: {
        //   email: '',
        //   name: '',
        //   pass: '',
        //   checkPass: '',

        // },
        ruleForm,
        rules: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async register (ruleForm) {
        console.log(ruleForm);
        // if (formData.nickName === '') {

        //   message.info('请输入账户');
        //   return;

        // } else if (formData.password === '') {

        //   message.info('请输入密码');
        //   return;

        // }
        // user.register(formData.nickName, formData.password);
        // const router = useRouter();
        const { data } = await axios.post('/user/register', {
          email: ruleForm.email,
          nickName: ruleForm.name,
          password: ruleForm.pass,
          
        });
        console.log(data);
        if (data.code) {
            ElMessage.success({
                message: data.msg,
                type: 'success'
            });
            // 设置全局状态
            store.commit('setUserInfo', data);
            store.commit('setUserStatus',true);
            // 将token存在本地
            setToken(data.data.token);
            // 跳转到首页
            this.$router.replace('/');
            window.location.href='/';
            // message.success(data.msg);
            return;
          }
        ElMessage.error(data.msg);
      }

    },
    setup(context) {
      console.log(context)
        const formData = reactive({
          email: '',
          name: '',
          pass: '',
          checkPass: '',
        });
        return {
          formData
        }
    },
})
</script>

<style>
  html,body {
    height: 100%;
    margin: 0 auto;
    /* text-align: center; */
  }
  .registerbox {
    background-image: url(../../public/img/background-img06.jpg);
    background-size: 110%;
    background-repeat: no-repeat; 
    width: 100%;
    min-width: 1000px;
    /* height: 360px; */
    height: 100%;
    margin: 0 auto;
  }
  .register-botton-area {
    display: flex;
    justify-content:center;
  }
  .el-input {
    width: 360px !important;
  }
  /* .el-form {
    margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 200px;
    padding-top: 20px;
    width: 560px;
    height: 300px;
    margin-top: 0;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
  } */
  .register-ruleForm {
    background: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 200px !important;
    margin-bottom: 200px !important;
    padding-top: 20px;
    width: 560px;
    height: 300px;
    margin-top: 0;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
  }
  /* .el-form-item__label {
      margin-left: 20px;
  } */
  .fatherbox {
      height: 100%;
      display: flex;
      flex-flow: column;
      /* align-content: flex-end; */
      justify-content: space-between;
  }
  .headerbox {
      height: 60px;
      background: #000;
  }
  .mainbox {
      /* height: 100px; */
      /* height: 80%; */
      min-height: 500px;
      background: #999;
  }
  .footerbox {
      bottom: 0;
      height: 60px;
      background: #555;
  }
</style>