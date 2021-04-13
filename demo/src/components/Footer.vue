<template>
    <footer class="footerstyle">
      
      <div class="left-footer">
        关于
        <div class="left-footer-links">
          <el-row>
            <el-col :span="12" >
              <div class="footer-link">
                关于我们
              </div>
              <div class="footer-link" >用户指南</div>
            </el-col>
            <el-col :span="12" style="border-right: 1px solid #B3C0D1;">
              <div class="footer-link" >
                友情链接
              </div>
              <div class="footer-link">网站介绍</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="middle-footer">
        投稿
        <div class="left-footer-links">
          <el-row>
            <el-col :span="12" >
              <div class="footer-link">
                投稿指南
              </div>
              <div class="footer-link" >审核制度</div>
            </el-col>
            <el-col :span="12" style="border-right: 1px solid #B3C0D1;">
              <div class="footer-link" >
                投稿要求
              </div>
              <div class="footer-link">意见反馈</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="right-footer">
        版权所有
        <div class="left-footer-links">
          <!-- <el-row> -->
            <!-- <el-col :span="12" > -->
              <div class="footer-link">Copyright © 2020-2021</div>
              <!-- <div class="footer-link" >审核制度</div> -->
              
            <!-- </el-col> -->
            <!-- <el-col :span="12" > -->
              <!-- <div class="footer-link" >投稿要求</div> -->
              <!-- <div class="footer-link">意见反馈</div> -->
            <!-- </el-col> -->
          <!-- </el-row> -->
        </div>
      </div>
    </footer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style>
  .footerstyle {
    bottom: 0;
    /* height: 200px; */
    /* background: #555; */
    margin-top: 20px;
    background-color: #e3e3e3;
    color: #333;
    /* text-align: center; */
    /* line-height: 60px; */
    width: 100%;
    min-width: 1000px;
    display: flex;
    justify-content:center;
  }
  .left-footer {
    width: 200px;
    height: 150px;
    /* border-right: 1px solid #B3C0D1; */
    margin-right: 100px;
    margin-top: 20px;
    font-size: 20px;
  }
  /* .left-footer-links {
    display: flex;
    justify-content:space-between;
  } */
  .middle-footer {
    width: 200px;
    height: 150px;
    /* border-right: 1px solid #B3C0D1; */
    margin-right: 100px;
    margin-top: 20px;
    font-size: 20px;
  }
  .right-footer {
    width: 200px;
    height: 150px;
    /* border-right: 1px solid #B3C0D1; */
    margin-right: 100px;
    margin-top: 20px;
    font-size: 20px;
  }
  .footer-link {
    /* width: 50%; */
    height: 20px;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
  }
</style>