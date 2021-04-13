<template>
    <div class="message-main-box">
         <el-tabs tab-position="left" style="height: 100% !important;">
            <!-- <el-tab-pane label="用户管理">用户管理</el-tab-pane> -->
            <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane> -->
            <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
            <el-tab-pane label="系统消息">
                <div class="message-cards-title">&nbsp;&nbsp;&nbsp;系统消息</div>
                <div class="message-card-list">
                    <div v-for="message in messageList" :key="message" class="message-cards">
                        <div class="message-cards-author">
                            系统消息
                        </div>
                        <div class="message-cards-content">
                            {{message.content}}
                        </div>
                        <div class="message-cards-date">
                            {{message.createAt}}
                        </div>
                    </div>
                    
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import store from '../store'
import axios from 'axios'


export default defineComponent({

    setup() {
        const messageList = ref([]);

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
                data[lenth].createAt = format(data[lenth].createAt);
            }
        }

        const getMessageList = async () => {
            // 用户id
            const userId = store.state.userInfo.data.data._id;
            let { data } = await axios.get(`/message/${userId}`);
            console.log('getmessageList');
            console.log(data);
            // 将请求返回的文章数组赋值给articles
            messageList.value = data.data;
            console.log(messageList);
            getLocalTime(messageList.value);
            // return res.data.data.list;
            // 将请求返回的文章总数赋值给total
            // total.value = res.data.data.total
        };
      onMounted( () => {
        getMessageList();
      })
      return {
          messageList,

      }
    },
})
</script>

<style >
.message-main-box {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    /* background: #555; */
}

.message-card-list {
    width: 800px;
    min-height: 500px;
    /* margin-left: 50px; */
    /* box-shadow: gray 1.5px 1.5px 3px; */
    /* border-radius: 4px ; */
    /* background: #e3e3e3; */
    /* display: flex; */
    /* justify-content: center; */
}
.message-cards-title {
    width: 750px;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    margin-bottom: 20px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #f5f5f5;
}
.message-cards {
    width: 750px;
    min-height: 70px;
    margin-left: 20px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #f5f5f5;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}
.message-cards-author {
    font-size: 16px;
    font-weight: 600;
    width: 700px;
    margin-left: 20px;
}
.message-cards-content {
    width: 700px;
    margin-left: 20px;
    font-size: 15px;
}
.message-cards-date {
    width: 700px;
    text-align: right;
    font-weight: 100;
    font-size: 12px;
}
</style>