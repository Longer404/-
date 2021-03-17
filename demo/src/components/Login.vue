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
  <div class="loginbox">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="footerbox">
        尾部
    </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

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
      return {
        dynamicValidateForm: {
          email: ''
        },
        ruleForm: {
          email: '',
          name: '',
          pass: '',
          checkPass: '',

        },
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
      }
    },
    setup() {
        
    },
})
</script>

<style>
  html,body {
    height: 100%;
    margin: 0 auto;
    /* text-align: center; */
  }
  .loginbox {
    /* display: flex; */
    /* flex-flow: column; */
    /* justify-content: space-between; */
    min-width: 1000px;
    /* height: 360px; */
    height: 100%;
    /* margin-top: 20px; */
    /* margin-right: 10%; */
    /* margin-left: 10%; */
    margin: 0 auto;
    /* padding-bottom: 100px; */
    /* border-style:solid; */
    /* border-width:1px; */
    /* border-color: rgb(170, 170, 170); */
    /* height: 100%; */
  }
  .el-input {
    width: 360px !important;
  }
  .el-form {
    margin: 0 auto;
    padding-top: 20px;
    width: 560px;
    margin-top: 0;
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