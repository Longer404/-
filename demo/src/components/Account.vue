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
                <el-form ref="form" :model="form" label-width="100px" style="margin-left:50px">
                    <el-form-item label="用户昵称">
                        <el-input v-model="form.name" style="width: 300px !important" :placeholder="userInfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机号">
                        <el-input v-model="form.phone" style="width: 300px !important" :placeholder="userInfo.phone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="改绑手机号">
                        <el-button plain @click="dialogOriginPhoneVisible = true" type="warning">点击改绑手机</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                    <el-form-item label="修改密码">
                        <el-button plain @click="dialogFormVisible = true" type="danger">点击修改密码</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-dialog title="修改账号密码" :lock-scroll="false" v-model="dialogFormVisible">
                <el-form :model="passForm">
                    <el-form-item 
                        prop="phone"
                        label="绑定手机号" 
                        label-width="100px"
                        :rules="[
                            { required: true, message: '请输入手机号', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="passForm.phone" autocomplete="off" placeholder="请输入11位手机号" maxlength="11" style="width:360px"></el-input>
                        
                    </el-form-item>
                    <el-form-item 
                        prop="code"
                        label="输入验证码" 
                        label-width="100px" 
                        :rules="[
                            { required: true, message: '请输入4位验证码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="passForm.code" autocomplete="off" placeholder="请输入4位验证码" maxlength="4" style="width:228px"></el-input>
                        <el-button v-show="showCode" @click="getPhoneCode(passForm.phone)">获 取 验 证 码</el-button>
                        <el-button v-show="!showCode" disabled style="margin-left:0">{{count}}秒后重新发送</el-button>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="用户新密码" 
                        label-width="100px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                    <el-input style="width: 360px !important;" v-model="passForm.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="确认新密码" 
                        label-width="100px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                    <el-input style="width: 360px !important;" v-model="passForm.checkpass" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="clearPassForm()">取 消</el-button>
                    <el-button type="primary" @click="submitPassForm">确 认</el-button>
                    <!-- <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button> -->
                    </span>
                </template>
            </el-dialog>
            <el-dialog title="解绑原手机号" :lock-scroll="false" v-model="dialogOriginPhoneVisible">
                <el-form :model="phoneForm">
                    <el-form-item 
                        prop="phone"
                        label="原绑定手机" 
                        label-width="100px"
                    >
                        <el-input disabled :placeholder="userInfo.phone" style="width:360px"></el-input>
                        
                    </el-form-item>
                    <el-form-item 
                        prop="code"
                        label="输入验证码" 
                        label-width="100px" 
                        :rules="[
                            { required: true, message: '请输入4位验证码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="phoneForm.code" autocomplete="off" placeholder="请输入4位验证码" maxlength="4" style="width:228px"></el-input>
                        <el-button v-show="showCode" @click="getPhoneCode(phoneForm.phone)">获 取 验 证 码</el-button>
                        <el-button v-show="!showCode" disabled style="margin-left:0">{{count}}秒后重新发送</el-button>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogOriginPhoneVisible = false,clearPhoneForm()">取 消</el-button>
                    <el-button type="primary" @click="submitOriginalPhone">确 认</el-button>
                    <!-- <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button> -->
                    </span>
                </template>
            </el-dialog>
            <el-dialog title="绑定新手机号" :lock-scroll="false" v-model="dialogNewPhoneVisible">
                <el-form :model="phoneForm">
                    <el-form-item 
                        prop="phone"
                        label="新绑定手机" 
                        label-width="100px"
                        :rules="[
                            { required: true, message: '请输入手机号', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="phoneForm.phone" autocomplete="off" placeholder="请输入11位手机号" maxlength="11" style="width:360px"></el-input>
                        
                    </el-form-item>
                    <el-form-item 
                        prop="code"
                        label="输入验证码" 
                        label-width="100px" 
                        :rules="[
                            { required: true, message: '请输入4位验证码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="phoneForm.code" autocomplete="off" placeholder="请输入4位验证码" maxlength="4" style="width:228px"></el-input>
                        <el-button v-show="showCode" @click="getPhoneCode(phoneForm.phone)">获 取 验 证 码</el-button>
                        <el-button v-show="!showCode" disabled style="margin-left:0">{{count}}秒后重新发送</el-button>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogNewPhoneVisible = false,clearPhoneForm()">取 消</el-button>
                    <el-button type="primary" @click="submitNewPhone">确 认</el-button>
                    <!-- <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button> -->
                    </span>
                </template>
            </el-dialog>
            <el-tab-pane label="投稿管理" name="second">
              投稿管理
              <!-- <div class="card-manage"> -->
                <!-- <div class="card-case"> -->
                <div v-for="article in articles" :key="article" class="card-case">
                  <img v-if="article.coverUrl !== ''" class="card-img" :src="article.coverUrl" >
                  <img v-else class="card-img" src="../../public/img/img-false.jpg">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{article.title}}
                    </div>
                    <div class="card-info-date">
                      {{article.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary" size="small" @click="getArticle(article._id)">编辑</el-button>
                      <el-button type="danger" size="small" @click="removeArticle(article._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- </div> -->
            </el-tab-pane>
            <el-tab-pane label="审核中" name="third">
              审核中
              <div v-for="semifinishedArticle in semifinishedArticles" :key="semifinishedArticle" class="card-case">
                  <img v-if="semifinishedArticle.coverUrl !== ''" class="card-img" :src="semifinishedArticle.coverUrl" >
                  <img v-else class="card-img" src="../../public/img/img-false.jpg">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{semifinishedArticle.title}}
                    </div>
                    <div class="card-info-date">
                      {{semifinishedArticle.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <div v-if="semifinishedArticle.examined ==='examining'" class="progress-box" style="color:#409EFF">
                        审核中...
                      </div>
                      <div v-else class="progress-box" style="color:red">
                        被驳回！
                      </div>
                      <el-button type="primary" size="small" @click="getArticle(semifinishedArticle._id)">编辑</el-button>
                      <el-button type="danger" size="small" @click="removeArticle(semifinishedArticle._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="fourth">
              草稿箱
              <div v-for="draft in drafts" :key="draft" class="card-case">
                  <img class="card-img" :src="draft.coverUrl">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{draft.title}}
                    </div>
                    <div class="card-info-date">
                      {{draft.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary" size="small" @click="getDraft(draft._id)">编辑</el-button>
                      <el-button type="danger" size="small" @click="removeDraft(draft._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="收藏夹" name="fifth">
              <!-- <el-button @click="getUserCollection">测试接口</el-button> -->
              <!-- <div class="card-manage"> -->
                <!-- <div class="card-case"> -->
                收藏夹
                <div v-for="article in collectionList" :key="article" class="card-case">
                  <img v-if="article.coverUrl !== ''" class="card-img" :src="article.coverUrl" >
                  <img v-else class="card-img" src="../../public/img/img-false.jpg">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{article.title}}
                    </div>
                    <div class="card-info-date">
                      {{article.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <!-- <el-button type="primary" @click="getArticle(article._id)">编辑</el-button> -->
                      <el-button type="danger" size="small" @click="removeCollection(article._id)">取消收藏</el-button>
                    </div>
                  </div>
                </div>

              <!-- </div> -->
            </el-tab-pane>
            <el-tab-pane label="评论管理" name="sixth">
              评论管理
              <div v-for="comment in commentList" :key="comment" class="comment-card">
                  <!-- <img class="card-img" :src="draft.coverUrl"> -->
                  <!-- <div class="comment-card"> -->
                    <div class="comment-card-title">
                      评论 →{{comment.commentFrom}}
                    </div>
                    
                    <div class="comment-card-content">
                      {{comment.content}}
                    </div>
                    <div class="comment-handle">
                      <div class="comment-card-date">
                        {{comment.createAt}}
                      </div>
                      <!-- class="card-info-handle" -->
                      <!-- <el-button type="primary" @click="getDraft(draft._id)">编辑</el-button> -->
                      <el-button type="danger" size="small" @click="deleteUserComment(comment._id)">删除</el-button>
                    </div>
                  <!-- </div> -->
                </div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { getToken } from '../helpers/token'
import store from '../store'
import { setToken } from '../helpers/token'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// import { reactive } from '@vue/composition-api'

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
        ElMessage.success('个人信息' + data.msg);
        console.log(data);
        // 设置全局状态
        store.commit('setUserInfo', data);
        store.commit('setUserStatus',true);
        // 将token存在本地
        setToken(data.data.token);
      },
      // async changePass() {

      // },
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
      // const showdraft = ref('false');
      // 存储文章信息的响应式数据
      const articles = ref([]);
      // 存储草稿信息的响应式数据
      const drafts = ref([]);
      // 存储审核信息
      const semifinishedArticles = ref([]);
      // 评论信息
      const commentList = ref([]);

      const collectionList = ref([]);

      const userInfo = ref({});
      const verificationCode = ref('');
      const count = ref(0);
      const showCode = ref(true);
      const dialogFormVisible = ref(false);
      const dialogOriginPhoneVisible = ref(false);
      const dialogNewPhoneVisible = ref(false);
      const passForm = reactive({
        phone:'',
        code:'',
        password:'',
        checkpass:''
      });
      const phoneForm = reactive({
        phone:'',
        code:'',
      })
      const getPhoneCode = async (phone) => {
            
          const { data } = await axios.post('/message/getcode', {
              phoneNum: phone
          });
          console.log(data);
          verificationCode.value = data.data;
          const TIME_COUNT = 60;
          let timer = null;
          if (!timer) {
              count.value = TIME_COUNT;
              showCode.value = false;
              timer = setInterval(() => {
                  if (count.value > 0 && count.value <= TIME_COUNT) {
                      count.value--;
                      // console.log(count.value);
                  } else {
                  showCode.value = true;
                  clearInterval(timer);
                      timer = null;
                  }
              }, 1000)
          }
      }
      
      const clearPassForm = () => {
          dialogFormVisible.value = !dialogFormVisible.value;
          count.value = 0;
          passForm.phone = '';
          passForm.code = '';
          passForm.password = '';
          passForm.checkpass = '';
      }

      const clearPhoneForm = () => {
          phoneForm.phone = '';
          phoneForm.code = '';
          count.value = 0;
      } 

      const submitPassForm = async () => {
            if (passForm.phone === '') {
                ElMessage.warning({
                    message: '请输入手机号',
                    type: 'warning'
                });
                return;
            } else if (passForm.code === '') {
                ElMessage.warning({
                    message: '请输入验证码',
                    type: 'warning'
                });
                return;
            } else if (passForm.password === '') {
                ElMessage.warning({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            }else if (passForm.checkpass === '') {
                ElMessage.warning({
                    message: '请再次输入密码',
                    type: 'warning'
                });
                return;
            } else if (passForm.password !== passForm.checkpass) {
                ElMessage.warning({
                    message: '两次输入密码不一致!',
                    type: 'warning'
                });
                return;
            } else if (passForm.code !== verificationCode.value) {
                ElMessage.warning({
                    message: '验证码不正确!',
                    type: 'warning'
                });
                return;
            }
            const userId = store.state.userInfo.data.data._id;
            const { data } = await axios.post('/user/updatepass', {
                id: userId,
                password: passForm.password,   
            });
            if(data.code) {
               ElMessage.success('用户密码' + data.msg);
               clearPassForm();
               return;
            }
            ElMessage.error(data.msg);
            clearPassForm();
            return;
      }

      const submitOriginalPhone = async () => {
            if (phoneForm.code === '') {
                ElMessage.warning({
                    message: '请输入原绑定手机验证码',
                    type: 'warning'
                });
                return;
            } else if (phoneForm.code !== verificationCode.value) {
                ElMessage.warning({
                    message: '验证码不正确!',
                    type: 'warning'
                });
                return;
            }
            clearPhoneForm();
            dialogOriginPhoneVisible.value = false;
            dialogNewPhoneVisible.value = true;
            return;
      }

      const submitNewPhone = async () => {
            if (phoneForm.phone === '') {
                ElMessage.warning({
                    message: '请输入新绑定的手机号',
                    type: 'warning'
                });
                return;
            } else if (phoneForm.code === '') {
                ElMessage.warning({
                    message: '请输入新绑定手机验证码',
                    type: 'warning'
                });
                return;
            } else if (phoneForm.code !== verificationCode.value) {
                ElMessage.warning({
                    message: '验证码不正确!',
                    type: 'warning'
                });
                return;
            }
            const userId = store.state.userInfo.data.data._id;
            const { data } = await axios.post('/user/updatephone', {
                id: userId,
                phone: phoneForm.phone,
            });
            if(data.code) {
                ElMessage.success('绑定手机' + data.msg);
                dialogNewPhoneVisible.value = false;
                clearPhoneForm();
                return;
            }
            clearPhoneForm();
            ElMessage.error(data.msg);
            dialogNewPhoneVisible.value = false;
            return;
      }

      // 获取用户文章列表
      const getArticleList = async () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        let res = await axios.get(`/article/manager/${userId}`);
        console.log('getlist')
        // 将请求返回的文章数组赋值给articles
        articles.value = res.data.data.list;
        console.log(articles);
        return res.data.data.list;
        // 将请求返回的文章总数赋值给total
        // total.value = res.data.data.total
      };

      // 获取用户审核中的文章列表
      const getSemifinishedArticleList = async () => {
        // var lenth = 0;
        // console.log(articles.value.length);
        // const templist = await getArticleList();
        // console.log(templist.length);
            // console.log(lenth);
        // for(;lenth < templist.length;lenth++) {
        //   if (templist[lenth].examined === 'examining' || templist[lenth].examined === 'reject'){
        //     semifinishedArticles.value.push(templist[lenth]);
        //   } else {
        //     continue;
        //   }
            // data[lenth].meta.createdAt = format(data[lenth].meta.createdAt);
        // }
        // console.log(semifinishedArticles);
        const type = 'examining';
        const userId = store.state.userInfo.data.data._id;
        let { data } = await axios.get(`/article/table/${type}`, {
            params: {
                id: userId
            }
        });
        console.log(data);
        semifinishedArticles.value = data.data.list;
      };

      // 删除用户文章
      const removeArticle = async (articleId) => {
        const aid = articleId;
        console.log(typeof articleId);
        let resp = await axios.delete(`/article/${aid}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        ElMessage.success('资讯' + resp.data.msg);
        getArticleList();
      };
      // 获取用户文章详细信息
      const getArticle = async (articleId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.get(`/article/detail/${articleId}`);
        // let res = await axios.delete('/article/' + articleId);
        // console.log(resp);
        store.commit('setArticleDetail', resp.data.data);
        store.commit('setArticleStatus','article');
        // console.log(showdraft.value);
        // if (showdraft.value) {
        //   showdraft.value = !showdraft.value;
        // }
        router.push('/form');
        // activeName.value = 'fourth';
        console.log(store.state.articleDetail);
        // ElMessage.success(resp.msg);
        // getArticleList();
      };

      // 获取用户草稿列表
      const getDraftList = async () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        let res = await axios.get(`/draft/manager/${userId}`);
        console.log('getdraft')
        // 将请求返回的文章数组赋值给articles
        drafts.value = res.data.data.list
        console.log(drafts);
        // 将请求返回的文章总数赋值给total
        // total.value = res.data.data.total
      };

      // 删除用户草稿
      const removeDraft = async (draftId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.delete(`/draft/${draftId}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        ElMessage.success(resp.data.msg);
        getDraftList();
      };

      // 获取用户草稿详细信息
      const getDraft = async (draftId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.get(`/draft/${draftId}`);
        // let res = await axios.delete('/article/' + articleId);
        // console.log(resp);
        store.commit('setArticleDetail', resp.data.data);
        store.commit('setArticleStatus','draft');
        // console.log(showdraft.value);
        // if (showdraft.value) {
        //   showdraft.value = !showdraft.value;
        // }
        router.push('/form');
        // activeName.value = 'fourth';
        console.log(store.state.articleDetail);
        // ElMessage.success(resp.msg);
        // getArticleList();
      };

      const getUserComment = async () => {
          const userId = store.state.userInfo.data.data._id;
            const res = await axios.get('/comment/byUserId', {
                params: {
                    commentatorId: userId,
                }
            });
            console.log(res);
            commentList.value = res.data.data;
            // totalComment.value = res.data.data.total;
            // getCommentLocalTime(commentTable.value);
            // total.value = res.data.data.total;
        }

      const deleteUserComment = async (commentId) => {
            let resp = await axios.delete(`/comment/${commentId}`);
            ElMessage.success(resp.data.msg);
            getUserComment();
        }

      const getUserCollection = async () => {
        console.log(store.state.userInfo.data.data._id);
        const { data } = await axios.get('/user/collection',{
          params: {
            id: store.state.userInfo.data.data._id
          }  
        });
        console.log(data);
        collectionList.value = data.data;

      }

      const removeCollection = async (articleid) => {
        const { data } = await axios.post('/user/collect',{
          userid: store.state.userInfo.data.data._id,
          articleid: articleid
        });
        console.log(data);
        ElMessage.success(data.msg);
        getUserCollection();
      }

      const testbutton = () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        axios.post('/user/collection/', {
          id: userId,
        });
        // showdraft.value = !showdraft.value;
      }

      onMounted(async () => {
        console.log('managerOnMounted')
        getArticleList();
        getDraftList();
        getSemifinishedArticleList();
        getUserComment();
        getUserCollection();
        userInfo.value = store.state.userInfo.data.data;
        console.log(router.currentRoute.value.name);
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
        drafts,
        articles,
        semifinishedArticles,
        commentList,
        collectionList,
        testbutton,
        activeName,
        getArticle,
        removeArticle,
        getDraft,
        getUserComment,
        getUserCollection,
        deleteUserComment,
        removeCollection,
        removeDraft,
        userInfo,
        dialogFormVisible,
        dialogOriginPhoneVisible,
        dialogNewPhoneVisible,
        passForm,
        phoneForm,
        count,
        showCode,
        getPhoneCode,
        submitPassForm,
        clearPassForm,
        submitOriginalPhone,
        clearPhoneForm,
        submitNewPhone
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
    margin: 40px auto;
    min-height: 800px;
    width: 800px;
    /* background: #555; */
}
.el-tabs {
  min-height: 780px;
}
.account-avatar {
  /* margin: 0 auto; */
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 50px;
  width: 560px;
  display: flex;
  justify-content:flex-start;
  
}
.avatar-text {
  width: 88px;
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
    height: 100px;
    width: 600px;
    padding: 15px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}
.card-img {
    width: 180px;
    background: gray;
    object-fit: cover;
    /* width: 100%; */
}
.card-info {
    width: 400px;
    /* background: rgb(140, 117, 241); */
    border-left-style:solid;
    border-left-width: 1px;
    border-left-color: #99a9bf;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}
.card-info-title {
    font-size: 20px;
    margin-left: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.card-info-date {
    font-size: 13px;
    font-weight: 200;
    margin-left: 20px;
}
.card-info-handle {
    /* text-align: right; */
    display: flex;
    justify-content: flex-end;
}
.progress-box {
    width: 130px;
    font-size: 20px;
    /* text-align: center; */
    line-height: 32px;
}
.comment-card {
    margin: 15px auto;
    min-height: 100px;
    width: 600px;
    padding: 10px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #e3e3e3;
    /* display: flex;
    justify-content: space-between; */
    
}
.comment-card {
  display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}
.comment-card-title {
    font-size: 16px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.comment-card-date {
  font-size: 12px;
    font-weight: 200;
}
.comment-handle {
  line-height: 30px;
  text-align: right;
  display: flex;
    justify-content: space-between;
}
</style>