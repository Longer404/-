<template>
  <div class="formbox">
    
    <div class="sonfrombox">
      <div class="text-cover">
        
        <div >
          <span style="color:#F56C6C"> 
          *
          </span>
          <span class="cover-text">
            文章封面
          </span>
        </div>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/upload/test"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px"  class="demo-ruleForm">
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
          <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item> -->
      </el-form>

      <tinymce
          id="myedit"
          ref="editor"
          v-model="msg"
          :disabled="disabled"
          @onClick="onClick"
      />
      <div class="middle-box">
        <el-button type="primary" @click="testpost">保存草稿</el-button>
        <el-button type="danger" @click="postArticle">现在发表!</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import tinymce from './Tiny.vue'
import axios from 'axios'
import { getToken } from '../helpers/token'
import store from '../store'
// import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
    components: {
      tinymce
    },
    data() {
      return {
        imageUrl: '',
        // total: {
        //   title: '',
        //   about: '',
        //   content: '',
        //   partition: '',
        // },

        ruleForm: {
          name: '',
          region: '',
          // type: [],
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择分区', trigger: 'change' }
          ],
          //   date1: [
          //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          //   ],
          //   date2: [
          //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          //   ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          //   resource: [
          //     { required: true, message: '请选择活动资源', trigger: 'change' }
          //   ],
          desc: [
            { required: true, message: '请填写文章的摘要', trigger: 'blur' }
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
      // 上传时带上头信息以通过服务端验证
      getHeader() {
          return {
            Authorization: `Bearer ${getToken()}`
          }
      },
      // 图片上传成功触发的钩子
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imageUrl);
        // console.log(res);
        this.imageUrl = res.url;
      },
      // 上传图片前触发的钩子
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt2M;
      },
      // const formdata = ref({})
      async postArticle(){
        // 父组件通过$refs拿到子组件里的数据
        // console.log(this.$refs.editor.myValue)
        // console.log(this.$refs.ruleForm)
        // console.log(store.state.userInfo.data.data.nickname)
        // console.log(Date())
        const total = {
          // 作者为当前登录的用户
          author: store.state.userInfo.data.data.nickname,
          // 创作时间为发表时间
          createAt: Date(),
          coverUrl: this.imageUrl,
          title: this.$refs.ruleForm.model.name,
          partition: this.$refs.ruleForm.model.region,
          about: this.$refs.ruleForm.model.desc,
          content: this.$refs.editor.myValue,
        };
        console.log(this.imageUrl);
        console.log(total);
        if (total.title === '') {
          ElMessage.error('请填写文章标题');
          return;
        }
        if (total.partition === '') {
          ElMessage.error('请选择分区');
          return;
        }
        if (total.about === '') {
          ElMessage.error('请填写摘要');
          return;
        }
        if (total.content === '') {
          ElMessage.error('请填写文章正文');
          return;
        }
        // const router = useRouter();
        const { data } = await axios.post(
          '/upload/article', 
          {
              essay: total
          },
          {
              headers: this.getHeader(),
          }
                
        );
        if (data.code) {
            ElMessage.success(data.msg);
            this.$router.push('/');
            return;
        } else {
            ElMessage.error(data.msg);
            return;
        }
          
        // setTimeout(function(){
        //   // alert('脚本3');
        //   console.log('发布成功')
        // },3000);
        // this.$router.push('/');
        // console.log('跳转成功')
        // return;
      }
      // return {
      //   formdata,
      //   getmes
      // }
    },
    setup() {
        const testpost = () => {
          // console.log(this.ruleForm);
          // console.log(this.imageUrl);
          console.log(this.msg);
        };
        return{
          testpost,
        }
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
    /* height: 100%; */
    /* min-height: 850px; */
    /* display: flex; */
    /* flex-flow: column; */
    /* justify-content: flex-start; */
  }
  
  .sonfrombox {
    margin: 0 auto;
    width: 720px;
    /* height: 100%; */
  }
  .text-cover {
    padding-top: 20px;
    margin: 0 auto;
    width: 560px;
    display: flex;
    justify-content:flex-start;
    
  }
  .cover-text {
    width: 80px;
    padding-right: 32px;
    font-size: 14px;
    line-height: 40px;
    color: #606266;
    text-align: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 356px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 356px;
    height: 178px;
    /* overflow: hidden; */
    object-fit: cover;
    display: block;
  }
  .el-input {
    width: 500px !important;
  }
  .el-textarea {
    width: 500px !important;
  }
  .middle-box {
    /* height: 20px; */
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content:flex-end;
  }
</style>
