<template>
  <!-- <div class="container"> -->
  <!-- Content here -->
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <!-- <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 毕设</li>
          <li class="list-inline-item">文章</li>
          <li class="list-inline-item">图片</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer> -->
      <footer class="py-4 text-secondary bg-light ">
        <small>
          <div class="row">
            <div class="col-sm">
            
              <div class="container">
                <div class="row row-cols-2">
                  <span class="text-left span-title">
                    © 2021 毕设
                  </span>
                  <div class="col"></div>
                  <div class="col">关于我们</div>
                  <div class="col">友情链接</div>
                  <div class="col">联系我们</div>
                  <div class="col">隐私政策</div>
                  <div class="col">用户协议</div>
                  <div class="col">毕设认证</div>
                  <div class="col">加入我们</div>
                  <div class="col">Investor Relations</div>
                </div>
              </div>
            <!-- </small> -->
            </div>
            <div class="col-sm">
            <!-- <small> -->
              <div class="container">
                <div class="row row-cols-2">
                  <span class="text-left span-title">
                    传说门
                  </span>
                  <div class="col"></div>
                  <div class="col">活动中心</div>
                  <div class="col">名人堂</div>
                  <div class="col">壁纸站</div>
                  <div class="col">广告合作</div>
                  <div class="col">活动专题页</div>
                  <div class="col">帮助中心</div>
                  <div class="col">管理中心</div>
                  <div class="col">协议汇总</div>
                </div>
              </div>
            <!-- </small> -->
            </div>
              
            <div class="col-sm">
              <img src="./assets/logo.png" alt="施工中" height="155"/>
            </div>
          </div>
        </small>
      </footer>
    <!-- <column-list :list="list"></column-list> -->
    <!-- <validate-form>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"></validate-input>
      </div> -->
      <!-- <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
         <input
          type="text" class="form-control" id="exampleInputEmail1"
          v-model="emailRef.val"
          @blur="validateEmail"
        >
        <div class="form-text" v-if="emailRef.error">{{emailRef.message}}</div>
      </div> -->
      <!-- <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal"></validate-input>
      </div>
    </validate-form> -->
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList , { ColumnProps }  from './components/ColumnList.vue'
import GlobalHeader from './components/GlobalHeader.vue'
// import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
// import ValidateForm from './components/ValidateForm.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    // ValidateInput,
    // ValidateForm
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user)

    return {
      // list: testData,
      currentUser,

    }
  }
});
</script>

<style>
#app {
  min-width: 1000px;
}
.col {
  margin-bottom: 10px;
}
.span-title {
  margin-bottom: 10px;
}
.p-fix {
  bottom: 0;
}
body {
  height: 100%;
}
.mt-6 {
  margin-top: -40px;
}
#app {
  height: 100%;
}

</style>
