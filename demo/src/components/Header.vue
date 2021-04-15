<template>
    <div class="testheader">
        <div class="leftdiv" @click="goToHome">
            <!-- <router-link to="/"> -->
                
            <!-- </router-link> -->
            <img class="leftdiv-img" src="../../public/img/title00.jpeg">
            <img class="leftdiv-img" src="../../public/img/title04.png">
        </div>
        <div v-show="isLogin && this.$router.currentRoute.value.name !== 'adminpage'" class="rightdiv">
        <!-- <div v-if="isLogin" class="rightdiv"> -->
        <!-- <div v-if="$store.state.userStatus" class="rightdiv"> -->
            <span class="header-nickname">欢迎，{{userNickname}}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <!-- <img v-if="$store.state.userStatus" class="user-avatar" :src="$store.state.userInfo.data.data.userAvatar"> -->
                    <img v-if="avatarUrl" class="user-avatar" :src="avatarUrl">
                    <img v-else class="user-avatar" src="../assets/avatar.png">
                    <!-- <img class="user-avatar" :src="$store.state.userInfo.data.user.userAvatar"> -->
                    <i class=" el-icon--right"></i>
                </span>
                <!-- <h1>{{isLogin}}</h1> -->
                <template #dropdown>
                    <el-dropdown-menu >
                    <el-dropdown-item >
                        <router-link to="/account">
                            个人中心
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        
                        <router-link to="/message">
                            消息中心
                        </router-link>
                        <el-badge v-show="messageLength" class="mark" :value="messageLength" />
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>欢迎，{{userNickname}}</el-dropdown-item> -->
                    <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item> -->
                    <!-- <el-dropdown-item >双皮奶</el-dropdown-item> -->
                    <el-dropdown-item divided @click="logout" style="color:red">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button size="small"  type="danger" @click="goToFormpage">
                <!-- <router-link to="/form"> -->
                    发布资讯
                <!-- </router-link> -->
            </el-button>
        </div>
        <!-- <div v-else class="rightdiv"> -->
        <div v-show="isLogin === false && this.$router.currentRoute.value.name !== 'adminpage'" class="rightdiv">
            <el-button size="small"  type="danger">
                <router-link to="/form">
                    发布资讯
                </router-link>
            </el-button>
            <!-- <h1>{{isLogin}}</h1> -->
            <el-button size="small"  type="primary" @click="dialogFormVisible = true">
            <!-- <el-button size="small"  type="primary"> -->
                <!-- <router-link to="/login"> -->
                    登录
                <!-- </router-link> -->
            </el-button>
            <el-dialog title="登录账号" :lock-scroll="false" v-model="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item 
                        prop="phone"
                        label="手机号码" 
                        label-width="100px"
                        :rules="[
                            { required: true, message: '请输入绑定的手机号', trigger: 'blur' },
                        ]"
                    >
                    <el-input style="width: 360px !important;" v-model="form.phone" autocomplete="off" placeholder="请输入绑定的手机号" maxlength="13"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="用户密码" 
                        label-width="100px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                    <el-input style="width: 360px !important;" v-model="form.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">登 录</el-button>
                    <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button>
                    </span>
                </template>
            </el-dialog>
            <el-button size="small"  
                type="primary" 
                @click="dialogRegFormVisible = true"
                style="margin-left: 10px;"
            >
                <!-- <router-link to="/register"> -->
                    注册
                <!-- </router-link> -->
            </el-button>
            <el-dialog title="注册账号" :lock-scroll="false" v-model="dialogRegFormVisible">
                <el-form :model="regForm">
                    <el-form-item 
                        prop="phone"
                        label="绑定手机 +86" 
                        label-width="120px"
                        :rules="[
                            { required: true, message: '请输入手机号', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="regForm.phone" autocomplete="off" placeholder="请输入13位手机号" maxlength="13" style="width:360px"></el-input>
                        
                    </el-form-item>
                    <el-form-item 
                        prop="code"
                        label="输入验证码" 
                        label-width="120px"
                        :rules="[
                            { required: true, message: '请输入4位验证码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="regForm.code" autocomplete="off" placeholder="请输入4位验证码" maxlength="4" style="width:228px"></el-input>
                        <el-button v-show="showCode" @click="getPhoneCode">获 取 验 证 码</el-button>
                        <el-button v-show="!showCode" disabled style="margin-left:0">{{count}}秒后重新发送</el-button>
                    </el-form-item>
                    <el-form-item 
                        prop="nickname"
                        label="用户昵称" 
                        label-width="120px"
                        :rules="[
                            { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        ]"
                    >
                        <el-input style="width: 360px !important;" v-model="regForm.nickname" autocomplete="off" placeholder="请输入用户昵称" ></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="用户密码" 
                        label-width="120px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                        <el-input style="width: 360px !important;" v-model="regForm.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="checkpass"
                        label="确认密码" 
                        label-width="120px"
                        :rules="[ 
                            { required: true, message: '请再次输入用户密码', trigger: 'blur' },
                        ]"
                    >
                        <el-input style="width: 360px !important;" v-model="regForm.checkpass" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogRegFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="registerForm">注 册</el-button>
                    <el-button @click="dialogRegFormVisible = false , dialogFormVisible = true" type="text" size="mini" style="margin-right:60px">已有账号，前去登录</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div v-show="this.$router.currentRoute.value.name === 'adminpage'" class="rightdiv">
            管理员，{{adminName}}
            <el-button size="small"  type="danger" @click="logoutAdmin" style="margin-left:10px">
                <!-- <router-link to="/form"> -->
                    退出管理员
                <!-- </router-link> -->
            </el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
// import { defineComponent, onMounted } from 'vue'
// import store from '../store'
import { setToken, getToken, setAdminToken, getAdminToken } from '../helpers/token'
import store from '../store'
// import {  } from '../helpers/token'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
    // props: {
    //     isLogin: store.state.userStatus
    // },
    setup() {
        const dialogFormVisible  = ref(false);
        const dialogRegFormVisible = ref(false);
        const isLogin = ref(false);
        const avatarUrl = ref('');
        const userNickname = ref('');
        const adminName = ref('');
        const messageLength = ref(0);
        const showCode = ref(true);
        const count = ref(0);
        const form = reactive({
            phone: '',
            password: ''
        });
        const regForm = reactive({
            nickname: '',
            phone: '',
            code: '',
            password: '',
            checkpass: '',
        });
        const verificationCode = ref('');
        const router = useRouter();

        const goToHome = () => {
            router.push('/');
        }
        const goToFormpage = () => {
            if(store.state.userInfo.data.data.power === '4' || store.state.userInfo.data.data.power === '3'){
                ElMessage.error('你的账号已被禁止发布资讯');
                return;
            } else {
                router.push('/form');
            }
            // alert("test");
        }
        const logout = () => {
            setToken('');
            window.location.href = '/';
        };
        const logoutAdmin = () => {
            setAdminToken('');
            window.location.href = '/';
        }
        const submitForm = async () => {
            
            console.log(form);
            if (form.phone === '') {
                ElMessage.warning({
                    message: '请输入绑定的手机号',
                    type: 'warning'
                });
                return;
            } else if (form.password === '') {
                ElMessage.warning({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            }
            const { data } = await axios.post('/user/login', {
                phone: form.phone,
                password: form.password,   
            });
            console.log(data);
            // dialogFormVisible.value = false;
            if (data.code) {
                // console.log('hello?');
                // 设置全局状态
                store.commit('setUserInfo', data);
                store.commit('setUserStatus',true);
                // 将token存在本地
                setToken(data.data.token);
                // isLogin.value = true;
                avatarUrl.value = store.state.userInfo.data.data.userAvatar;
                userNickname.value = store.state.userInfo.data.data.nickname;
                isLogin.value = true;
                // console.log(store.state.userInfo); 
                dialogFormVisible.value = false;
                ElMessage.success({
                    message: data.msg,
                    type: 'success'
                });
                return;
            }
            dialogFormVisible.value = false;
            ElMessage.error(data.msg);
            return;
          //   message.error(data.msg)
        }

        const getPhoneCode = async () => {
            
            const { data } = await axios.post('/message/getcode', {
                phoneNum: regForm.phone
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

        const registerForm = async () => {
            if (regForm.phone === '') {
                ElMessage.warning({
                    message: '请输入手机号',
                    type: 'warning'
                });
                return;
            } else if (regForm.code === '') {
                ElMessage.warning({
                    message: '请输入验证码',
                    type: 'warning'
                });
                return;
            } else if (regForm.password === '') {
                ElMessage.warning({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            }else if (regForm.checkpass === '') {
                ElMessage.warning({
                    message: '请再次输入密码',
                    type: 'warning'
                });
                return;
            } else if (regForm.password !== regForm.checkpass) {
                ElMessage.warning({
                    message: '两次输入密码不一致!',
                    type: 'warning'
                });
                return;
            } else if (regForm.code !== verificationCode.value) {
                ElMessage.warning({
                    message: '验证码不正确!',
                    type: 'warning'
                });
                return;
            } else if (regForm.nickname === '') {
                ElMessage.warning({
                    message: '请输入用户昵称',
                    type: 'warning'
                });
                return;
            }
            const { data } = await axios.post('/user/register', {
                phone: regForm.phone,
                nickName: regForm.nickname,
                password: regForm.password,
            });
            console.log(data);
            if (data.code) {
                // 设置全局状态
                console.log(data);
                store.commit('setUserInfo', data);
                store.commit('setUserStatus',true);
                // console.log(store.state.userInfo.data.user.nickname);
                // 将token存在本地
                setToken(data.data.token);
                isLogin.value = true;
                userNickname.value = store.state.userInfo.data.data.nickname;
                // avatarUrl.value = store.state.userInfo.data.user.userAvatar || '';
                dialogFormVisible.value = false;
                ElMessage.success({
                    message: data.msg,
                    type: 'success'
                });
                return;
            }
            ElMessage.error(data.msg);
            dialogFormVisible.value = false;
            return;
        }

        const getMessageList = async () => {
            // 用户id
            const userId = store.state.userInfo.data.data._id;
            let { data } = await axios.get(`/message/detail/${userId}`);
            console.log('getmessageList');
            console.log(data.data.length);
            messageLength.value = data.data.length;
            // 将请求返回的文章数组赋值给articles
            // messageList.value = data.data;
            // console.log(messageList);
            // getLocalTime(messageList.value);
            // return res.data.data.list;
            // 将请求返回的文章总数赋值给total
            // total.value = res.data.data.total
        };

        onMounted(async () => {
            console.log('挂载头部');
            console.log(store.state);
            console.log(store.state.userInfo);
            
            // avatarUrl.value = store.state.userInfo.data.data.userAvatar;
            if(getToken() !== '') {
                
                console.log(store.state.userInfo);
                console.log('设置状态');
                
                const userInfo = await store.dispatch('getUserInfo');

                if (userInfo) {
                    isLogin.value = true;
                    console.log(userInfo);
                    avatarUrl.value = userInfo.data.data.userAvatar;
                    userNickname.value = userInfo.data.data.nickname;
                    console.log(avatarUrl);
                }
                // store.commit('setUserStatus', true);
                
                console.log(store.state.userInfo);
                getMessageList();
                // isLogin.value = true;
            }
            if(getAdminToken() !== '') {
                
                // console.log(store.state.userInfo);
                console.log('设置管理员状态');
                
                const adminInfo = await store.dispatch('getAdminStatus');

                if (adminInfo) {
                    // isLogin.value = true;
                    console.log(adminInfo);
                    // avatarUrl.value = userInfo.data.data.userAvatar;
                    adminName.value = adminInfo.data.nickname;
                    console.log(adminName);
                }
                // store.commit('setUserStatus', true);
                
                console.log(store.state.adminInfo);
                // isLogin.value = true;
            }
            console.log('设置完毕');
            console.log(store.state);
            console.log(store.state.userInfo);
            
        })
        return {
            goToHome,
            logout,
            logoutAdmin,
            goToFormpage,
            isLogin,
            avatarUrl,
            userNickname,
            adminName,
            dialogFormVisible,
            dialogRegFormVisible,
            form,
            regForm,
            submitForm,
            registerForm,
            messageLength,
            getPhoneCode,
            showCode,
            count
        }
    },
})
</script>

<style>
  a {
      text-decoration: none;/* 去掉下划线 */
      color: inherit;
  }
  .testheader {
    background-color: #79BBFF;
    min-height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 1000px;
    width: 100%;
    box-shadow: #bebebe 0 1px 5px;
  }
  .leftdiv {
      width: 200px;
      height: 35px;
      margin-left: 10px;
      display: flex;
      /* background-image: url(../../public/img/title04.png); */
      /* background-size: 100%; */
      /* background-repeat: no-repeat; */
      cursor: pointer;
  }
  .leftdiv-img {
      /* width: 200px; */
      height: 35px;
  }
  .rightdiv {
      padding-right: 16px;
      height: 50px;
      display: flex;
        align-items: center;
  } 
  .header-nickname {
      font-size: 14px;
      font-weight: 300;
      margin-right: 10px;
  }
  .user-avatar {
      width: 50px;
      height: auto;
      border-radius:50%;
      margin-right: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dialog {
      min-width: 550px;
      max-width: 550px;
  }
  /* .el-dialog__footer {
      text-align: left !important;
  } */
  /* .el-input {
    width: 360px ;
  } */
</style>