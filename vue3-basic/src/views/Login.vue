<template>
    <div class="login-page mx-auto p-3 w-400 py-4 mh-100">
      <!-- <validate-form @form-submit="onFormSubmit"> -->
      <form>
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <!-- <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"></validate-input> -->
          <validate-input
            type="text"
            v-model="formData.email" 
            placeholder="请输入邮箱地址" 
            
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <!-- <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal"></validate-input> -->
          <validate-input 
            type="password" 
            placeholder="请输入密码"
            v-model="formData.password">
          </validate-input>
        </div>
        <!-- <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
        </template> -->
        <button @click="register" type="button" class="btn btn-primary btn-block btn-large">登录</button>
      <!-- </validate-form> -->
      </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
// import ValidateForm from '../components/ValidateForm.vue'
// import { useStore } from 'vuex'
import axios from 'axios';
// import useClickOutside from '@/hooks/useClickOutside'
import 'antd/dist/antd.css';
import { message } from 'antd';

// const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
    name: 'Login',
    components: {
        ValidateInput,
        // ValidateForm
    },
    setup() {
        // const emailVal = ref('')
        // const router = useRouter()
        // const store = useStore()
        // const emailRules: RulesProp = [
        //     { type: 'required', message: '电子邮箱地址不能为空' },
        //     { type: 'email', message: '请输入正确的电子邮箱格式' }
        // ]
        // const passwordVal = ref('')
        // const passwordRules: RulesProp = [
        //     { type: 'required', message: '密码不能为空' }
        // ]
        const formData = reactive({
          email: '',
          nickName: '',
          password: '',
          repeatPassword: ''
        });

        const register = () => {
          console.log(formData);
          if (formData.email === '') {

            message.info('请输入邮箱地址');
            return;

          } else if (formData.password === '') {

            message.info('请输入密码');
            return;

          }
          axios.post('/user/login', {
            email: formData.email,
            // nickName: formData.nickName,
            password: formData.password,
              
          });
        };

        const onFormSubmit = (result: boolean) => {
            console.log('result', result)
            // if (result) {
            //     // router.push({name: 'column', params: {id: 1}})
            //     router.push('/')
            //     store.commit('login')
            // }
            
        }
        return {
            // emailRules,
            // passwordRules,
            // emailVal,
            // passwordVal,
            formData,
            register,
            // onFormSubmit
        }
    }
})
</script>
<style>
.w-400 {
  max-width: 400px;
}
.mh-100 {
  height: 66%;
  min-height: 280px;
}
html,body.containar {
  height: 100%;
}
</style>