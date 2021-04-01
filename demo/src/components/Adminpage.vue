<template>
    <el-tabs v-model="activeName" @tab-click="handleClickinTab" tab-position="left" style="height: 200px;" class="admin-main-box">
        <el-tab-pane label="用户管理" name="first">
            <div style="margin-bottom:20px;margin-top:20px">
                用户管理
            </div>
            <!-- <el-button type="primary" @click="getUserList">测试接口</el-button>
            <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
            >
            <template #append>
                <el-button icon="el-icon-search"></el-button>
            </template>
            </el-input> -->
            <el-table 
                :data="tableDataOfUser"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}" 
                border 
                style="width: 100%" 
                stripe>
                <el-table-column fixed prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="用户ID" width="240" sortable>
                </el-table-column>
                <el-table-column prop="nickname" label="用户昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="character" label="用户角色" width="120">
                </el-table-column>
                <el-table-column prop="email" label="绑定邮箱" width="250">
                </el-table-column> -->
                <!-- <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="60">
                    <template #default="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                        <!-- <el-button type="text" size="small">编辑</el-button> -->
                        <el-button type="text" size="small" style="color:red;" @click="handleClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="setPage"
                    :total="total"
                    :current-page="curPageOfUser"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
        <el-tab-pane label="审核投稿" name="second">
            <div style="margin-bottom:20px;margin-top:20px">
                审核投稿
            </div>
            <el-table 
                :data="semifinishedArticles"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}" 
                border 
                style="width: 100%" 
                stripe>
                <el-table-column fixed prop="title" label="标题" width="120" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="文章ID" width="250">
                </el-table-column>
                <el-table-column prop="author" label="作者昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="authorId" label="作者ID" width="240" sortable>
                </el-table-column>
                <el-table-column prop="partition" label="分类" width="120" sortable>
                </el-table-column>
                <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="setPass(scope.row)" type="text" size="small">通过</el-button>
                        <el-button @click="setReject(scope.row)" type="text" size="small" style="color: red;">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="setPage"
                    :total="total"
                    :current-page="curPageOfSemifinishedArticles"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="投稿管理" name="third">
            <div style="margin-bottom:20px;margin-top:20px">
                投稿管理
            </div>
            <!-- <el-button type="primary" @click="getAllArtList">测试接口</el-button>
            <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
            >
            <template #append>
                <el-button icon="el-icon-search"></el-button>
            </template>
            </el-input> -->
            <el-table 
                :data="tableDataOfArticle"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}"  
                border 
                style="width: 100%" 
                stripe>
                <el-table-column fixed prop="title" label="标题" width="120" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="文章ID" width="250" sortable>
                </el-table-column>
                <el-table-column prop="author" label="作者昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="authorId" label="作者ID" width="240">
                </el-table-column>
                <el-table-column prop="partition" label="分类" width="120" sortable>
                </el-table-column>
                <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <el-table-column prop="about" label="摘要" width="240">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">驳回</el-button>
                        <el-button type="text" size="small" style="color:red;">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="setPage"
                    :total="total"
                    :current-page="curPageOfArticle"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>
    <!-- </div> -->
    <!-- <div>
        admin page
    </div> -->
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus';

