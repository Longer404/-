export interface ColumnProps {
    id: number;
    title: string;
    avatar?: string;
    description: string;
}
export interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    columnId: number;
}
export const testData: ColumnProps[] = [
    {
        id: 1,
        title: '动画专区',
        description: '这是动画专区，有一段非常有意思的简介，可以更新一下欧, 这是动画专区，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
    },
    {
        id: 2,
        title: '漫画专区',
        description: '这是漫画专区，有一段非常有意思的简介，可以更新一下欧，这是漫画专区，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 3,
        title: '游戏专区',
        description: '这是游戏专区，有一段非常有意思的简介，可以更新一下欧 这是游戏专区，有一段非常有意思的简介，可以更新一下欧'
        // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 4,
        title: '模玩专区',
        description: '这是模玩专区，有一段非常有意思的简介，可以更新一下欧，这是模玩专区，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 5,
        title: '壁纸专区',
        description: '这是模玩专区，有一段非常有意思的简介，可以更新一下欧，这是模玩专区，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 6,
        title: '漫展专区',
        description: '这是模玩专区，有一段非常有意思的简介，可以更新一下欧，这是模玩专区，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    }
]
  
export const testPosts: PostProps[] = [
    {
        id: 1,
        title: '这是动画专区的第一篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
        createdAt: '2020-06-11 10:34:22',
        columnId: 1
    },
    {
        id: 2,
        title: '这是动画专区的第二篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        createdAt: '2020-06-11 10:34:22',
        columnId: 1
    },
    {
        id: 3,
        title: '这是动画专区的第三篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
        createdAt: '2020-06-11 10:34:22',
        columnId: 1
    }
]
  