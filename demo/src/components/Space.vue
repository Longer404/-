<template>
  <div class="main-user-box">
    <div class="space-center">
        <div class="space-top-pic">
            <div class="space-owner">
                <div class="space-owner-avatar">
                    <el-avatar :size="72" :src="spaceUserInfo.userAvatar">
                    </el-avatar>
                </div>
                <div class="space-owner-info">
                    <div class="space-owner-nickname">
                        {{spaceUserInfo.nickname}}
                    </div>
                    <div class="space-owner-note">
                        {{spaceUserInfo.note}}
                    </div>
                </div>
                
                <div class="space-owner-handle">
                    <el-button>关注</el-button>
                    <!-- <el-button>发消息</el-button> -->
                </div>
            </div>
        </div>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="投稿列表" name="first">
                投稿列表
                <div v-show="!articles.length" class="search-result">
                    该用户还没有发布过资讯哦~
                    <el-empty :image-size="200"></el-empty>
                </div>

                <div v-for="article in articles" :key="article" class="space-card-case">
                    <img v-if="article.coverUrl !== ''" class="space-card-img" :src="article.coverUrl" >
                    <img v-else class="space-card-img" src="../../public/img/img-false.jpg">
                    <div class="space-card-info">
                        <div class="space-card-info-title">
                            {{article.title}}
                        </div>
                        <div class="space-card-info-date">
                            {{article.createAt}}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="收藏夹" name="second">
                收藏夹
                <div v-show="!collectionList.length" class="search-result">
                    该用户还没有收藏过资讯哦~
                    <el-empty :image-size="200"></el-empty>
                </div>
                <div v-for="article in collectionList" :key="article" class="space-card-case">
                    <img v-if="article.coverUrl !== ''" class="space-card-img" :src="article.coverUrl" >
                    <img v-else class="space-card-img" src="../../public/img/img-false.jpg">
                    <div class="space-card-info">
                        <div class="space-card-info-title">
                            {{article.title}}
                        </div>
                        <div class="space-card-info-date">
                            {{article.createAt}}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关注列表" name="third">
                关注列表
                <div v-show="!followingList.length" class="search-result">
                    该用户还没有关注其他用户哦~
                    <el-empty :image-size="200"></el-empty>
                </div>
                <div v-for="following in followingList" :key="following"  class="space-follow-card-case">
                    <div class="block">
                        <el-avatar :size="72" :src="following.userAvatar">
                        </el-avatar>
                    </div>
                    <div class="space-follow-card-info">
                        <div class="space-card-info-title">
                            {{following.nickname}}
                        </div>
                        <div class="space-card-info-date">
                            {{following.note}}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="粉丝列表" name="fourth">
                粉丝列表
                <div v-show="!fansList.length" class="search-result">
                    该用户还没有粉丝哦~
                    <el-empty :image-size="200"></el-empty>
                </div>
                <div v-for="fans in fansList" :key="fans" class="space-follow-card-case">
                    <div class="block">
                        <el-avatar :size="72" :src="fans.userAvatar">
                        </el-avatar>
                    </div>
                    <div class="space-follow-card-info">
                        <div class="space-card-info-title">
                            {{fans.nickname}}
                        </div>
                        <div class="space-card-info-date">
                            {{fans.note}}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
// import store from '../store'

export default defineComponent({
    setup() {
        const articles = ref([]);

        const collectionList = ref([]);

        const followingList = ref([]);

        const fansList = ref([]);

        const route = useRoute();
        // const router = useRouter();

        const spaceUserId = route.params.id;

        const spaceUserInfo = ref({});

        const activeName = ref('first');
        // 获取用户文章列表
        const getArticleList = async () => {
            // 用户id
            // const userId = store.state.userInfo._id;
            let res = await axios.get(`/article/personal/${spaceUserId}`);
            console.log('getlist');
            // 将请求返回的文章数组赋值给articles
            articles.value = res.data.data.list;
            console.log(articles);
            return res.data.data.list;
        };

        const getUserCollection = async () => {
            // console.log(store.state.userInfo._id);
            const { data } = await axios.get('/user/collection',{
                params: {
                    id: spaceUserId
                }  
            });
            console.log(data);
            collectionList.value = data.data;

        }

        const getFollowingList = async () => {
            const { data } = await axios.get('/user/following',{
                params: {
                    id: spaceUserId
                }
            });
            console.log(data);
            followingList.value = data.data;
        }

        const getFansList = async () => {
            const { data } = await axios.get('/user/befollowed',{
                params: {
                    id: spaceUserId
                }
            });
            console.log(data);
            fansList.value = data.data;
        }

        const getSpaceUserInfo = async () => {
            const {data} = await axios.get(`/user/detail/${spaceUserId}`);
            console.log(data);
            spaceUserInfo.value = data.data;
        }

        onMounted(() =>{
            getArticleList();
            getUserCollection();
            getFollowingList();
            getFansList();
            getSpaceUserInfo();
        });

        return {
            articles,
            collectionList,
            followingList,
            fansList,
            activeName,
            spaceUserInfo
        }
    },
})
</script>

<style>
.space-center {
    margin: 0 auto;
    min-height: 800px;
    width: 800px;
    /* background: #555; */
}
.space-top-pic {
    height: 150px;
    /* background: #B3C0D1; */
    background-image: url(../../public/img/background-img02.jpg);
    background-size: 100%;
    background-repeat: no-repeat; 
    background-position: 0 -50px;
    width: 800px;
    /* width: 100%; */
}
.space-owner {
    height: 80px;
    padding-top: 70px;
    display: flex;
    justify-content: space-between;
}
.space-owner-avatar {
    /* height: 70px;
    width: 70px;
    background: #000; */
    margin-left: 20px;
}
.space-owner-nickname {
    font-weight: 700;
    /* color: white; */
}
.space-owner-info {
    width: 550px;
}
.space-owner-note {
    margin-top: 10px;
    font-size: 13px;
}
.space-owner-handle {
    margin-top: 15px;
    height: 40px;
    width: 100px;
}
.space-card-case {
    margin: 15px auto;
    height: 100px;
    width: 600px;
    padding: 15px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}
.space-card-img {
    width: 180px;
    background: gray;
    object-fit: cover;
    /* width: 100%; */
}
.space-card-info {
    width: 400px;
    /* background: rgb(140, 117, 241); */
    border-left-style:solid;
    border-left-width: 1px;
    border-left-color: #99a9bf;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}
.space-card-info-title {
    font-size: 20px;
    margin-left: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.space-card-info-date {
    font-size: 13px;
    font-weight: 200;
    margin-left: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.space-card-info-handle {
    display: flex;
    justify-content: flex-end;
}
.space-follow-card-case {
  margin: 15px auto;
    height: 75px;
    width: 600px;
    padding: 10px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}
.space-follow-card-info {
  width: 515px;
    /* background: rgb(140, 117, 241); */
    border-left-style:solid;
    border-left-width: 1px;
    border-left-color: #99a9bf;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}

</style>