<template >
    <div class="index" >
        <!-- <ul> -->
        <el-button @click="testbutton">测试接口</el-button>
            
        <!-- </ul> -->
    </div>
</template>

<script>
// import { ref } from 'vue'
// import img1 from '../../public/img/01.png'
// import img2 from '../../public/img/02.png'
// import img3 from '../../public/img/03.png'
// import img4 from '../../public/img/04.png'
// import { getToken } from '../helpers/token'

export default {
    data() {
        // return {
        //     dialogImageUrl: '',
        //     dialogVisible: false,
        //     isMax : false,
        //     header: {
        //         Authorization: `Bearer ${getToken()}`
        //     }
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
        // }
    },
//     computed: {
//     headers() {
//       return {
//         Authorization: "Bearer " + getToken(),
//         "Content-Type": "application/json;charset=UTF-8"
//       };
//     }
//   },
    // methods: {
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //     this.isMax = false;
    //   },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    //     const test = "Bearer " + getToken()
    //     console.log(test)
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
    //   },
    //   change(){
    //       console.log('change')
    //     this.isMax = true
    //   },
    //   handle_success(res) {
    //       console.log(res)
    //   },
    //   getHeader() {
    //       return {
    //         Authorization: `Bearer ${getToken()}`
    //       }
    //   },
    // },
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
        const testbutton = () => {
            // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
            const {tencentcloud} = require("tencentcloud-sdk-nodejs");

            const SmsClient = tencentcloud.sms.v20190711.Client;

            const clientConfig = {
            credential: {
                secretId: "AKIDhHe0LJZ7OTkqjQwz0mQajhSxGyTnQD0Y",
                secretKey: "TtJVSnsiIcgT0IYZMuCSnLfroVw4CNLC",
            },
            region: "",
            profile: {
                    httpProfile: {
                        endpoint: "sms.tencentcloudapi.com",
                    },
                },
            };

            const client = new SmsClient(clientConfig);
            const params = {
                "PhoneNumberSet": [
                    "+8617665687264"
                ],
                "TemplateID": "361644",
                "Sign": "shumyanlong",
                "TemplateParamSet": [
                    "6666"
                ],
                "SmsSdkAppid": "1400506356"
            };
            client.SendSms(params).then(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    console.error("error", err);
                }
            );
            // const tencentcloud = require("../../node_modules/tencentcloud-sdk-nodejs");
            // 导入 SMS 模块的 client models
            // const smsClient = tencentcloud.sms.v20190711.Client;
            // const models = tencentcloud.sms.v20190711.Models;
            // const Credential = tencentcloud.common.Credential;
            // const ClientProfile = tencentcloud.common.ClientProfile;
            // const HttpProfile = tencentcloud.common.HttpProfile;

            /* 必要步骤：
            * 实例化一个认证对象，入参需要传入腾讯云账户密钥对 secretId 和 secretKey
            * 本示例采用从环境变量读取的方式，需要预先在环境变量中设置这两个值
            * 您也可以直接在代码中写入密钥对，但需谨防泄露，不要将代码复制、上传或者分享给他人
            * CAM 密匙查询: https://console.cloud.tencent.com/cam/capi
            */
            //let cred = new Credential(process.env.TENCENTCLOUD_SECRET_ID, process.env.TENCENTCLOUD_SECRET_KEY);
            // SECRET_ID => AKIDhHe0LJZ7OTkqjQwz0mQajhSxGyTnQD0Y
            // SECRET_KEY => TtJVSnsiIcgT0IYZMuCSnLfroVw4CNLC
            // let cred = new Credential("AKIDhHe0LJZ7OTkqjQwz0mQajhSxGyTnQD0Y", "TtJVSnsiIcgT0IYZMuCSnLfroVw4CNLC");
            
            /* 非必要步骤:
            * 实例化一个客户端配置对象，可以指定超时时间等配置 */
            // let httpProfile = new HttpProfile();

            /* SDK 默认使用 POST 方法
            * 如需使用 GET 方法，可以在此处设置，但 GET 方法无法处理较大的请求 */
            // httpProfile.reqMethod = "POST";

            /* SDK 有默认的超时时间，非必要请不要进行调整
            * 如有需要请在代码中查阅以获取最新的默认值 */
            // httpProfile.reqTimeout = 30;
            // httpProfile.endpoint = "sms.tencentcloudapi.com";

            // 实例化一个 client 选项，可选，无特殊需求时可以跳过
            // let clientProfile = new ClientProfile();

            /* SDK 默认用 TC3-HMAC-SHA256 进行签名，非必要请不要修改该字段 */
            // clientProfile.signMethod = "HmacSHA256";
            // clientProfile.httpProfile = httpProfile;

            /* SDK 会自动指定域名，通常无需指定域名，但访问金融区的服务时必须手动指定域名
            * 例如 SMS 的上海金融区域名为 sms.ap-shanghai-fsi.tencentcloudapi.com *
            * 实例化 SMS 的 client 对象
            * 第二个参数是地域信息，可以直接填写字符串 ap-guangzhou，或者引用预设的常量 */
            // let client = new smsClient(cred, "ap-guangzhou", clientProfile);

            /* 实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
            * 您可以直接查询 SDK 源码确定 SendSmsRequest 有哪些属性可以设置
            * 属性可能是基本类型，也可能引用了另一个数据结构
            * 推荐使用 IDE 进行开发，可以方便地跳转查阅各个接口和数据结构的文档说明 */
            // let req = new models.SendSmsRequest();

            /* 基本类型的设置:
            * SDK 采用的是指针风格指定参数，即使对于基本类型也需要用指针来对参数赋值
            * SDK 提供对基本类型的指针引用封装函数
            * 帮助链接：
            * 短信控制台：https://console.cloud.tencent.com/smsv2
            * sms helper：https://cloud.tencent.com/document/product/382/3773
            */
            /* 短信应用 ID: 在 [短信控制台] 添加应用后生成的实际 SDKAppID，例如1400006666 */
            // req.SmsSdkAppid = "1400506356";

            /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，可登录 [短信控制台] 查看签名信息 */
            // req.Sign = "shumyanlong";

            /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
            // req.ExtendCode = "";

            /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
            // req.SenderId = "";

            /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
            // req.SessionContext = "";

            /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
            * 例如+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
            // req.PhoneNumberSet = ["+8617665687264"];

            /* 模板 ID: 必须填写已审核通过的模板 ID，可登录 [短信控制台] 查看模板 ID */
            // req.TemplateID = "361644";

            /* 模板参数: 若无模板参数，则设置为空*/
            // req.TemplateParamSet = ["6666"];

            // 通过 client 对象调用想要访问的接口，需要传入请求对象以及响应回调函数
            // client.SendSms(req, function callback(err, response) {
            //     // 请求异常返回，打印异常信息
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     // 请求正常返回，打印 response 对象
            //     console.log(response.to_json_string());
            // });

            // client.SendSms(req).then(
            //     (data) => {
            //         console.log(data);
            //     },
            //     (err) => {
            //         console.log("error", err);
            //     }
            // )
        }
        // const testclick = () => {
        //     console.log(1)
        // };
        // const seen1 = ref(false);
        // const onMouseOver1 = () => {
        //     seen1.value=true
        // };
        // const onMouseOut1 = () => {
        //     seen1.value=false
        // };
        // const seen2 = ref(false);
        // const onMouseOver2 = () => {
        //     seen2.value=true
        // };
        // const onMouseOut2 = () => {
        //     seen2.value=false
        // };
        // const seen3 = ref(false);
        // const onMouseOver3 = () => {
        //     seen3.value=true
        // };
        // const onMouseOut3 = () => {
        //     seen3.value=false
        // };
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
            testbutton
            // testclick,
            // seen1,
            // onMouseOver1,
            // onMouseOut1,
            // seen2,
            // onMouseOver2,
            // onMouseOut2,
            // seen3,
            // onMouseOver3,
            // onMouseOut3,
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
/* .disabled .el-upload--picture-card {
    display: none;
} */
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
/* .file {
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
} */
/* .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
} */
/* .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
} */
/* .uploadimg{
    width:100px;
    height:100px;
    border-radius: 50%;
  } */
/* .image{
    height: 360px;
    width: auto;
} */
/* .father {
    width: 200px;
    height: 200px;
    background: #555;
} */
/* .firstson {
    width: 50px;
    height: 50px;
    background: rgb(252, 3, 3);
} */
/* .secondson {
    width: 50px;
    height: 50px;
    background: rgb(3, 252, 45);
} */

/* .thirdson {
    width: 50px;
    height: 50px;
    background: rgb(49, 3, 252);
} */

</style>