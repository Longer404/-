<template>
  <div class="formbox">
    <div class="sonfrombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="100px"  class="demo-ruleForm">
          <el-form-item label="标题" prop="name">
              <el-input  v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="分区" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <!-- <el-form-item label="即时配送" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item> -->
          
          
          <el-form-item label="摘要" prop="desc">
              <el-input type="textarea" resize="none" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-form>
      <tinymce
          id="myedit"
          ref="editor"
          v-model="msg"
          :disabled="disabled"
          @onClick="onClick"
      />
      <el-button type="danger" @click="postArticle">发表！</el-button>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import tinymce from './Tiny.vue'
import axios from 'axios'

export default defineComponent({
    components: {
      tinymce
    },
    data() {
      return {

        // total: {
        //   title: '',
        //   about: '',
        //   content: '',
        //   partition: '',
        // },

        ruleForm: {
          name: '',
          region: '',
          type: [],
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        //   date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
        //   date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        //   ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
        //   resource: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        //   ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
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
      // const formdata = ref({})
      postArticle(){
        // 父组件通过$refs拿到子组件里的数据
        // console.log(this.$refs.editor.myValue)
        // console.log(this.$refs.ruleForm)
        const total = {
          title: this.$refs.ruleForm.model.name,
          partition: this.$refs.ruleForm.model.region,
          about: this.$refs.ruleForm.model.desc,
          content: this.$refs.editor.myValue
        }
        console.log(total)
        axios.post('/upload/article', {
            essay: total
        });
      }
      // return {
      //   formdata,
      //   getmes
      // }
    },
    setup() {
        
    },
})
</script>

<style >

  html,body {
    margin: 0 auto !important;
    /* text-align: center; */
    height: 100%;
  }
  .formbox {
    /* display: flex; */
    min-width: 1000px;
    margin: 0 auto;
    /* margin-top: 20px; */
    /* margin-right: 10%; */
    /* margin-left: 10%; */
    /* padding-bottom: 100px; */
    /* height: 100%; */
    height: 100%;
    min-height: 850px;
    /* display: flex; */
    /* flex-flow: column; */
    /* justify-content: flex-start; */
  }
  .sonfrombox {
    margin: 0 auto;
    width: 720px;
    height: 100%;
  }
  .el-input {
    width: 500px !important;
  }
  .el-textarea {
    width: 500px !important;
  }
</style>
