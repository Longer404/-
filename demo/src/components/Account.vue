<template>
  <div class="main-user-box">
    <div class="user-center">
        <el-tabs type="border-card" v-model="activeName">
            <!-- <el-tab-pane>
                <template #label>
                <span><i class="el-icon-date"></i> 我的行程</span>
                </template>
                我的行程
            </el-tab-pane> -->
            <el-tab-pane label="用户信息" name="first">
                用户信息
                <div class="account-avatar">
                    <span class="avatar-text">
                      用户头像
                    </span>
                    <el-upload
                        action="http://localhost:3000/upload/test"
                        list-type="picture-card"
                        :limit= 1
                        :headers= "header"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-change="change"
                        :on-success="handle_success"
                        :class = "{disabled:isMax}"
                        :before-upload="beforeAvatarUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    
                    <!-- <el-form-item label="出生日期">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item> -->
                    
                    <!-- <el-form-item label="性别">
                        <el-radio-group v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <!-- <el-form-item label="个性签名">
                        <el-input type="textarea" resize="none" v-model="form.desc"></el-input>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="投稿管理" name="second">
              投稿管理
              <!-- <div class="card-manage"> -->
                <!-- <div class="card-case"> -->
                <div v-for="article in articles" :key="article" class="card-case">
                  <div class="card-img">

                  </div>
                  <div class="card-info">
                    <div class="card-info-title">
                      {{article.title}}
                    </div>
                    <div class="card-info-date">
                      {{article.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary" @click="getDraft(article._id)">编辑</el-button>
                      <el-button type="danger" @click="removeArticle(article._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- </div> -->
            </el-tab-pane>
            <el-tab-pane label="收藏夹" name="third">
              收藏夹
              <el-button type="primary" @click="testbutton">测试接口</el-button>
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="fourth" :disabled="showdraft">
              草稿箱
              <div class="draft-card">
                <span>上传封面</span>
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
              <div>文章标题</div>
              <div>文章分区</div>
              <div>文章摘要</div>
              <div>正文</div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { getToken } from '../helpers/token'
import store from '../store'
import { setToken } from '../helpers/token'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({

    data() {
      return {
        userAvatarUrl: '',
        form: {
          name: '',
          //   region: '',
          // date1: '',
          //   date2: '',
          //   delivery: false,
          //   type: [],
          // resource: '',
          // desc: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        isMax : false,
        header: {
            Authorization: `Bearer ${getToken()}`
        }
      }
    },
    methods: {
      async onSubmit() {
        if (this.form.name === '' && this.userAvatarUrl === '') {
          ElMessage.warning('请修改后保存');
          return;
        }
        console.log('submit!');
        // console.log(this.form);
        const { data } = await axios.post('/user/update', {
            id: store.state.userInfo.data.data._id,
            nickname: this.form.name,
            userAvatar: this.userAvatarUrl,
              
        });
        console.log(data);
        // 设置全局状态
        store.commit('setUserInfo', data);
        store.commit('setUserStatus',true);
        // 将token存在本地
        setToken(data.data.token);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.isMax = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        // const test = "Bearer " + getToken()
        // console.log(test)
      },
      // 对头像上传的一些限制
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
      // 上传框改变触发的钩子
      change(){
          console.log('change')
        this.isMax = true
      },
      // 上传成功后服务端返回的信息
      handle_success(res) {
          console.log(res);
          this.userAvatarUrl = res.url;
      },
      // 上传时携带的请求头
      getHeader() {
          return {
            Authorization: `Bearer ${getToken()}`
          }
      },
    },

    setup() {
      const router = useRouter();
      // 默认显示的标签
      const activeName = ref('first');
      // 草稿箱标签是否可选
      const showdraft = ref('false');
      // 存储文章信息的响应式数据
      const articles = ref([]);
      // 用户id
      const userId = store.state.userInfo.data.data._id;
      const getArticleList = async () => {
        let res = await axios.get(`/article/manager/${userId}`);
        console.log('getlist')
        // 将请求返回的文章数组赋值给articles
        articles.value = res.data.data.list
        console.log(articles);
        // 将请求返回的文章总数赋值给total
        // total.value = res.data.data.total
      };

      const removeArticle = async (articleId) => {
        const aid = articleId;
        console.log(typeof articleId);
        let resp = await axios.delete(`/article/${aid}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        ElMessage.success(resp.data.msg);
        getArticleList();
      };

      const getDraft = async (articleId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.get(`/article/${articleId}`);
        // let res = await axios.delete('/article/' + articleId);
        // console.log(resp);
        store.commit('setArticleDetail', resp.data.data);
        console.log(showdraft.value);
        if (showdraft.value) {
          showdraft.value = !showdraft.value;
        }
        router.push('/form');
        // activeName.value = 'fourth';
        console.log(store.state.articleDetail);
        // ElMessage.success(resp.msg);
        // getArticleList();
      };

      const testbutton = () => {
        axios.post('/user/collection/', {
          id: userId,
        });
        showdraft.value = !showdraft.value;
      }

      onMounted(async () => {
        console.log('managerOnMounted')
        getArticleList();
        // console.log(store.state);
        // console.log(store.state.userInfo);
      });
        // const userAvatarUrl = ref('');
        // const form = reactive({
        //   name: '',
          //   region: '',
          // date1: '',
          //   date2: '',
          //   delivery: false,
          //   type: [],
          // resource: '',
          // desc: ''
      //   });
      //   const dialogImageUrl = ref('');
      //   const dialogVisible = ref(false);
      //   const isMax = ref(false);
      //   const header = {
      //       Authorization: `Bearer ${getToken()}`
      //   };

      //   const onSubmit = () => {
      //   console.log('submit!');
      // }
      // const handleRemove = (file, fileList) =>{
      //   console.log(file, fileList);
      //   isMax.value = false;
      // };
      // const handlePictureCardPreview = (file) =>{
      //   dialogImageUrl.value = file.url;
      //   dialogVisible.value = true;
        // const test = "Bearer " + getToken()
        // console.log(test)
      // };
      // 对头像上传的一些限制
      // const beforeAvatarUpload = (file) => {
      //   const isJPG = file.type === 'image/jpeg' || 'image/png';
      //   const isLt2M = file.size / 1024 / 1024 < 3;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 3MB!');
      //   }
      //   return isJPG && isLt2M;
      // };
      // 上传框改变触发的钩子
      // const change = () =>{
      //     console.log('change')
      //   isMax.value = true
      // };
      // 上传成功后服务端返回的信息
      // const handle_success = (res) => {
      //     console.log(res);
      //     userAvatarUrl.value = res.url;
      // };
      // 上传时携带的请求头
      // const getHeader = () => {
      //     return {
      //       Authorization: `Bearer ${getToken()}`
      //     }
      // };

      return {
        articles,
        removeArticle,
        testbutton,
        activeName,
        showdraft,
        getDraft,
      //     userAvatarUrl,
      //     form,
      //     dialogImageUrl,
      //     dialogVisible,
      //     isMax,
      //     header,
      //     onSubmit,
      //     handleRemove,
      //     handlePictureCardPreview,
      //     beforeAvatarUpload,
      //     change,
      //     handle_success,
      //     getHeader,
      }
    },

})
</script>

<style>
.main-user-box {
  min-width: 1000px;
}
.user-center {
    margin: 20px auto;
    min-height: 800px;
    width: 800px;
    background: #555;
}
.account-avatar {
  margin: 0 auto;
  width: 560px;
  display: flex;
  justify-content:flex-start;
  
}
.avatar-text {
  width: 68px;
  padding-right: 12px;
  font-size: 14px;
  line-height: 40px;
  color: #606266;
  text-align: right;
}
.disabled .el-upload--picture-card {
    display: none;
}
/* .card-manage {
    display: flex;
    justify-content: center;
} */
.card-case {
    margin: 15px auto;
    height: 120px;
    width: 500px;
    padding: 20px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #555;
    display: flex;
    justify-content: space-between;
}
.card-img {
    width: 180px;
    background: rgb(149, 240, 184);
}
.card-info {
    width: 280px;
    background: rgb(140, 117, 241);
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}
.card-info-title {
    font-size: 24px;
}
.card-info-date {
    font-size: 14px;
    font-weight: 200;
}
.card-info-handle {
    text-align: right;
}
</style>