<template v-slot:testslot>
    <!-- <div class="father" @click="fatherbutton">
        <div class="firstson" @mouseleave="afterchange" @mouseover="sthchange" @click="firstbutton" :style="changeColor(flag)">
        </div>
        <div class="secondson" @click="secondbutton" >
        </div>
        <div class="thirdson" @click="thirdbutton">
        </div>
    </div> -->
    <div>
    <el-carousel :interval="3000" height="450px" arrow="always">
        <el-carousel-item  v-for="(item,index) in imgArr" :key="index">
        <!-- <h3>{{ item }}</h3> -->
        <img class="image" :src="item.url" >
        </el-carousel-item>
    </el-carousel>
    <!-- <img src='../../public/img/01.png'> -->
    <!-- <img :src="img1"> -->
    <div class="father" @click="onclick"></div>
    <div v-for="(item,index) in imgArr" :key="index">
        <img :src="item.url" >
    </div>
    </div>
</template>

<script>
import { ref } from 'vue'
// import img1 from '../../public/img/01.png'
// import img2 from '../../public/img/02.png'
// import img3 from '../../public/img/03.png'
// import img4 from '../../public/img/04.png'

export default {
    data() {
        return {
            bannerH: 450,
            imgArr:[
                {url: require('../../public/img/01.png')},
                {url: require('../../public/img/02.png')},
                {url: require('../../public/img/03.png')},
                {url: require('../../public/img/04.png')},
            ],
            // imgArr:[
            //     {url: img1},
            //     {url: img2},
            //     {url: img3},
            //     {url: img4},
            // ],
            // img01: img1
        }
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.setBannerH()
        console.log(this.imgArr.url)
        console.log(1)
      }, false);
    },
    methods:{
      //设置走马灯高度
      onclick() {
          console.log(this.imgArr[0])
      },
      setBannerH() {
          this.bannerH = document.body.clientWidth / 4
      },
    },
    setup() {
        const flag = ref(false)
        const fatherbutton = () => {
            console.log(0)
        }
        const firstbutton = () => {
            console.log(1)
            
        }
        const secondbutton = () => {
            console.log(2)
        }
        const thirdbutton = () => {
            console.log(3)
        }
        const afterchange = () => {
            flag.value = false
        }
        const sthchange = () => {
            flag.value = true
        }
        const changeColor = (flag) => {
            if (flag) {
                return {
                    backgroundColor : 'green',
                    cursor: 'pointer',
                }
                
            } else {
                return {
                    backgroundColor : 'red',
                    cursor: 'default',
                }
            }
        }
        return {
            flag,
            sthchange,
            afterchange,
            changeColor,
            firstbutton,
            secondbutton,
            thirdbutton,
            fatherbutton
        }
    },
}
</script>

<style>

.image{
    height: 360px;
    width: auto;
}
.father {
    width: 200px;
    height: 200px;
    background: #555;
}
.firstson {
    width: 50px;
    height: 50px;
    background: rgb(252, 3, 3);
}
.secondson {
    width: 50px;
    height: 50px;
    background: rgb(3, 252, 45);
}

.thirdson {
    width: 50px;
    height: 50px;
    background: rgb(49, 3, 252);
}

</style>