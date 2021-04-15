<template>
    <el-tabs v-model="activeName" @tab-click="handleClickinTab" tab-position="left" class="admin-main-box">
        <el-tab-pane label="用户管理" name="first">
            <div class="tab-header-name" >
                用户管理 
            </div>
            <div class="under-header">
                <div class="total-box"> 用户总数 {{totalUser}}</div>
                <el-input
                placeholder="根据用户名搜索"
                size="medium"
                style="width: 360px !important;"
                v-model="keyword"
                class="input-with-select"
                >
                    <template #append>
                        <el-button icon="el-icon-search" @click="searchUserByName"></el-button>
                    </template>
                </el-input>
                <el-button v-show="hadSearch" plain size="small" @click="goBackToUserTable">返回</el-button>
            </div>
            <!-- <el-button type="primary" @click="getUserList">测试接口</el-button> -->
            
            <el-table 
                :data="tableDataOfUser"
                :default-sort = "{prop: 'meta.createdAt', order: 'descending'}" 
                border 
                style="width: 100%" 
                stripe>
                
                <el-table-column prop="nickname" label="用户昵称" width="160" sortable>
                </el-table-column>
                <el-table-column prop="_id" label="用户ID" width="240" sortable>
                </el-table-column>
                
                <el-table-column prop="character" label="用户角色" width="220">
                </el-table-column>
                <el-table-column prop="meta.createdAt" label="创建日期" width="180" sortable>
                </el-table-column>
                <el-table-column prop="phone" label="绑定手机号" width="240">
                </el-table-column>
                <!-- <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        
                        <el-button type="text" size="small" @click="getUserComment(scope.row)">查看用户评论</el-button>
                        <el-button type="text" size="small" @click="setUser(scope.row)">编辑用户</el-button>
                        <el-button type="text" size="small" @click="getUserArticle(scope.row)">查看用户投稿</el-button>
                        <el-button type="text" size="small" style="color:red;" @click="handleClick(scope.row)">删除用户</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="setPage"
                    :total="totalUser"
                    :current-page="curPageOfUser"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
            <el-dialog title="编辑用户信息" :lock-scroll="false" v-model="dialogUserFormVisible">
                <el-form :model="userForm">
                    <el-form-item 
                        prop="nickname"
                        label="用户昵称" 
                        label-width="100px"
                        
                    >
                    <el-input :placeholder="currentUser.nickname" style="width: 360px !important;" v-model="userForm.nickname" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="phone"
                        label="绑定手机号码" 
                        label-width="100px"
                        
                    >
                    <el-input style="width: 360px !important;" v-model="userForm.phone" autocomplete="off" :placeholder="currentUser.phone" maxlength="13"></el-input>
                    </el-form-item>
                    <el-form-item 
                        prop="power"
                        label="用户权限设置" 
                        label-width="100px"
                        
                    >
                    <!-- <el-input style="width: 360px !important;" v-model="form.nickname" autocomplete="off" placeholder="请输入用户密码"></el-input> -->
                        <el-select v-model="userForm.power" placeholder="请选择活动区域">
                            <el-option label="正常权限" value="1" style="color:green"></el-option>
                            <el-option label="禁止发表评论" value="2" style="color:red"></el-option>
                            <el-option label="禁止发布资讯" value="3" style="color:red"></el-option>
                            <el-option label="只能浏览资讯" value="4" style="color:red"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" label-width="100px">
                        <el-button type="danger" plain @click="resetUserPass">重置用户密码</el-button>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="dialogUserFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="resetUser">保 存</el-button>
                    <!-- <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button> -->
                    </span>
                </template>
            </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="角色配置" name="second">
            <div class="tab-header-name">
                角色配置
            </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
        <el-tab-pane label="审核投稿" name="third">
            <div class="tab-header-name">
                审核投稿
            </div>
            <div class="under-header">
                <div class="total-box"> 待审稿总数 {{totalSemifinishedArticle}}</div>
                <el-input
                placeholder="根据标题搜索"
                size="medium"
                style="width: 360px !important;"
                v-model="keyword"
                class="input-with-select"
                >
                    <template #append>
                        <el-button icon="el-icon-search" @click="searchUserByName"></el-button>
                    </template>
                </el-input>
                <el-button v-show="hadSearch" plain size="small" @click="goBackToUserTable">返回</el-button>
            </div>
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
                                <!-- <el-button @click="dialogFormVisible = false , dialogRegFormVisible = true" type="text" size="mini" style="margin-right:60px">未有账号，前去注册</el-button> -->
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
                    :total="totalSemifinishedArticle"
                    :current-page="curPageOfSemifinishedArticles"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="投稿管理" name="forth">
            <div class="tab-header-name">
                投稿管理
            </div>
            <div class="under-header">
                <div class="total-box"> 投稿总数 {{totalArticle}}</div>
                <el-input
                placeholder="根据标题搜索"
                size="medium"
                style="width: 360px !important;"
                v-model="keyword"
                class="input-with-select"
                >
                    <template #append>
                        <el-button icon="el-icon-search" @click="searchUserByName"></el-button>
                    </template>
                </el-input>
                <el-button v-show="hadSearch" plain size="small" @click="goBackToUserTable">返回</el-button>
            </div>
            <!-- <div class="total-tag-box">
                <div class="tag-box-title" > 标签分类</div>
                <el-checkbox-group v-model="checkList" @change="test">
                    <el-checkbox label="动画资讯" ></el-checkbox>
                    <el-checkbox label="漫画资讯"></el-checkbox>
                    <el-checkbox label="游戏相关"></el-checkbox>
                    <el-checkbox label="动漫周边" ></el-checkbox>
                    <el-checkbox label="同人创作" ></el-checkbox>
                    <el-checkbox label="漫展消息" ></el-checkbox>
                </el-checkbox-group>
            </div> -->
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
                <el-table-column fixed="right" label="操作" width="200">
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
                    :total="totalArticle"
                    :current-page="curPageOfArticle"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="fifth">
            <div class="tab-header-name">
                评论管理
            </div>
            <div class="under-header">
                <div class="total-box"> 用户总数 {{totalComment}}</div>
                <el-input
                placeholder="根据标题搜索"
                size="medium"
                style="width: 360px !important;"
                v-model="keyword"
                class="input-with-select"
                >
                    <template #append>
                        <el-button icon="el-icon-search" @click="searchUserByName"></el-button>
                    </template>
                </el-input>
                <el-button v-show="hadSearch" plain size="small" @click="goBackToUserTable">返回</el-button>
            </div>
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
                    :total="totalComment"
                    :current-page="curPageOfComment"
                    :page-size="10"
                    >
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="sixth">
            <div class="tab-header-name">
                数据统计
            </div>
            <div class="testbox">

            
                <v-chart class="chart" :option="option" />
                <v-chart class="chart" :option="option2" />
            </div>
        </el-tab-pane>
    </el-tabs>
    <!-- </div> -->
    <!-- <div>
        admin page
    </div> -->
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus';
import store from '../store'

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
    components: {
        VChart
    },
    provide: {
        [THEME_KEY]: "default"
    },
    setup() {
        const totalData = ref([]);
        const gettotalData = async () => {
            const {data} = await axios.get('/message/systemdata');
            // const {data} = await axios.get(`/user/detail/${row._id}`);
            console.log(data.data);
            totalData.value = [
                data.data.totalUser, 
                data.data.totalArticle, 
                data.data.totalComment, 
                data.data.totalSemifinishedArticle
            ];
            console.log(totalData.value[0]);
        }
        // var testdata = [
        //             totalData.value[0],
        //             totalData.value[1],
        //             totalData.value[2],
        //             totalData.value[3],
        //         ];
        store.dispatch('getTotalPartition');
        store.dispatch('getTotalData');
        
        const option2 = ref({
            title: {
                text: "平台数据统计",
                left: "center"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {   // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'    // 默认为直线，可选为：'line' | 'shadow'|'none'
                }
            },
            xAxis: [
            {
                type: "category",
                data: ["用户总人数","投稿总数","评论总数","待审投稿总数"],
                // 修改文本的颜色
                axisLabel: {
                color: "#BB3137",
                fontSize: 12
                },
                // 修改轴线的颜色
                axisLine: {
                lineStyle: {
                    color: "#BB3137"
                }
                }
            }
            ],
            yAxis: [
                {
                    type: "value",
                    // data: [100,200,300,200,500,400,600,800,900,500,100,200],
                    axisLabel: {
                    color: "#BB3137",
                    fontSize: 10
                    },
                    // 修改y轴横向分割线的颜色
                    splitLine: {
                    lineStyle: {
                        color: ["#FFC9CB"]
                    }
                    },
                    axisLine: {
                    lineStyle: {
                        color: "#BB3137"
                    },
                    label: {
                        show: true,
                        position: "top",
                        color: "#3D383A",
                        formatter: "￥{c}"
                    },

                }
            }
            ], 
            series: [ {
                name: '',
                type: 'bar',
                barWidth: '50%',
                data: store.state.totalData,
            } ]
        })
        const option = ref({
            title: {
                text: "投稿分类统计信息",
                left: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: ["动画资讯", "漫画资讯", "游戏相关", "动漫周边", "同人创作", "漫展消息"]
            },
            series: [
                {
                name: "投稿分类统计信息",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: [
                    { value: store.state.totalPartition[0], name: "动画资讯" },
                    { value: store.state.totalPartition[1], name: "漫画资讯" },
                    { value: store.state.totalPartition[2], name: "游戏相关" },
                    { value: store.state.totalPartition[3], name: "动漫周边" },
                    { value: store.state.totalPartition[4], name: "同人创作" },
                    { value: store.state.totalPartition[5], name: "漫展消息" }
                ],
                // data: store.state.totalPartition,
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
                }
            ]
        });

        const checkList = ref([]);
        const activeName = ref('first');
        const keyword = ref('');
        const hadSearch = ref(false);
        const tableDataOfUser = ref([]);
        const totalUser = ref(0);
        const tableDataOfArticle = ref([]);
        const totalArticle = ref(0);
        const semifinishedArticles = ref([]);
        const totalSemifinishedArticle = ref(0);
        const commentTable = ref([]);
        const totalComment = ref(0);
        const dialogFormVisible = ref(false);
        const dialogUserFormVisible = ref(false);
        const currentId = ref('');
        const currentAuthorId = ref('');
        const form = reactive({
            message: '',
        });
        const userForm = reactive({
            nickname: '',
            phone:'',
            power: '',
        });
        const currentUser = ref({});
        // 当前标签页
        const curTab = ref('0');
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
            totalSemifinishedArticle.value = res.data.data.total;
            getLocalTime(semifinishedArticles.value);
            // total.value = res.data.data.total;
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
            console.log(res.data.data.list);
            console.log('------------------');
            tableDataOfArticle.value = res.data.data.list;
            console.log((tableDataOfArticle.value));
            totalArticle.value = res.data.data.total;
            // console.log(format(res.data.data.list[0].meta.createdAt));
            getLocalTime(tableDataOfArticle.value);
            // console.log(tableData);
            // 将请求返回的文章数组赋值给articles
            // articles.value = res.data.data.list;
            // 将请求返回的文章总数赋值给total
            // total.value = res.data.data.total;
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
            totalUser.value = res.data.data.total;
            // console.log(format(res.data.data.list[0].meta.createdAt));
            getLocalTime(tableDataOfUser.value);
            // console.log(tableData);
            // 将请求返回的文章数组赋值给articles
            // articles.value = res.data.data.list;
            // 将请求返回的文章总数赋值给total
            // total.value = res.data.data.total;
        }

        const getCommentTable = async () => {
            let res = await axios.get('/comment/table', {
                params: {
                    page: curPageOfComment.value
                }
            });
            console.log(res);
            commentTable.value = res.data.data.list;
            totalComment.value = res.data.data.total;
            getCommentLocalTime(commentTable.value);
            // total.value = res.data.data.total;
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
                
            } else if (tab.index === "2") {
                curTab.value = '2';
                getSemifinishedArticles();
            } else if (tab.index === '3') {
                curTab.value = '3';
                getAllArtList();
                // curPageOfComment.value = page;
            } else if (tab.index === '4') {
                curTab.value = '4';
                getCommentTable();
                // curPageOfComment.value = page;
            } else if (tab.index === '5') {
                curTab.value = '5';
                // getCommentTable();
                // curPageOfComment.value = page;
            }
            
        }
        // 当页码改变时执行setPage函数，将改变后的页码赋值给curpage
        const setPage = (page) => {
            // 将改变后的页码赋值给curpage
            
            if (curTab.value === '0'){
                curPageOfUser.value = page;
                getUserList();
            } else if (curTab.value === '2'){
                // console.log(1);
                curPageOfSemifinishedArticles.value = page;
                getSemifinishedArticles();
            } else if (curTab.value === '3'){
                curPageOfArticle.value = page;
                getAllArtList();
            } else if (curTab.value === '4') {
                curPageOfComment.value = page;
                getCommentTable();
                
            }
                
        }
        
        const setUser = async (row) => {
            
            const {data} = await axios.get(`/user/detail/${row._id}`);
            console.log(data);
            console.log(data.data.nickname);
            currentUser.value._id = row._id;
            currentUser.value.nickname = data.data.nickname;
            currentUser.value.phone = data.data.phone;
            userForm.power = data.data.power;
            console.log(currentUser.value.nickname);
            dialogUserFormVisible.value = true;
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
            activeName.value = 'fifth';
            const res = await axios.get('/comment/list', {
                params: {
                    commentTo: row._id,
                }
            });
            console.log(res);
            commentTable.value = res.data.data;
            getCommentLocalTime(commentTable.value);
            totalComment.value = res.data.data.total;
        }

        const getUserComment = async (row) => {
            activeName.value = 'fifth';
            const res = await axios.get('/comment/byUserId', {
                params: {
                    commentatorId: row._id,
                }
            });
            console.log(res);
            commentTable.value = res.data.data;
            getCommentLocalTime(commentTable.value);
            totalComment.value = res.data.data.total;
        }

        const getUserArticle = async (row) => {
            activeName.value = 'forth';
            let res = await axios.get(`/article/manager/${row._id}`);
            console.log(res);
            tableDataOfArticle.value = res.data.data.list;
            console.log(tableDataOfArticle.value);
            // getLocalTime(tableDataOfArticle.value);
            totalArticle.value = res.data.data.list.length;
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

        const resetUser = async () => {
            console.log(userForm);
            const { data } = await axios.post('/user/update', {
                id: currentUser.value._id,
                nickname: userForm.nickname,
                phone: userForm.phone,
                power: userForm.power,
            });
            ElMessage.success(data.msg);
            getUserList();
            dialogUserFormVisible.value = false;
            userForm.nickname = '';
            userForm.phone = '';
            userForm.power = '';
        }

        const resetUserPass = async () => {
            // console.log(userForm);
            const { data } = await axios.post('/user/resetpass', {
                id: currentUser.value._id,
            });
            ElMessage.success(data.msg);
            // getUserList();
            // dialogUserFormVisible.value = false;
            // userForm.nickname = '';
            // userForm.phone = '';
            // userForm.power = '';
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

        const searchUserByName = async () => {
            if(keyword.value === ''){
                ElMessage.warning('请输入关键词');
                return;
            }
            console.log(keyword);
            const {data} = await axios.get('/user/search',{
                params: {
                    keyword: keyword.value,
                }
            });
            console.log(data);
            tableDataOfUser.value = data.data;
            totalUser.value = data.data.length;
            // console.log(format(res.data.data.list[0].meta.createdAt));
            getLocalTime(tableDataOfUser.value);
            keyword.value = '';
            hadSearch.value = true;
        }

        const goBackToUserTable = () => {
            hadSearch.value = false;
            getUserList();
        }

        const test = () => {
            console.log(checkList);
        }

        onMounted(() => {
            getUserList();
            // getAllArtList();
            gettotalData();
            console.log(store.state.totalData);
            
        })

        return {
            totalData,
            gettotalData,
            option,
            option2,
            test,
            checkList,
            activeName,
            curTab,
            curPageOfUser,
            curPageOfArticle,
            curPageOfSemifinishedArticles,
            curPageOfComment,
            semifinishedArticles,
            total,
            setPage,
            keyword,
            hadSearch,
            searchUserByName,
            goBackToUserTable,
            tableDataOfUser,
            tableDataOfArticle,
            commentTable,
            handleClickinTab,
            handleClick,
            setPass,
            setReject,
            resetUser,
            resetUserPass,
            setUser,
            getArticleDetail,
            getArticleCover,
            getArticleAbout,
            getArticleComment,
            getUserComment,
            getUserArticle,
            getUserList,
            getAllArtList,
            getSemifinishedArticles,
            getCommentTable,
            totalUser,
            totalArticle,
            totalSemifinishedArticle,
            totalComment,
            format,
            dialogFormVisible,
            dialogUserFormVisible,
            form,
            userForm,
            currentUser,
            sendRejectMessage
        }
    },
})
</script>

<style>
.admin-main-box {
    /* height: 100% !important; */
    min-width: 1000px;
    /* max-width: 1256px; */
    min-height: 729px;
   
}
.tab-header-name{
    font-size: 20px;
    font-weight: 600;
    margin-bottom:20px;
    margin-top:20px;
}
.under-header {
    font-size: 16px;
    font-weight: 500;
    margin-bottom:20px;
    margin-top:20px;
    display: flex;
    justify-self: start;
    height: 36px;
}
.total-box {
    line-height: 40px;
    margin-right: 10px;
}
.total-tag-box {
    line-height: 36px;
    display: flex;
    justify-self: start;
}
.tag-box-title {
    margin-right: 33px;
    font-size: 16px;
}
.testbox {
    min-width: 1000px;
    height: 500px;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}
.chart {
    width: 500px;
  height: 500px;
}
/* .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
} */
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
</style>