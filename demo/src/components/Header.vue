<template>
    <div class="testheader">
        <div class="leftdiv" @click="goToHome">
            <!-- <router-link to="/"> -->
                
            <!-- </router-link> -->
        </div>
        
        <div v-if="isLogin" class="rightdiv">
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
                    <el-dropdown-menu>
                    <el-dropdown-item>
                        <router-link to="/account">
                            个人中心
                        </router-link>
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>欢迎，{{userNickname}}</el-dropdown-item> -->
                    <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item> -->
                    <!-- <el-dropdown-item >双皮奶</el-dropdown-item> -->
                    <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-button size="small"  type="danger">
                <router-link to="/form">
                    发表文章
                </router-link>
            </el-button>
        </div>
        <div v-else class="rightdiv">
        <!-- <div v-show="isLogin" class="rightdiv"> -->
            <el-button size="small"  type="danger">
                <router-link to="/form">
                    发表文章
                </router-link>
            </el-button>
            <!-- <h1>{{isLogin}}</h1> -->
            <el-button size="small"  type="primary" @click="dialogFormVisible = true">
            <!-- <el-button size="small"  type="primary"> -->
                <!-- <router-link to="/login"> -->
                    登录
                <!-- </router-link> -->
            </el-button>
            <el-dialog title="登录账号" v-model="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item 
                        prop="email"
                        label="用户邮箱" 
                        label-width="100px"
                        :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                    <el-input v-model="form.email" autocomplete="off" placeholder="请输入用户邮箱"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="用户密码" 
                        label-width="100px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                    <el-input v-model="form.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">登 录</el-button>
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
            <el-dialog title="注册账号" v-model="dialogRegFormVisible">
                <el-form :model="regForm">
                    <el-form-item 
                        prop="email"
                        label="绑定用户邮箱" 
                        label-width="120px"
                        :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]"
                    >
                        <el-input v-model="regForm.email" autocomplete="off" placeholder="请输入用户邮箱"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="nickname"
                        label="用户昵称" 
                        label-width="120px"
                        :rules="[
                            { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="regForm.nickname" autocomplete="off" placeholder="请输入用户邮箱"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="password"
                        label="用户密码" 
                        label-width="120px"
                        :rules="[ 
                            { required: true, message: '请输入用户密码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="regForm.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="checkpass"
                        label="确认密码" 
                        label-width="120px"
                        :rules="[ 
                            { required: true, message: '请再次输入用户密码', trigger: 'blur' },
                        ]"
                    >
                        <el-input v-model="regForm.checkpass" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogRegFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="registerForm">注 册</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
// import { defineComponent, onMounted } from 'vue'
// import store from '../store'
import { setToken } from '../helpers/token'
import store from '../store'
import { getToken } from '../helpers/token'
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
        const form = reactive({
            email: '',
            password: ''
        });
        const regForm = reactive({
            nickname: '',
            email: '',
            password: '',
            checkpass: '',
        });
        const router = useRouter();

        const goToHome = () => {
            router.push('/');
        }
        const logout = () => {
            setToken('');
            window.location.href = '/';
        };

        const submitForm = async () => {
            
            console.log(form);
            if (form.email === '') {
                ElMessage.warning({
                    message: '请输入邮箱地址',
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
                email: form.email,
                password: form.password,   
            });
            console.log(data);
            if (data.code) {
                // 设置全局状态
                store.commit('setUserInfo', data);
                store.commit('setUserStatus',true);
                // 将token存在本地
                setToken(data.data.token);
                isLogin.value = true;
                avatarUrl.value = store.state.userInfo.data.user.userAvatar;
                userNickname.value = store.state.userInfo.data.user.nickname;
                // console.log(store.state.userInfo); 
                dialogFormVisible.value = false;
                ElMessage.success({
                    message: data.msg,
                    type: 'success'
                });
                return;
            }
            ElMessage.error(data.msg);
          //   message.error(data.msg)
        }

        const registerForm = async () => {
            if (regForm.email === '') {
                ElMessage.warning({
                    message: '请输入邮箱地址',
                    type: 'warning'
                });
                return;
            } else if (regForm.password === '') {
                ElMessage.warning({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            } else if (regForm.password !== regForm.checkpass) {
                ElMessage.warning({
                    message: '两次输入密码不一致!',
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
                email: regForm.email,
                nickName: regForm.nickname,
                password: regForm.password,
            });
            console.log(data);
            if (data.code) {
                // 设置全局状态
                store.commit('setUserInfo', data);
                store.commit('setUserStatus',true);
                // 将token存在本地
                setToken(data.data.token);
                isLogin.value = true;
                userNickname.value = store.state.userInfo.data.user.nickname;
                // avatarUrl.value = store.state.userInfo.data.user.userAvatar || '';
                dialogFormVisible.value = false;
                ElMessage.success({
                    message: data.msg,
                    type: 'success'
                });
                return;
            }
            ElMessage.error(data.msg);
        }

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
                // isLogin.value = true;
            }
            console.log('设置完毕');
            console.log(store.state);
            console.log(store.state.userInfo);
        })
        return {
            goToHome,
            logout,
            isLogin,
            avatarUrl,
            userNickname,
            dialogFormVisible,
            dialogRegFormVisible,
            form,
            regForm,
            submitForm,
            registerForm
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
      background-image: url(../../public/img/title04.png);
      background-size: 100%;
      background-repeat: no-repeat;
      cursor: pointer;
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
</style>