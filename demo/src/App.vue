<template>
  
    <div class="app-home">
      <Header/>
      <!-- <div class="app-header">
          <div class="left-header">
            <router-link to="/">
                bishe
            </router-link>
          </div>
          <div v-if="isLogin" class="right-header"> -->
            <!-- <div v-if="$store.state.userStatus || false" class="rightdiv"> -->
              <!-- <el-dropdown> -->
                <!-- <span class="el-dropdown-link"> -->
                  <!-- <img v-if="$store.state.userInfo.data.data.userAvatar.length || false" class="user-avatar" :src="$store.state.userInfo.data.data.userAvatar"> -->
                  <!-- <img class="user-avatar" :src="avatarUrl"> -->
                  <!-- <img v-else class="user-avatar" src="./assets/avatar.png"> -->
                  
                  <!-- <img class="user-avatar" :src="$store.state.userInfo.data.data.userAvatar || avatarUrl"> -->
                  <!-- <img class="user-avatar" src="./assets/avatar.png"> -->
                  <!-- <i class=" el-icon--right"></i> -->
                <!-- </span> -->
                  <!-- <h1>{{isLogin}}</h1> -->
                  <!-- <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item>
                        <router-link to="/account">
                            个人中心
                        </router-link>
                    </el-dropdown-item> -->
                    <!-- <el-dropdown-item>狮子头</el-dropdown-item> -->
                    <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item> -->
                    <!-- <el-dropdown-item >双皮奶</el-dropdown-item> -->
                    <!-- <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
              </el-dropdown>
              <el-button size="small"  type="danger">
                <router-link to="/form">
                    发表文章
                </router-link>
              </el-button> -->
            <!-- <el-button type="primary" size="small">登录</el-button> -->
          <!-- </div> -->
          <!-- <div v-else class="right-header"> -->
        <!-- <div v-show="isLogin" class="rightdiv"> -->
            <!-- <el-button size="small"  type="danger">
                <router-link to="/form">
                    发表文章
                </router-link>
            </el-button> -->
            <!-- <h1>{{isLogin}}</h1> -->
            <!-- <el-button size="small"  type="primary">
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
      </div> -->
      <router-view></router-view>
      <Footer/>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
// import View from './components/View.vue'
// import Index from './components/Index.vue'
// import tinymce from './components/Tiny.vue'
// import axios from 'axios';
// import Form from './components/Form.vue'
// import Login from './components/Login.vue'
// import Register from './components/Register.vue'
// import { defineComponent, onMounted, ref, watch } from 'vue'
import { defineComponent } from 'vue'
// import store from './store'
// import { getToken, setToken } from './helpers/token'
// import { useRouter } from 'vue-router'
// import { setToken } from '../helpers/token'

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    // Home
    // Index
    Header,
    Footer,
    // View
    // Form
    // tinymce
    // Login,
    // Register
  },
  setup() {
    // const isLogin = ref(false);
    // const avatarUrl = ref('./assets/avatar.png');

    // const router = useRouter();

    // const logout = () => {
    //     setToken('');
    //     window.location.href = '/';
    // };
    // watch(store.state.userStatus , () => {
    //   console.log('-------------- watch -------------' + new Date().getTime());
      // await store.dispatch('getUserInfo');
      
      // isLogin.value = store.state.userStatus || false;
      // console.log(store.state.userStatus + 'watch');
      // avatarUrl.value = store.state.userInfo.data.data.userAvatar || '';
    // })

    // const goToLogin = async () => {
    //   console.log(new Date().getTime() + 'beforelogin');
    //   await router.push('/login');
    //   console.log(new Date().getTime() + 'afterlogin');
    //   console.log(store.state.userStatus);
    //   console.log(store.state.userInfo.data.data.userAvatar);
    // }

    // onMounted(async () => {
    //   if(getToken() !== '') {
    //     console.log('本地已登录')
        // console.log(store.state.userInfo.data)
        // console.log(1)
        // console.log('onMounted 1' + new Date().getTime());
        // await store.dispatch('getUserInfo');
        // console.log('onMounted 2' + new Date().getTime());
        // store.commit('setUserStatus', false);
        // const userInfo = await store.dispatch('getUserInfo');

        // if (userInfo) {
        //     isLogin.value = true;
        //     console.log(userInfo);
        //     avatarUrl.value = userInfo.data.data.userAvatar;
        //     console.log(avatarUrl);
        // }
        // store.dispatch('getUserInfo');
        // store.commit('setUserStatus', true);
        // isLogin.value = store.state.userStatus;
        // avatarUrl.value = store.state.userInfo.data.data.userAvatar
        // isLogin.value = true;
      // } else {
          // console.log(3)
          // console.log(!store.state.userInfo.data)
          // console.log('本地不存在登录信息');
          // store.dispatch('getUserInfo');
          // store.commit('setUserStatus', false);
      // }
    // })
    // return {
    //   isLogin,
    //   avatarUrl,
    //   logout,
    //   // goToLogin
    // }
  }

})
</script>

<style>
  /* html,body {
    height: 100%;
  } */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 64px;
} */
  a {
      text-decoration: none;/* 去掉下划线 */
      color: inherit;
  }
  #app {
    height: 100%;
    /* display: flex; */
    /* flex-flow: column; */
    /* align-content: flex-end; */
    /* justify-content: space-between; */
  }
  .app-home {
    height: 100%;
    display: flex;
    flex-flow: column;
    /* align-content: flex-end; */
    justify-content: space-between;
  }
  /* .app-header {
    background-color: #79BBFF;
    min-height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 1000px;
    width: 100%;
  }
  .left-header {
    padding-left: 16px;
  }
  .right-header {
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
  } */
</style>
