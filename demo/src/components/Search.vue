<template>
    <div class="search-main-box">
        <div class="search-box">
            搜索结果
            <el-input
                placeholder="根据标题搜索"
                size="medium"
                style="width: 360px !important;margin-left:20px"
                v-model="curkeyword"
                class="input-with-select"
                >
                <template #append>
                    <el-button icon="el-icon-search" @click="searchSemiArticleByName" >搜索</el-button>
                </template>
            </el-input>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户" name="first">
                用户
                <div v-show="!users.length" class="search-result">
                    没有搜索结果
                    <el-empty :image-size="200"></el-empty>
                </div>
                <div v-show="users.length" class="search-user-table">
                    <!-- <div v-for="comment in commentLists" :key="comment" class="comment-box"> -->
                    <div v-for="user in users" :key="user" class="search-user-layout">
                        <div class="search-user-box">
                            <div @click="goToUserSpace(user._id)"  class="search-user-avatar">
                                <el-avatar :size="70" :src="user.userAvatar">

                                </el-avatar>
                            </div>
                            <div class="search-user-nickname">
                                {{user.nickname}}
                            </div>
                            <div class="search-user-note">
                                {{user.note}}
                            </div>
                            <div class="search-foucs-button">
                                <el-button @click="handleFollow(user._id)" type="primary" plain>
                                    关注
                                </el-button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </el-tab-pane>

            <el-tab-pane label="资讯" name="second">
                资讯
                <div v-show="!articles.length" class="search-result">
                    没有搜索结果
                    <el-empty :image-size="200"></el-empty>
                </div>
                <div class="search-cardtable">
                <div v-for="article in articles" :key="article" class="cards">
                    <div class="cardleft">
                        <!-- <div class="cardpic"> -->
                        <img class="cardpic" @click="goToDetail(article)" :src="article.coverUrl" >
                        <!-- </div>             -->
                    </div>
                    <div class="cardright" >
                        <h2 class="cardtitle" @click="goToDetail(article)">{{article.title}}</h2>
                        <div class="cardauthor">
                            {{article.createAt}}
                        </div>
                        <div class="cardabout-box">
                            <p class="cardabout"> 
                                {{article.about}}
                            </p>
                        </div>
                        <div class="cardbottom">
                            <div class="cardtags">
                                <el-tag v-if="article.partition === 'animation'" size="mini" effect="dark" type='danger' >动画</el-tag>
                                <el-tag v-if="article.partition === 'comics'" size="mini" effect="dark" >漫画</el-tag>
                                <el-tag v-if="article.partition === 'game'" size="mini" effect="dark" type='success'>游戏</el-tag>
                                <el-tag v-if="article.partition === 'doujin'" size="mini" effect="dark" type='warning'>同人</el-tag>
                                <el-tag v-if="article.partition === 'exhibition'" size="mini" effect="plain" type="info">漫展</el-tag>
                                <el-tag v-if="article.partition === 'peripheral'" size="mini" effect="dark" type="info">模玩</el-tag>
                                <!-- <el-tag size="mini" effect="plain" type="info">超小标签</el-tag> -->
                                <el-tag v-if="article.likes > 10" size="mini" type="danger">多人点赞</el-tag>
                                <el-tag v-if="article.read > 10" size="mini" >多人阅读</el-tag>
                            </div>
                            <div class="undercardpic">
                                <!-- <span class="iconfont icon-dianzan1">点赞</span> -->
                                <svg class="icon" aria-hidden="true">                 
                                <use xlink:href="#icon-dianzan"></use>                  
                                </svg>
                                <span class="undercardpic-span" @click="clickLike(article._id)">点赞</span>
                                <!-- <svg class="icon" aria-hidden="true">                 
                                <use xlink:href="#icon-ziyuan173"></use>                  
                                </svg> -->
                                <span class="undercardpic-span" @click="clickCollect(article._id)"><i class="el-icon-star-off"></i>收藏</span>
                                <!-- <span><i class="el-icon-share"></i></span> -->
                                <!-- <span class="undercardpic-span" @click="clickShare"><i class="el-icon-share"  ></i>分享</span> -->
                            </div>
                        </div>            
                    </div>
                </div>
                </div>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
// import {  } from '@vue/composition-api';
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import store from '../store'

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        // 获取页面跳转时文章的id
        const keyword = ref(route.params.keyword);

        const curkeyword = ref('');

        const activeName = 'first';

        const articles = ref([]);
        const totalArticles = ref(0);
        const users = ref([]);
        const totalUsers = ref(0);

        console.log(keyword);

        const searchArticleByName = async () => {
            const {data} = await axios.get('/article/search',{
                params: {
                    keyword: keyword.value,
                }
            });
            console.log(data);
            articles.value = data.data;
            totalArticles.value = data.data.length;
            console.log(articles.value);
            
        }

        const searchUserByName = async () => {
            const { data } = await axios.get('/user/search',{
                params: {
                    keyword: keyword.value,
                }
            });
            users.value = data.data;
            totalUsers.value = data.data.length;
            console.log(users.value);
        }

        const clickCollect = async (articleid) =>{
            if (!store.state.userStatus){
                ElMessage.warning('请在登录后进行收藏');
                return;
            }
            const { data } = await axios.post('/user/collect',{
                userid: store.state.userInfo._id,
                articleid: articleid
            });
            console.log(data);
            ElMessage.success(data.msg);
        }

        const handleFollow = async (authorid) =>{
            if (!store.state.userStatus){
                ElMessage.warning('请在登录后进行关注');
                return;
            }
            const { data } = await axios.post('/user/follow',{
                userid: store.state.userInfo._id,
                authorid: authorid
            });
            console.log(data);
            ElMessage.success(data.msg);
        }

        const goToUserSpace = (userId) => {
            console.log(userId);
            router.push(`/space/${userId}`);
        }

        const goToDetail = async (articles) => {
            console.log(articles)
            // axios.get(`/article/${articles._id}`)
            router.push(`/article/detail/${articles._id}`)
        }

        onMounted(() => {
            searchArticleByName();
            searchUserByName();
        })

        return {
            activeName,
            curkeyword,
            articles,
            totalArticles,
            users,
            totalUsers,
            clickCollect,
            handleFollow,
            goToUserSpace,
            goToDetail
        }
    },
})
</script>

<style>
.search-main-box {
    min-width: 1000px;
    /* min-height: 500px; */
    /* max-height: auto; */
    margin: 40px auto;
    /* background: #999; */
}
.search-box {
    display: flex;
    justify-content: center;
    line-height: 36px;
}
.search-result {
    text-align: center;
    height: 450px;
    margin: 50px auto;
}
.search-user-table {
    width: 1000px;
    min-height: 500px;
    /* background: #555; */
    /* display: flex; */
}
.search-user-layout {
    display: inline-block;
}
.search-user-box {

    width: 198px;
    height: 250px;
    margin-top: 20px;
    margin-left: 25px;
    margin-right: 25px;
    /* background: #e3e3e3; */
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    /* display: inline-block; */
    display: flex;
    flex-flow: column;
    justify-content: space-around;
}
.search-user-avatar {
    /* text-align: center; */
    height: 70px;
    margin: 0 auto;
    cursor: pointer;
}
.search-user-nickname {
    height: 20px;
    text-align: center;
}
.search-user-note {
    height: 65px;
    margin: 5px 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.search-foucs-button {
    height: 40px;
    width: 70px;
    margin: 0 auto;
}
.search-cardtable {
    width: 700px;
    min-height: 530px;
    margin: 0 auto;
}
</style>