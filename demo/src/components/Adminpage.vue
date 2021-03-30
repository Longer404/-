<template>
    <el-tabs tab-position="left" style="height: 200px;" class="admin-main-box">
        <el-tab-pane label="用户管理">
            <div>
                用户管理
            </div>
            <el-button type="primary" @click="getUserList">测试接口</el-button>
            <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
            >
            <template #append>
                <el-button icon="el-icon-search"></el-button>
            </template>
            </el-input>
            <el-table :data="tableData" border style="width: 100%" stripe>
                <el-table-column fixed prop="date" label="创建日期" width="150">
                </el-table-column>
                <el-table-column prop="name" label="用户ID" width="120">
                </el-table-column>
                <el-table-column prop="province" label="用户昵称" width="120">
                </el-table-column>
                <el-table-column prop="city" label="用户角色" width="120">
                </el-table-column>
                <el-table-column prop="address" label="绑定邮箱" width="400">
                </el-table-column> -->
                <!-- <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">提权</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
        <el-tab-pane label="审核投稿">审核投稿</el-tab-pane>
        <el-tab-pane label="投稿管理">投稿管理</el-tab-pane>
    </el-tabs>
    <!-- </div> -->
    <!-- <div>
        admin page
    </div> -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
    // methods: {
    //   handleClick(row) {
    //     console.log(row);
    //   }
    // },

    // data() {
    //   return {
    //     tableData: [{
    //       date: '2016-05-02',
    //       name: '王小虎',
    //       province: '上海',
    //       city: '普陀区',
    //       address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1517 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1519 弄',
        //   zip: 200333
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1516 弄',
        //   zip: 200333
        // }]
    //   }
    // },
    setup() {
        const input3 = ref('');

        const getUserList = async () => {
            const type = 'createAt';
            let res = await axios.get(`/user/list/${type}`);
            console.log('------------------');
            console.log('get user list');
            console.log(res);
            console.log('------------------');
            // 将请求返回的文章数组赋值给articles
            // articles.value = res.data.data.list;
            // 将请求返回的文章总数赋值给total
            // total.value = res.data.data.total;
        }

        const tableData = [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
        //   zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
        //   zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
        //   zip: 200333
        }];
        const handleClick = (row) => {
            console.log(row);
        };
        return {
            input3,
            tableData,
            handleClick,
            getUserList
        }
    },
})
</script>

<style>
.admin-main-box {
    height: 100% !important;
    min-width: 1000px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>