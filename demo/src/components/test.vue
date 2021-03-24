<template v-slot:testslot>
    <!-- <div class="father" @click="fatherbutton">
        <div class="firstson" @mouseleave="afterchange" @mouseover="sthchange" @click="firstbutton" :style="changeColor(flag)">
        </div>
        <div class="secondson" @click="secondbutton" >
        </div>
        <div class="thirdson" @click="thirdbutton">
        </div>
    </div> -->
    <!-- <div>
    <el-carousel :interval="3000" height="450px" arrow="always">
        <el-carousel-item  v-for="(item,index) in imgArr" :key="index">

        <img class="image" :src="item.url" >
        </el-carousel-item>
    </el-carousel>

    <div class="father" @click="onclick"></div>
    <div v-for="(item,index) in imgArr" :key="index">
        <img :src="item.url" >
    </div>
    </div> -->
    <div class="index">
        <!-- <input type="file">
        <a href="javascript:;" class="file">选择文件
            <input type="file" name="" id="" @click="testclick">
        </a> -->
        <el-upload
            action="http://localhost:3000/upload/test"
            list-type="picture-card"
            :limit= 1
            :headers= "header"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="change"
            :on-success="handle_success"
            :class = "{disabled:isMax}"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
// import { ref } from 'vue'
// import img1 from '../../public/img/01.png'
// import img2 from '../../public/img/02.png'
// import img3 from '../../public/img/03.png'
// import img4 from '../../public/img/04.png'
import { getToken } from '../helpers/token'

export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            isMax : false,
            header: {
                Authorization: `Bearer ${getToken()}`
            }
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
        }
    },
//     computed: {
//     headers() {
//       return {
//         Authorization: "Bearer " + getToken(),
//         "Content-Type": "application/json;charset=UTF-8"
//       };
//     }
//   },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.isMax = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        const test = "Bearer " + getToken()
        console.log(test)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt2M;
      },
      change(){
          console.log('change')
        this.isMax = true
      },
      handle_success(res) {
          console.log(res)
      },
      getHeader() {
          return {
            Authorization: `Bearer ${getToken()}`
          }
      },
    },
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
        const testclick = () => {
            console.log(1)
        }
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
            testclick
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
}
</script>

<style>
.disabled .el-upload--picture-card {
    display: none;
}
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
.file {
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
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
.uploadimg{
    width:100px;
    height:100px;
    border-radius: 50%;
  }
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