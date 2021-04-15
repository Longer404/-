<template >
<div>
    <el-row class="tac">
        <el-col :span="4" style="border-right-style: solid;border-right-width: 0.5px;border-right-color: #e3e3e3;min-height:711px">
            <el-menu 
                :default-active="activeIndex"
                mode="vertical"
                @select="handleSelect"
                

                >
                <el-menu-item index="1">
                    <template #title>
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                <!-- <el-tab-pane label="用户管理" name="first"> -->
                    <!-- <div style="margin-bottom:20px;margin-top:20px"> -->
                        <!-- 用户管理 -->
                    <!-- </div> -->
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
                    
                </el-menu-item>
                <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
                <el-submenu index="2">
                    <template #title>
                        <i class="el-icon-location"></i>
                        <span style="font-size: 15px" >内容管理</span>
                    </template>
                <!-- <el-tab-pane label="审核投稿" name="second"> -->
                    <!-- <div style="margin-bottom:20px;margin-top:20px"> -->
                        <!-- 审核投稿 -->
                    <!-- </div> -->
                    <el-menu-item index="2-1">审核投稿
                    <!-- <el-table 
                        :data="semifinishedArticles"
                        :default-sort = "{prop: 'meta.createdAt', order: 'descending'}" 
                        border 
                        style="width: 100%" 
                        stripe>
                        <el-table-column fixed prop="title" label="标题" width="240" sortable>
                        </el-table-column>
                        <el-table-column prop="_id" label="文章ID" width="220">
                        </el-table-column>
                        <el-table-column prop="author" label="作者昵称" width="120" sortable>
                        </el-table-column>
                        <el-table-column prop="authorId" label="作者ID" width="220" sortable>
                        </el-table-column>
                        <el-table-column prop="partition" label="分类" width="120" sortable>
                        </el-table-column>
                        <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="240">
                            <template #default="scope">
                                <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button>
                                <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button>
                                <el-button @click="setPass(scope.row)" type="text" size="small">通过</el-button>
                                <el-button @click="setReject(scope.row)" type="text" size="small" style="color: red;">驳回</el-button>
                                <el-dialog title="驳回原因" :lock-scroll="false" v-model="dialogFormVisible">
                                    <el-form :model="form">
                                        <el-form-item prop="message" >
                                            <el-input 
                                                v-model="form.message" 
                                                resize="none"
                                                :rows="5"
                                                type="textarea" 
                                                autocomplete="off" 
                                                placeholder="请输入驳回原因">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                    <template #footer>
                                        <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="sendRejectMessage">发 送</el-button>
                                        <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button>
                                        </span>
                                    </template>
                                </el-dialog>
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
                    </div> -->
                    </el-menu-item>
                
                <!-- <el-tab-pane label="投稿管理" name="third"> -->
                    <!-- <div style="margin-bottom:20px;margin-top:20px"> -->
                        <!-- 投稿管理 -->
                    <!-- </div> -->
                    <el-menu-item index="2-2">投稿管理
                    <!-- <el-table 
                        :data="tableDataOfArticle"
                        :default-sort = "{prop: 'meta.createdAt', order: 'descending'}"  
                        border 
                        style="width: 100%" 
                        stripe>
                        <el-table-column fixed prop="title" label="标题" width="240" sortable>
                        </el-table-column>
                        <el-table-column prop="_id" label="文章ID" width="220" sortable>
                        </el-table-column>
                        <el-table-column prop="author" label="作者昵称" width="120" sortable>
                        </el-table-column>
                        <el-table-column prop="authorId" label="作者ID" width="220">
                        </el-table-column>
                        <el-table-column prop="partition" label="分类" width="120" sortable>
                        </el-table-column>
                        <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                        </el-table-column>
                        <el-table-column prop="about" label="摘要" width="480">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="240">
                            <template #default="scope">
                                <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button>
                                <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button>
                                <el-button @click="getArticleComment(scope.row)" type="text" size="small">查看评论区</el-button>
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
                    </div> -->
                    </el-menu-item>

                <!-- <el-tab-pane label="评论管理" name="forth"> -->
                    <!-- <div style="margin-bottom:20px;margin-top:20px"> -->
                        <!-- 评论管理 -->
                    <!-- </div> -->
                    <el-menu-item index="2-3">评论管理
                    <!-- <el-table 
                        :data="commentTable"
                        :default-sort = "{prop: 'meta.createdAt', order: 'descending'}"  
                        border 
                        style="width: 100%" 
                        stripe>
                        <el-table-column fixed prop="title" label="标题" width="240" sortable>
                        </el-table-column>
                        <el-table-column prop="commentFrom" label="评论资讯标题" width="240" sortable>
                        </el-table-column>
                        
                        <el-table-column prop="commentator" label="评论者" width="120" sortable>
                        </el-table-column>
                        <el-table-column prop="content" label="评论内容" width="240">
                        </el-table-column>
                        <el-table-column prop="createAt" label="创建日期" width="160" sortable>
                        </el-table-column>
                        <el-table-column prop="commentatorId" label="评论者ID" width="220" sortable>
                        </el-table-column>
                        <el-table-column prop="_id" label="评论ID" width="220" sortable>
                        </el-table-column>
                        <el-table-column prop="commentTo" label="评论资讯ID" width="220" sortable>
                        </el-table-column>
                        
                        <el-table-column prop="about" label="摘要" width="480">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="160">
                            <template #default="scope">
                                <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button>
                                <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button>
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
                            :current-page="curPageOfComment"
                            :page-size="10"
                            >
                        </el-pagination>
                    </div> -->
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>


        <el-col :span="20">
        <div v-show="showUserTable">
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
                <el-table-column prop="nickname" label="用户昵称" width="160" sortable>
                </el-table-column>
                <el-table-column prop="character" label="用户角色" width="220">
                </el-table-column>
                <el-table-column prop="phone" label="绑定手机号" width="240">
                </el-table-column> -->
                <!-- <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                        <el-button type="text" size="small" @click="getUserComment(scope.row)">查看用户评论</el-button>
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
        </div>
        <div v-show="showArticleTable">
            <el-table 
                
                :data="tableDataOfArticle"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}"  
                border 
                style="width: 100%" 
                stripe>
                <el-table-column fixed prop="title" label="标题" width="240" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="文章ID" width="220" sortable>
                </el-table-column>
                <el-table-column prop="author" label="作者昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="authorId" label="作者ID" width="220">
                </el-table-column>
                <el-table-column prop="partition" label="分类" width="120" sortable>
                </el-table-column>
                <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <!-- <el-table-column prop="about" label="摘要" width="480">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="240">
                    <template #default="scope">
                        <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button>
                        <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button>
                        <el-button @click="getArticleComment(scope.row)" type="text" size="small">查看评论区</el-button>
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
        </div>
        <div v-show="showSemifinishedArticles">
            <el-table 
                
                :data="semifinishedArticles"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}" 
                border 
                style="width: 100%" 
                stripe>
                <el-table-column fixed prop="title" label="标题" width="240" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="文章ID" width="220">
                </el-table-column>
                <el-table-column prop="author" label="作者昵称" width="120" sortable>
                </el-table-column>
                <el-table-column prop="authorId" label="作者ID" width="220" sortable>
                </el-table-column>
                <el-table-column prop="partition" label="分类" width="120" sortable>
                </el-table-column>
                <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="240">
                    <template #default="scope">
                        <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button>
                        <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button>
                        <el-button @click="setPass(scope.row)" type="text" size="small">通过</el-button>
                        <el-button @click="setReject(scope.row)" type="text" size="small" style="color: red;">驳回</el-button>
                        <el-dialog title="驳回原因" :lock-scroll="false" v-model="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item prop="message" >
                                    <el-input 
                                        v-model="form.message" 
                                        resize="none"
                                        :rows="5"
                                        type="textarea" 
                                        autocomplete="off" 
                                        placeholder="请输入驳回原因">
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="sendRejectMessage">发 送</el-button>
                                <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button>
                                </span>
                            </template>
                        </el-dialog>
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
            
        </div>
        <div v-show="showCommentTable">
            <el-table 
                
                :data="commentTable"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}"  
                border 
                style="width: 100%" 
                stripe>
                <!-- <el-table-column fixed prop="title" label="标题" width="240" sortable>
                </el-table-column> -->
                <el-table-column prop="commentFrom" label="评论资讯标题" width="240" sortable>
                </el-table-column>
                
                <el-table-column prop="commentator" label="评论者" width="120" sortable>
                </el-table-column>
                <el-table-column prop="content" label="评论内容" width="240">
                </el-table-column>
                <el-table-column prop="createAt" label="创建日期" width="160" sortable>
                </el-table-column>
                <el-table-column prop="commentatorId" label="评论者ID" width="220" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="评论ID" width="220" sortable>
                </el-table-column>
                <el-table-column prop="commentTo" label="评论资讯ID" width="220" sortable>
                </el-table-column>
                
                <!-- <el-table-column prop="about" label="摘要" width="480">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <el-button @click="getArticleDetail(scope.row)" type="text" size="small">查看</el-button>
                        <!-- <el-button @click="getArticleCover(scope.row)" type="text" size="small">查看封面</el-button> -->
                        <!-- <el-button @click="getArticleAbout(scope.row)" type="text" size="small">查看摘要</el-button> -->
                        <!-- <el-button type="text" size="small">驳回</el-button> -->
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
                    :current-page="curPageOfComment"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
