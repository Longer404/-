<template>
  <div class="formbox">
    <div class="sonformbox">
      <div class="form-title-box">
        <div class="form-title">
          动漫信息投稿
        </div>
      </div>
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
          <el-form-item label="标题" prop="name" >
              <el-input  v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="分区" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择文章分区">
              <el-option label="动画资讯" value="animation"></el-option>
              <el-option label="漫画资讯" value="comics"></el-option>
              <el-option label="游戏相关" value="game"></el-option>
              <el-option label="动漫周边" value="peripheral"></el-option>
              <el-option label="同人相关" value="doujin"></el-option>
              <el-option label="漫展消息" value="exhibition"></el-option>
              </el-select>
          </el-form-item>
        
          <el-form-item label="摘要" prop="desc" >
              <el-input type="textarea" resize="none" v-model="ruleForm.desc"></el-input>
          </el-form-item>
      </el-form>

      <tinymce
          id="myedit"
          ref="editor"
          v-model="msg"
          :disabled="disabled"
          @tinytest="test"
      />
      <div class="middle-box">
        <el-button v-show="isDraft" type="primary" @click="saveDraft">保存草稿</el-button>
        <el-button type="danger" @click="postArticle">现在发表!</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, onMounted } from 'vue'
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
        isDraft: true,
        imageUrl: '',
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
          desc: [
            { required: true, message: '请填写文章的摘要', trigger: 'blur' }
          ]
        }
      };
    },
    mounted () {
      console.log(store.state.articleDetail);
      if (store.state.articleDetail._id) {
        console.log('ArticleDetail is full');
        this.ruleForm = {
          name: store.state.articleDetail.title,
          region: store.state.articleDetail.partition,
          desc: store.state.articleDetail.about,
        };
        this.$refs.editor.tinytest();
        if (store.state.articleStatus === 'article') {
          this.isDraft = false;
        }
      } else {
        console.log('ArticleDetail is empty');
        this.ruleForm = {
          name: '',
          region: '',
          desc: '',
        };
      }
    },
    unmounted () {
      console.log('formIsUnmounted');
      store.commit('setArticleDetail', {});
    },
    methods: {
      onClick(e, tinymce) {
        console.log(e);
        console.log(tinymce);
      },
      
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
      
      // 删除用户草稿
      async removeDraft (draftId) {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.delete(`/draft/${draftId}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        // ElMessage.success(resp.data.msg);
        // getDraftList();
      },

      // 提交一篇数据库中没有的新草稿
      async postDraft(){
        const total = {
          // 作者为当前登录的用户
          author: store.state.userInfo.data.data.nickname,
          authorId: store.state.userInfo.data.data._id,
          // 创作时间为提交时间
          createAt: Date(),
          coverUrl: this.imageUrl,
          title: this.$refs.ruleForm.model.name,
          partition: this.$refs.ruleForm.model.region,
          about: this.$refs.ruleForm.model.desc,
          content: this.$refs.editor.myValue,
        };
        
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
        const { data } = await axios.post(
          '/draft/post', 
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
      },

      // 更新已经存在的草稿
      async updateDraft(){
        const newEssay = {
          articleId: store.state.articleDetail._id,
          coverUrl: this.imageUrl,
          title: this.$refs.ruleForm.model.name,
          partition: this.$refs.ruleForm.model.region,
          about: this.$refs.ruleForm.model.desc,
          content: this.$refs.editor.myValue,
        };
        if (newEssay.coverUrl === store.state.articleDetail.coverUrl) {
          if (newEssay.title === store.state.articleDetail.title) {
            if (newEssay.partition === store.state.articleDetail.partition) {
              if (newEssay.about === store.state.articleDetail.about) {  
                if (newEssay.content === store.state.articleDetail.content) {
                  console.log('draft is not change');
                  ElMessage.success('保存成功');
                  return;
                }
              }
            }
          }
        }
        const { data } = await axios.post(
          '/draft/update', 
          {
              essay: newEssay
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
      },

      saveDraft() {
        // 如果存在全局数据则是需要更新的草稿
        if (store.state.articleDetail._id) {
          // if (store.state.articleStatus === 'draft') {
          //   this.removeDraft(store.state.articleDetail._id);
          // }
          console.log('旧草稿')
          this.updateDraft();
        } else {
          // 否则就是以前需要保存的新草稿
          console.log('新草稿')
          this.postDraft();
        }
      },

      // 发表文章
      async postNewArticle(){
        const total = {
          // 作者为当前登录的用户
          author: store.state.userInfo.data.data.nickname,
          authorId: store.state.userInfo.data.data._id,
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
        if (total.coverUrl === '') {
          if (store.state.articleDetail.coverUrl) {
            total.coverUrl = store.state.articleDetail.coverUrl;
          } else {
            ElMessage.error('请填上传封面');
            return;
          }
        }
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
          '/article/post', 
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
      },

      // 编辑已经存在的文章
      async updateArticle(){
        const newEssay = {
          articleId: store.state.articleDetail._id,
          coverUrl: this.imageUrl,
          title: this.$refs.ruleForm.model.name,
          partition: this.$refs.ruleForm.model.region,
          about: this.$refs.ruleForm.model.desc,
          content: this.$refs.editor.myValue,
        };
        if (newEssay.coverUrl === store.state.articleDetail.coverUrl) {
          if (newEssay.title === store.state.articleDetail.title) {
            if (newEssay.partition === store.state.articleDetail.partition) {
              if (newEssay.about === store.state.articleDetail.about) {  
                if (newEssay.content === store.state.articleDetail.content) {
                  console.log('article is not change');
                  ElMessage.success('保存成功');
                  this.$router.push('/');
                  return;
                }
              }
            }
          }
        }
        const { data } = await axios.post(
          '/article/update', 
          {
              essay: newEssay
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
      },

      postArticle() {
        // 如果存在全局数据则是需要编辑的文章
        if (store.state.articleDetail._id) {
          if (store.state.articleStatus === 'draft') {
            this.removeDraft(store.state.articleDetail._id);
            console.log('新文章')
            this.postNewArticle();
          } else {
            console.log('旧文章')
            this.updateArticle();
          }                    
        } else {
          // 否则就是以前需要发表的新文章
          console.log('新文章')
          this.postNewArticle();
        }
      },

    },
    setup() {
        // 用户id
        // const userId = store.state.userInfo.data.data._id;
        const test = (val) => {
          console.log(val)
        };
        const testpost = () => {
          // console.log(this.ruleForm);
          // console.log(this.imageUrl);
          console.log(this.msg);
        };
        onMounted(() => {
          console.log('formIsOnMounted');
          // test();
          // this.$refs.editor.tinytest();
        })
        return{
          testpost,
          test,
          // userId,
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
    margin: 35px auto;
    
  }
  
  .sonformbox {
    margin: 0 auto;
    width: 720px;
    /* height: 100%; */
  }
  .form-title-box {
    border-bottom-style:solid;
    border-bottom-width: 2px;
    border-bottom-color: #e3e3e3;
  }
  .form-title {
    padding-bottom: 10px;
    width: 100px;
    border-bottom-style:solid;
    border-bottom-width: 3px;
    border-bottom-color: #409EFF;
  }
  .text-cover {
    padding-top: 20px;
    padding-bottom: 20px;
    /* margin: 0 auto; */
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
  .sonformbox .el-input {
    width: 500px !important;
  }
  .sonformbox .el-textarea {
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
