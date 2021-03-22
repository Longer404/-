<template>
  <div class="main-user-box">
    <div class="user-center">
        <el-tabs type="border-card">
            <!-- <el-tab-pane>
                <template #label>
                <span><i class="el-icon-date"></i> 我的行程</span>
                </template>
                我的行程
            </el-tab-pane> -->
            <el-tab-pane label="用户信息">
                用户信息
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="出生日期">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <!-- <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col> -->
                    </el-form-item>
                    
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="个性签名">
                        <el-input type="textarea" resize="none" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="投稿管理">
              投稿管理
              <div class="card-manage">
                <div class="card-case">
                  <div class="card-img">

                  </div>
                  <div class="card-info">
                    <div class="card-info-title">
                      标题
                    </div>
                    <div class="card-info-date">
                      创作日期
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary">编辑</el-button>
                      <el-button type="danger">删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收藏夹">收藏夹</el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

    data() {
      return {
        form: {
          name: '',
        //   region: '',
          date1: '',
        //   date2: '',
        //   delivery: false,
        //   type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },

    setup() {
        // const form = reactive({
        //     name: '',
        //     // region: '',
        //     date1: '',
        //     // date2: '',
        //     // delivery: false,
        //     // type: [],
        //     resource: '',
        //     desc: ''
        // });

        // const onSubmit = () => {
        //     console.log('submit!');
        // };

        // return {
        //     form,
        //     onSubmit
        // }
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
.card-manage {
    display: flex;
    justify-content: center;
}
.card-case {
    height: 120px;
    width: 500px;
    padding: 20px;
    box-shadow: gray 2px 2px 5px;
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
    font-size: 16px;
    font-weight: 200;
}
.card-info-handle {
    text-align: right;
}
</style>