export default defineComponent({
    
    setup() {
        const activeName = ref('first');
        const input3 = ref('');
        const tableDataOfUser = ref([]);
        const tableDataOfArticle = ref([]);
        const semifinishedArticles = ref([]);
        // 当前标签页
        const curTab = ref('0');
        // 用户页当前页码
        const curPageOfUser = ref(1);
        // 投稿页当前页码
        const curPageOfArticle = ref(1);
        // 审核页当前页码
        const curPageOfSemifinishedArticles = ref(1);
        // 数据总数
        const total = ref(1);

        const add0 = ( m ) => {
            return m < 10 ? '0' + m : m 
        }
        const format = (timeStamp) => {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(timeStamp);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        }

        const getLocalTime = (data) => {
            var lenth = 0;
            // console.log(lenth);
            for(;lenth < data.length;lenth++) {
                data[lenth].meta.createdAt = format(data[lenth].meta.createdAt);
            }
        }
        
        const getSemifinishedArticles = async () => {
            let res = await axios.get('/article/list/', {
                params: {
                    examined: 'examining',
                    page: curPageOfSemifinishedArticles.value,
                    size: 10
                }
            });
            console.log(res);
            semifinishedArticles.value = res.data.data.list;
            getLocalTime(semifinishedArticles.value);
            total.value = res.data.data.list.length;
        }

        const getAllArtList = async () => {
            const type = 'createAt';
            let res = await axios.get(`/article/table/${type}`, {
                params: {
                    page: curPageOfArticle.value
                }
            });
            console.log('------------------');
            console.log('get all article list');
            console.log(res);
            console.log('------------------');
            tableDataOfArticle.value = res.data.data.list;
            // console.log(format(res.data.data.list[0].meta.createdAt));
            getLocalTime(tableDataOfArticle.value);
            // console.log(tableData);
            // 将请求返回的文章数组赋值给articles
            // articles.value = res.data.data.list;
            // 将请求返回的文章总数赋值给total
            total.value = res.data.data.total;
        }

        const getUserList = async () => {
            const type = 'createAt';
            let res = await axios.get(`/user/table/${type}`, {
                params: {
                    page: curPageOfUser.value
                }
            });
            console.log('------------------');
            console.log('get user list');
            console.log(res);
            console.log('------------------');
            // console.log(res.data.data.list[0].email);
            // console.log(res.data.data.list[0].nickname);
            // console.log(res.data.data.list[0].meta.createdAt);
            // console.log(res.data.data.list[0]._id);
            tableDataOfUser.value = res.data.data.list;
            // console.log(format(res.data.data.list[0].meta.createdAt));
            getLocalTime(tableDataOfUser.value);
            // console.log(tableData);
            // 将请求返回的文章数组赋值给articles
            // articles.value = res.data.data.list;
            // 将请求返回的文章总数赋值给total
            total.value = res.data.data.total;
        }

        const handleClickinTab = (tab) => {
            // console.log(tab);
            // console.log(tab.index);
            // console.log(typeof(tab.index));
            if (tab.index === "0") {
                curTab.value = '0';
                getUserList();
            } else if (tab.index === "1") {
                curTab.value = '1';
                // console.log(tab);
                getSemifinishedArticles();
            } else if (tab.index === "2") {
                curTab.value = '2';
                getAllArtList();
            }
            
        }
        // 当页码改变时执行setPage函数，将改变后的页码赋值给curpage
        const setPage = (page) => {
            // 将改变后的页码赋值给curpage
            
            if (curTab.value === '0'){
                curPageOfUser.value = page;
                getUserList();
            } else if (curTab.value === '1'){
                // console.log(1);
                curPageOfSemifinishedArticles.value = page;
                getSemifinishedArticles();
            } else if (curTab.value === '2'){
                curPageOfArticle.value = page;
                getAllArtList();
            }
                
        }
        
        const getArticleDetail = async (row) => {
            console.log(row._id);
            const res = await axios.get(`/article/${row._id}`);
            console.log(res);
            // console.log(MessageBox);
            ElMessageBox.alert(res.data.data.content, 'HTML 片段', {
                dangerouslyUseHTMLString: true
            });
            // console.log(articles)
            
            // router.push(`/article/${id}`)
        }

        const setPass = async (row) => {
            
            console.log(row._id);
            let res = await axios.get(`/article/examination/${row._id}`, {
                params: {
                    examined: 'pass',
                }
            });
            console.log(res.data.code);
            if (res.data.code) {
                ElMessage.success(res.data.msg);
            } else {
                ElMessage.error(res.data.msg);
            }
            getSemifinishedArticles();
        }

        const setReject = async (row) => {
            
            console.log(row._id);
            let res = await axios.get(`/article/examination/${row._id}`, {
                params: {
                    examined: 'reject',
                }
            });
            console.log(res.data.code);
            if (res.data.code) {
                ElMessage.success(res.data.msg);
            } else {
                ElMessage.error(res.data.msg);
            }
            getSemifinishedArticles();
        }

        const handleClick = (row) => {
            console.log(row);
        };

        onMounted(() => {
            getUserList();
            // getAllArtList();
        })

        return {
            activeName,
            curTab,
            curPageOfUser,
            curPageOfArticle,
            curPageOfSemifinishedArticles,
            semifinishedArticles,
            total,
            setPage,
            input3,
            tableDataOfUser,
            tableDataOfArticle,
            handleClickinTab,
            handleClick,
            setPass,
            setReject,
            getArticleDetail,
            getUserList,
            getAllArtList,
            getSemifinishedArticles,
            format
        }
    },
})
</script>

<style>
.admin-main-box {
    height: 100% !important;
    min-width: 1000px;
    max-width: 1256px;
    min-height: 780px;
}
/* .el-table__content {
    min-width: 1000px;
    max-width: 1145px;
} */
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.page-box {
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: right;
}
.el-message-box {
    width: 800px;
}
.el-message-box img {
    max-width: 700px;
    height: auto;
}
</style>