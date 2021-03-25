<template>
    <!-- <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/upload/test"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <!-- <test-slot>
        <test-slot ></test-slot>
        <template v-slot:uploadImg="test">
            <h1>{{test.imageUrl}}</h1>
        </template>
        
    </test-slot> -->
    <el-button @click="testclick"></el-button>
</template>

<script>
export default {
    // data() {
    //   return {
    //     imageUrl: ''
    //   };
    // },
    // methods: {
    //   handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg' || 'image/png';
    //     const isLt2M = file.size / 1024 / 1024 < 3;

    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 3MB!');
    //     }
    //     return isJPG && isLt2M;
    //   }
    // },
    setup() {
        const testclick = () => {
            console.log(this.imageUrl)
        }
        return {
            testclick
        }
    },
}
</script>

<style>
  /* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 356px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 356px;
    height: 178px;
    object-fit: cover;
    display: block;
  } */
</style>