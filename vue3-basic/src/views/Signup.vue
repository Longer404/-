<template>
  <div class="signup-page mx-auto p-3 w-400">
    <h5 class="my-4 text-center">注册账户</h5>
    <!-- <validate-form @form-submit="onFormSubmit"> -->
    <form >
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />
        <!-- :rules="emailRules"  -->
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />
        <!-- :rules="nameRules"  -->
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          
          v-model="formData.password"
        />
        <!-- :rules="passwordRules" -->
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          type="password"
          placeholder="请再次密码"
          
          v-model="formData.repeatPassword"
        />
        <!-- :rules="repeatPasswordRules" -->
      </div>
      <!-- <template #submit> -->
      <button @click="register" type="button" class="btn btn-primary btn-block btn-large">注册新用户</button>
      <!-- </template> -->
      <!-- </validate-form> -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import { useRouter } from 'vue-router'
import axios from 'axios'
// import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
// import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
// import createMessage from '../components/createMessage'
// import { user } from '../service';
import 'antd/dist/antd.css';
import { message } from 'antd';

export default defineComponent({
  name: 'Signup',
  components: {
    ValidateInput,
    // ValidateForm
  },
  setup() {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    });
    // const router = useRouter()
    // const emailRules: RulesProp = [
    //   { type: 'required', message: '电子邮箱地址不能为空' },
    //   { type: 'email', message: '请输入正确的电子邮箱格式' }
    // ]
    // const nameRules: RulesProp = [
    //   { type: 'required', message: '昵称不能为空' }
    // ]
    // const passwordRules: RulesProp = [
    //   { type: 'required', message: '密码不能为空' }
    // ]
    // const repeatPasswordRules: RulesProp = [
    //   { type: 'required', message: '重复密码不能为空' },
    //   {
    //     type: 'custom',
    //     validator: () => {
    //       return formData.password === formData.repeatPassword
    //     },
    //     message: '密码不相同'
    //   }
    // ]
    const register = () => {
      console.log(formData);
      if (formData.nickName === '') {

        message.info('请输入账户');
        return;

      } else if (formData.password === '') {

        message.info('请输入密码');
        return;

      }
      // user.register(formData.nickName, formData.password);
      axios.post('/user/register', {
        email: formData.email,
        nickName: formData.nickName,
        password: formData.password,
        
      });
    };
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // const payload = {
        //   email: formData.email,
        //   password: formData.password,
        //   nickName: formData.nickName
        // }
        // axios.post('/users/', payload).then(data => {
        //   createMessage('注册成功 正在跳转登录页面', 'success')
        //   setTimeout(() => {
        //     router.push('/login')
        //   }, 2000)
        // }).catch(e => {
        //   console.log(e)
        // })
      }
    }
    return {
    //   emailRules,
    //   nameRules,
    //   passwordRules,
    //   repeatPasswordRules,
      // onFormSubmit,
      formData,
      register
    }
  }
})
</script>

<style>
.w-400 {
  max-width: 400px;
}
</style>
