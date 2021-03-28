<template>
  <div class="tinymce-box">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @click="onClick">
    </editor>
    <!-- <button @click="submittest">
        提交
    </button> -->
    <!-- <div v-html="myValue"></div> -->
  </div>
</template>

<script>
// 文档 http://tinymce.ax-z.cn/
// 引入组件
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import store from '../store'
import axios from 'axios'

// 引入富文本编辑器主题的js和css
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/autosave'
// import 'tinymce/plugins/save'
export default {
  components: {
    Editor
  },
  name: 'Tinymce',
  props: {
    // 默认的富文本内容
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: window.location.origin ? window.location.origin : ''
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'autosave link lists image code table wordcount media preview fullscreen help'
    },
    toolbar: {
      type: [String, Array],
      default: 'restoredraft bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image media | removeformat | fullscreen preview'
    }
  },
  data () {
    return {
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        // skin_url: 'tinymce/skins/ui/oxide-dark', // 暗色系
        convert_urls: false,
        height: 500,
        selector: '#tinydemo',
        autosave_retention: "10m",
        // content_css（为编辑区指定css文件）,加上就不显示字数统计了
        // content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
        // （指定需加载的插件）
        plugins: this.plugins,
        toolbar: this.toolbar, // （自定义工具栏）

        resize: false,

        statusbar: true, // 底部的状态栏
        menubar: 'file edit insert view format table tools help', // （1级菜单）最上方的菜单
        branding: false, // （隐藏右下角技术支持）水印“Powered by TinyMCE”

        // images_upload_url: 'http://localhost:3000/upload/test',
        // images_upload_base_path: 'http://localhost:3000/',

        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        // images_upload_handler: (blobInfo, success, failure) => {
        //   // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        //   // success(img)
        //   success(blobInfo)
        //   console.log(blobInfo)
        //   console.log(failure)
        // }
        images_upload_handler: (blobInfo, success, failure) => {
          let formData = new FormData();
          console.log(blobInfo.filename())
          formData.append('file',blobInfo.blob())
          axios.post('/upload/test', formData).then(Response =>{
            console.log(Response.data.url)
            console.log(Response)
            if (Response.status == 200){
              success(Response.data.url)
            } else {
              console.log(failure) 
            }
          })

        }
        
      },
      myValue: this.value
    }
  },
  mounted () {
    console.log(window)
    tinymce.init({})
    // console.log(myValue)
    // console.log(this.value)
    // this.value = '<p>qwe</p>'
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      this.$emit('onClick', e, tinymce);
      // console.log(this.myValue)
      // console.log(this.myValue);
      // 有望通过这种方法实现草稿功能
      // this.myValue = this.myValue + '<p>qwe</p>'
    },
    tinytest() {
      console.log('test');
      this.myValue = store.state.articleDetail.content;
      // this.$emit('test', tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.myValue = ''
    },
    submittest () {
        const base64Data = this.myValue
        const pattern = new RegExp('<img.*?/>')
        // new RegExp(pattern)
        console.log(String(pattern.exec(base64Data)))
        // const base64Data = this.myValue.split("<(\\S*?)[^>]*>.*?|<.*? />")
        // console.log(base64Data)
        console.log(this.myValue)
        axios.post('/upload/article', {
            essay: this.myValue
        });
    }
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}

</script>
<style scoped>

</style>
