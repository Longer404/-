import { createStore } from 'vuex'
import axios from 'axios'
import { testData, testPosts } from './testData'
interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
    columnId?: number;
}
interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
export interface PostProps {
    id: number;
    title: string;
    // excerpt?:string;
    content?: string;
    image?: ImageProps;
    createdAt: string;
    columnId: string;
}
export interface GlobalDataProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
}
const store = createStore<GlobalDataProps>({
    state: {
        // columns: testData,
        columns: [],
        // posts: testPosts,
        posts: [],
        user: { isLogin: false, name: 'longer', columnId: 1 }
    },
    mutations: {
        login(state) {
            state.user = { ...state.user, isLogin: true, name: 'longer' }
        },
        createPost(state, newPost) {
            state.posts.push(newPost)
        },
        fetchColumns(state, rawData) {
            console.log(1)
            console.log(rawData)
            console.log(1.1)
            console.log(rawData.data)
            state.columns = rawData.data.list
            console.log(1.2)
            console.log(rawData.data.list)
        }
    },
    actions: {
        fetchColumns(context) {
            axios.get('/columns').then(resp => {
                console.log(2)
                console.log(resp.data)
                console.log(3)
                context.commit('fetchColumns', resp.data)
            })
        },
        
    }
    // ,
    // getters: {
    //     getColumnById: (state) => (id: number) => {
    //         return state.columns.find(c => c._id === id)
    //     },
    //     getPostsByCid: (state) => (cid: number) => {
    //         return state.posts.filter(post => post.columnId === cid)
    //     }
    // }
})

export default store