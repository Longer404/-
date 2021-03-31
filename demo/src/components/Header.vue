<template>
    <div class="testheader">
        <div class="leftdiv">
            <router-link to="/">
                bishe
            </router-link>
        </div>
        
        <div v-if="isLogin" class="rightdiv">
        <!-- <div v-if="$store.state.userStatus" class="rightdiv"> -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    <!-- <img v-if="$store.state.userStatus" class="user-avatar" :src="$store.state.userInfo.data.data.userAvatar"> -->
                    <img v-if="avatarUrl" class="user-avatar" :src="avatarUrl">
                    <img v-else class="user-avatar" src="../assets/avatar.png">
                    <!-- <img class="user-avatar" :src="$store.state.userInfo.data.data.userAvatar"> -->
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
                    <!-- <el-dropdown-item>狮子头</el-dropdown-item> -->
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
            <el-button size="small"  type="primary">
                <router-link to="/login">
                    登录
                </router-link>
            </el-button>
            <el-button size="small"  type="primary">
                <router-link to="/register">
                    注册
                </router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
// import { defineComponent, onMounted } from 'vue'
// import store from '../store'
import { setToken } from '../helpers/token'
import store from '../store'
import { getToken } from '../helpers/token'

export default defineComponent({
    // props: {
    //     isLogin: store.state.userStatus
    // },
    setup() {
        const isLogin = ref(false);
        const avatarUrl = ref('');
        // const isLogin = ref(true)
        // onMounted( async () => {
        //     // console.log(store.state.userInfo.data)
        //     console.log('挂载头部')
        //     isLogin.value = await store.state.userStatus
        //     if(store.state.userStatus) {
        //         console.log(store.state.userStatus)
        //         isLogin.value = true
        //         console.log(1.1)
        //     } else {
        //         console.log(store.state.userStatus)
        //         isLogin.value = false
        //         console.log(2.2)
        //     }
        // });
        // return {
        //     isLogin
        // }
        const logout = () => {
            setToken('');
            window.location.href = '/';
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
            logout,
            isLogin,
            avatarUrl,
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
  }
  .leftdiv {
      padding-left: 16px;
  }
  .rightdiv {
      padding-right: 16px;
      height: 50px;
      display: flex;
        align-items: center;
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