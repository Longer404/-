<template>
    <div class="top-pic">
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">我的工作台</el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
    <div class="testcent">
      <div class="paomadeng">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="toplist">
        排行榜
      </div>
    </div>

    <div class="cardlist">
      <div class="cardlist-letf">
        <div v-for="n in numbers" :key="n" class="cards">
          <div class="cardleft">
            <div class="cardpic">
              {{n}}
            </div>
          </div>
          
          
        </div>
      </div>
      <div class="cardlist-right">
        <div class="cardtitle">
          cardtitle
        </div>
      </div>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      numbers: [ 1, 2, 3, 4, 5 ]
    }
  },
  // computed: {
  //   evenNumbers() {
  //     return this.numbers.filter(number => number % 2 === 0)
  //   }
  // }
   // 获取元素
  
  
}
  // window.onscroll = function() {
  //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //     const goTop = document.querySelector('.cardlist-right')
  //       if (scrollTop > 570) {
  //           goTop.style.position = 'fixed';
  //           goTop.style.top = '10px';
  //         console.log(1)
  //       } else {
  //           goTop.style.top = '0';
  //           goTop.style.position = 'relative';
  //         console.log(2)
  //       }
  // }
  // var cardleft = document.querySelector('.cardlist-letf') ;
  // var cardright = document.querySelector('.cardlist-right');
  // var cardTop = cardleft.offsetTop;
  // var rightTop = cardright.offsetTop - cardTop;
  // document.addEventListener('scroll', function() {
  //   if(window.pageYOffset >= cardTop) {
  //     cardright.style.position = 'fixed';
  //     cardright.style.top = rightTop + 'px';
  //   } else {
  //     cardright.style.position = 'absolute';
  //     cardright.style.top = cardTop + 'px';
  //   }
  // })
</script>

<style>
  html,body {
    margin: 0 auto;
    
  }
  .paomadeng {
    /* width: 500px; */
    margin-left: 10%;
  }
  .el-menu {
    padding-left: 10% !important;
    /* height: 50px; */
    /* min-width: 1200px; */
    /* width: 100%; */
  }
  /* .el-menu-item {
    height: 50px !important;
    align-items: center;
  } */
  .top-pic {
    height: 100px;
    background: #B3C0D1;
    min-width: 1200px;
    width: 100%;
  }
  .toplist {
    margin-right: 10%;
    width: 200px;
    background: #000;
  }
  .testcent {
    /* 弹性盒子+左右两端对称 */
    display: flex;
    justify-content: space-between;
    /* padding-left: 10%;
    padding-right: 10%; */
    /* width: 100%; */
    margin-top: 10px;
    min-width: 1200px;
    /* width: 100%; */
    height: 360px;
    background: rgb(166, 209, 235);
  }
  .cardlist {
    min-width: 1200px;
    /* height: 500px; */
    /* padding: 0 10% 0 10%; */
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .cardlist-letf {
    width: 750px;
    margin-left: 10%;
    /* background: #B3C0D1;
    height: 500px; */
  }
  .cards {
    margin-top: 10px;
    margin-bottom: 10px;
    /* margin-left: 10%; */
    background: #B3C0D1;
    height: 200px;
    /* width: 750px; */
  }
  .cardleft {
    width: 240px;
  }
  .cardpic {
    /* width: 240px; */
    height: 150px;
    background: #475669;
  }
  .cardlist-right {
    /* 粘性布局，当距离顶端0像素时位置固定 */
    position: -webkit-sticky;
    position: sticky;
    top:0;
    background: #000;
    width: 200px;
    margin-right: 10%;
    height: 640px;
  }
  .cardtitle {
    
  }

  .el-carousel {
      width: 500px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>