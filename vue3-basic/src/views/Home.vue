<template>
    <!-- <div> -->
        <!-- <global-header :user="currentUser"></global-header> -->
        <div class="row">
            <div class="col-8 home-col-8 mg-50">轮播图施工中</div>
            <div class="col-4 home-col-4 mg-50">热门排行施工中</div>
        </div>
        <column-list :list="list"></column-list>
    <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
// import { testData } from '../testData'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// import GlobalHeader from '../components/GlobalHeader.vue'

// const testData: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 3,
//     title: 'test3的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
//     // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 4,
//     title: 'test4的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   }
// ]

export default defineComponent({
    name: 'Home',
    components: {
        ColumnList,
        // GlobalHeader
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        onMounted(() => {
            store.dispatch('fetchColumns')
        })
        const list = computed(() => store.state.columns)
        return {
            list
        }
    }
});
</script>

<style>
.home-col-8,
.home-col-4{
  height: 300px;
  background: #999;
  border: 5px solid white;
  
}
.mg-50 {
  margin-bottom: 50px;
}
</style>