// import { ref } from 'vue'
// import img1 from '../../public/img/01.png'
// import img2 from '../../public/img/02.png'
// import img3 from '../../public/img/03.png'
// import img4 from '../../public/img/04.png'
// import { getToken } from '../helpers/token'
import { defineComponent, onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus';

export default defineComponent({
    data() {
        // return {
        //     dialogImageUrl: '',
        //     dialogVisible: false,
        //     isMax : false,
        //     header: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
            // bannerH: 450,
            // imgArr:[
            //     {url: require('../../public/img/01.png')},
            //     {url: require('../../public/img/02.png')},
            //     {url: require('../../public/img/03.png')},
            //     {url: require('../../public/img/04.png')},
            // ],
            // imgArr:[
            //     {url: img1},
            //     {url: img2},
            //     {url: img3},
            //     {url: img4},
            // ],
            // img01: img1
        // }
    },
//     computed: {
//     headers() {
//       return {
//         Authorization: "Bearer " + getToken(),
//         "Content-Type": "application/json;charset=UTF-8"
//       };
//     }
//   },
    // methods: {
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //     this.isMax = false;
    //   },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    //     const test = "Bearer " + getToken()
    //     console.log(test)
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg' || 'image/png';
    //     const isLt2M = file.size / 1024 / 1024 < 3;

    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 3MB!');
    //     }
    //     return isJPG && isLt2M;
    //   },
    //   change(){
    //       console.log('change')
    //     this.isMax = true
    //   },
    //   handle_success(res) {
    //       console.log(res)
    //   },
    //   getHeader() {
    //       return {
    //         Authorization: `Bearer ${getToken()}`
    //       }
    //   },
    // },
    // mounted() {
    //   window.addEventListener('resize', () => {
    //     this.setBannerH()
    //     console.log(this.imgArr.url)
    //     console.log(1)
    //   }, false);
    // },
    // methods:{
    //   //设置走马灯高度
    //   onclick() {
    //       console.log(this.imgArr[0])
    //   },
    //   setBannerH() {
    //       this.bannerH = document.body.clientWidth / 4
    //   },
    // },
    setup() {
        const activeIndex = ref('1');
        const showUserTable = ref(true);
        const showArticleTable = ref(false);
        const showSemifinishedArticles = ref(false);
        const showCommentTable = ref(false);
        const activeName = ref('first');
        const input3 = ref('');
        const tableDataOfUser = ref([]);
        const tableDataOfArticle = ref([]);
        const semifinishedArticles = ref([]);
        const commentTable = ref([]);
        const dialogFormVisible = ref(false);
        const currentId = ref('');
        const currentAuthorId = ref('');
        const form = reactive({
            message: '',
        });
        // 当前标签页
        const curTab = ref('0');
        const curPage = ref(1);
        // 用户页当前页码
        const curPageOfUser = ref(1);
        // 投稿页当前页码
        const curPageOfArticle = ref(1);
        // 审核页当前页码
        const curPageOfSemifinishedArticles = ref(1);
        // 消息页当前页码
        const curPageOfComment = ref(1);
        // 数据总数
        const total = ref(1);

        const setShowFalse = () => {
            showUserTable.value = false;
            showSemifinishedArticles.value = false;
            showArticleTable.value = false;
            showCommentTable.value = false;
        }

        const handleSelect = (index) => {
            console.log(index);
            // curindex.value = index;
            // console.log(curindex);
            if (index === '1') {
                setShowFalse();
                showUserTable.value = true;
                getUserList();
                // showArticleTable.value = false;
            } else if (index === '2-1') {
                setShowFalse();
                showSemifinishedArticles.value = true;
                // showUserTable.value = false;
                getSemifinishedArticles();
            } else if (index === '2-2') {
                setShowFalse();
                
                showArticleTable.value = true;
                getAllArtList();
                // showUserTable.value = false;
               
            } else if (index === '2-3') {
                setShowFalse();
                showCommentTable.value = true;
                // showUserTable.value = false;
                getCommentTable();
            }
        }

        const add0 = ( m ) => {
            return m < 10 ? '0' + m : m 
        }
        const format = (timeStamp) => {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(timeStamp);
            console.log(typeof(time));
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
        
        const getCommentLocalTime = (data) => {
            var lenth = 0;
            // console.log(lenth);
            for(;lenth < data.length;lenth++) {
                data[lenth].createAt = format(data[lenth].createAt);
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

        const getCommentTable = async () => {
            let res = await axios.get('/comment/table', {
                params: {
                    page: curPageOfComment.value
                }
            });
            console.log(res);
            commentTable.value = res.data.data.list;
            getCommentLocalTime(commentTable.value);
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
            } else if (tab.index === '3') {
                curTab.value = '3';
                getCommentTable();
                // curPageOfComment.value = page;
            }
            
        }
        // 当页码改变时执行setPage函数，将改变后的页码赋值给curpage
        const setPage = (page) => {
            // 将改变后的页码赋值给curpage
            
            if (showUserTable.value){
                curPageOfUser.value = page;
                getUserList();
            } else if (showSemifinishedArticles.value){
                // console.log(1);
                curPageOfSemifinishedArticles.value = page;
                getSemifinishedArticles();
            } else if (showArticleTable.value){
                curPageOfArticle.value = page;
                getAllArtList();
            } else if (showCommentTable.value) {
                curPageOfComment.value = page;
                getCommentTable();
                
            }
                
        }
        
        const getArticleDetail = async (row) => {
            console.log(row._id);
            const res = await axios.get(`/article/${row._id}`);
            console.log(res);
            // console.log(MessageBox);
            ElMessageBox.alert(res.data.data.content, '资讯正文', {
                dangerouslyUseHTMLString: true
            });
            // console.log(articles)
            
            // router.push(`/article/${id}`)
        }

        const getArticleComment = async (row) => {
            
            console.log(row);
            // activeName.value = 'forth';
            activeIndex.value = '2-3';
            const res = await axios.get('/comment/list', {
                params: {
                    commentTo: row._id,
                }
            });
            console.log(res);
            commentTable.value = res.data.data;
            getCommentLocalTime(commentTable.value);
            setShowFalse();
            showCommentTable.value = true;
            total.value = 0;
        }

        const getUserComment = async (row) => {
            // console.log(row);
            // handleSelect('2-3');
            // activeName.value = 'forth';
            activeIndex.value = '2-3';
            const res = await axios.get('/comment/byUserId', {
                params: {
                    commentatorId: row._id,
                }
            });
            console.log(res);
            commentTable.value = res.data.data;
            getCommentLocalTime(commentTable.value);
            total.value = 0;
            setShowFalse();
            showCommentTable.value = true;
            // showUserTable.value = false;
            // getCommentTable();
        }

        const getArticleCover = async (row) => {
            console.log(row._id);
            const res = await axios.get(`/article/${row._id}`);
            console.log(res);
            // console.log(MessageBox);
            ElMessageBox.alert(`<img src=${res.data.data.coverUrl}>`, '资讯封面', {
                dangerouslyUseHTMLString: true
            });
            // console.log(articles)
            
            // router.push(`/article/${id}`)
        }

        const getArticleAbout = async (row) => {
            console.log(row._id);
            const res = await axios.get(`/article/${row._id}`);
            console.log(res);
            // console.log(MessageBox);
            ElMessageBox.alert(res.data.data.about, '资讯摘要', {
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
            currentId.value = row._id;
            currentAuthorId.value = row.authorId;
            dialogFormVisible.value = true;
            // let res = await axios.get(`/article/examination/${row._id}`, {
            //     params: {
            //         examined: 'reject',
            //     }
            // });
            // console.log(res.data.code);
            // if (res.data.code) {
            //     ElMessage.success(res.data.msg);
            // } else {
            //     ElMessage.error(res.data.msg);
            // }
            // getSemifinishedArticles();
        }
        const sendRejectMessage = async () => {
            const messageDetail = {
                messageTo: currentAuthorId.value,
                messageFrom: currentId.value,
                content: form.message,
            };
            if (form.message === '') {
                ElMessage.warning('请填写内容');
                return;
            }
            const { data } = await axios.post(
                '/message/post', 
                {
                    essay: messageDetail
                }
            );
            console.log(data);
            let res = await axios.get(`/article/examination/${currentId.value}`, {
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
            dialogFormVisible.value = false;
        }

        const handleClick = (row) => {
            console.log(row);
        };

        onMounted(() => {
            getUserList();
            // getAllArtList();
        })
            
        
        // const testclick = () => {
        //     console.log(1)
        // };
        // const seen1 = ref(false);
        // const onMouseOver1 = () => {
        //     seen1.value=true
        // };
        // const onMouseOut1 = () => {
        //     seen1.value=false
        // };
        // const seen2 = ref(false);
        // const onMouseOver2 = () => {
        //     seen2.value=true
        // };
        // const onMouseOut2 = () => {
        //     seen2.value=false
        // };
        // const seen3 = ref(false);
        // const onMouseOver3 = () => {
        //     seen3.value=true
        // };
        // const onMouseOut3 = () => {
        //     seen3.value=false
        // };
        // const flag = ref(false)
        // const fatherbutton = () => {
        //     console.log(0)
        // }
        // const firstbutton = () => {
        //     console.log(1)
            
        // }
        // const secondbutton = () => {
        //     console.log(2)
        // }
        // const thirdbutton = () => {
        //     console.log(3)
        // }
        // const afterchange = () => {
        //     flag.value = false
        // }
        // const sthchange = () => {
        //     flag.value = true
        // }
        // const changeColor = (flag) => {
        //     if (flag) {
        //         return {
        //             backgroundColor : 'green',
        //             cursor: 'pointer',
        //         }
                
        //     } else {
        //         return {
        //             backgroundColor : 'red',
        //             cursor: 'default',
        //         }
        //     }
        // }
        return {
            handleSelect,
            activeIndex,
            showUserTable,
            showArticleTable,
            showSemifinishedArticles,
            showCommentTable,
            activeName,
            curTab,
            curPage,
            curPageOfUser,
            curPageOfArticle,
            curPageOfSemifinishedArticles,
            curPageOfComment,
            semifinishedArticles,
            total,
            setPage,
            input3,
            tableDataOfUser,
            tableDataOfArticle,
            commentTable,
            handleClickinTab,
            handleClick,
            setPass,
            setReject,
            getArticleDetail,
            getArticleCover,
            getArticleAbout,
            getArticleComment,
            getUserComment,
            getUserList,
            getAllArtList,
            getSemifinishedArticles,
            getCommentTable,
            format,
            dialogFormVisible,
            form,
            sendRejectMessage
            // testclick,
            // seen1,
            // onMouseOver1,
            // onMouseOut1,
            // seen2,
            // onMouseOver2,
            // onMouseOut2,
            // seen3,
            // onMouseOver3,
            // onMouseOut3,
            // flag,
            // sthchange,
            // afterchange,
            // changeColor,
            // firstbutton,
            // secondbutton,
            // thirdbutton,
            // fatherbutton
        }
    },
})
</script>

<style scoped>
  .el-menu {
    /* max-width: 1000px; */
    /* margin: 0 auto; */
    font-weight: 500;
  }
  .el-menu-item {
    /* font-size: 14px; */
    font-weight: 500;
  }
/* .el-submenu__title {
    font-size: 15px !important;
} */
.admin-main-box {
    /* height: 100% !important; */
    min-width: 1000px;
    /* max-width: 1256px; */
    min-height: 729px;
}
.el-tabs--left, .el-tabs--right {
    overflow: auto;
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
/* .disabled .el-upload--picture-card {
    display: none;
} */
/* .el-upload-list__item-actions {
    width: 78px;
    height: 78px;
    line-height: 48px;
    display: flex;
    align-items: center; 垂直居中 
    justify-content: center;水平居中 
}
.el-upload--picture-card {
    width: 78px;
    height: 78px;
    line-height: 48px;
    display: flex;
    align-items: center; 垂直居中 
    justify-content: center;水平居中 
} */
/* .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
} */
/* .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
} */
/* .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
} */
/* .uploadimg{
    width:100px;
    height:100px;
    border-radius: 50%;
  } */
/* .image{
    height: 360px;
    width: auto;
} */
/* .father {
    width: 200px;
    height: 200px;
    background: #555;
} */
/* .firstson {
    width: 50px;
    height: 50px;
    background: rgb(252, 3, 3);
} */
/* .secondson {
    width: 50px;
    height: 50px;
    background: rgb(3, 252, 45);
} */

/* .thirdson {
    width: 50px;
    height: 50px;
    background: rgb(49, 3, 252);
} */

</style>