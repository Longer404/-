<template>
    <div class="registerbox">
        <el-form  status-icon label-width="100px" class="demo-ruleForm">
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="formData.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="login">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
  </div>
    <!-- <div class="fatherbox"> -->
        <!-- <div class="headerbox">
            头部
        </div> -->
        <!-- <div class="mainbox">
            主体内容
        </div> -->
        <!-- <div class="footerbox">
            尾部
        </div> -->
    <!-- </div> -->
</template>

<script>
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
    data() {
    //   var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.ruleForm.checkPass !== '') {
    //         this.$refs.ruleForm.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
    
      return {
        // dynamicValidateForm: {
        //   email: ''
        // },
        // ruleForm: {
        //   email: '',
        // //   name: '',
        //   pass: '',
        // //   checkPass: '',

        // },
        // rules: {
        //   email: [
        //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        //     { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        //   ],
        //   pass: [
        //     { validator: validatePass, trigger: 'blur' }
        //   ],
        
        // }
      };
    },
    methods: {
    //   submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }
    },

    setup() {
        const formData = reactive({
          email: '',
        //   nickName: '',
          password: '',
        //   repeatPassword: ''
        });
        // axios.get('/article');
        const login = async () => {
        //   console.log(formData);
          if (formData.email === '') {
            ElMessage.warning({
                message: '请输入邮箱地址',
                type: 'warning'
            });
            // message.info('请输入邮箱地址');
            return;

          } else if (formData.password === '') {
            ElMessage.warning({
                message: '请输入密码',
                type: 'warning'
            });
            // message.info('请输入密码');
            return;

          }
          const {data} = await axios.post('/user/login', {
            email: formData.email,
            // nickName: formData.nickName,
            password: formData.password,
              
          });
          console.log(data);
          if (data.code) {
            ElMessage.success({
                message: data.msg,
                type: 'success'
            });
            // message.success(data.msg);
            return;
          }
        ElMessage.error(data.msg);
        //   message.error(data.msg)
        };

        return {
            login,
            formData
        }
    },
})
</script>

<style>
  html,body {
    height: 100%;
    margin: 0 auto;
  }
  .registerbox {
    min-width: 1000px;
    height: 100%;
    margin: 0 auto;
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
      min-width: 1000px;
      background: #999;
  }
  .footerbox {
      bottom: 0;
      height: 60px;
      background: #555;
  }
</style>
