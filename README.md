# vue-tinymce

源码地址：[github-tinymce](https://github.com/ming4762/vue-tinymce)  
[tinymce官网地址](https://www.tiny.cloud/features)

## 使用说明
### 1、npm安装
### 2、直接引入
- 运行npm run lib进行打包，页面引入打包后的js文件vue-tinymce.umd.min.js
- 使用实例
~~~html
<vue-tinymce-edit
    :uploadHandler="handleUpload"
    :js-path="getPath('js/plugins/vue-tinymce/tinymce/4.8.3')" 
    v-model="content"/>
~~~

## vue-tinymce-edit组件

### Attributes
参数 | 说明 | 类型 | 可选值 | 默认值
-|-|-|-|-
v-model | 双向绑定 | string | | 
id | 编辑器ID| string | | 'tinymce_dom' + new Date().getTime()
modelEvents | 双向绑定触发事件，参考tinymce官方网站 | string | |change keyup undo redo
withDefaultPlugins | 是否使用默认插件 | boolean |  | true
plugins | 插件列表 参考tinymce官方网站 | Array | | []
withDefaultToolbar | 是否使用默认工具栏 | boolean | | true
toolbars | 工具列表 参考tinymce官方网站 | Array | | []
config | tinymce配置，参考tinymce官方网站 | object | | 
jsPath | tinymce js路径，必须设置| string | | 
uploadHandler | 上传操作执行器 | Function(blob, success, fail)
language | 语言，自定义语言需要添加语言包，去tinymce下载，目前已有中文语言包 | string | | 默认系统语言

### 默认工具
'styleselect',
  'fontselect',
  'formatselect',
  'fontsizeselect',
  'bold italic underline strikethrough',
  'image  media',
  'table',
  'alignleft aligncenter alignright alignjustify',
  'outdent indent',
  'numlist bullist',
  'preview link',
  'undo redo'
  
  ### 默认插件
  'importcss',
  'table',
  'advlist',
  'link',
  'image',
  'lists',
  'media',
  'textcolor',
  'preview',
  'powerpaste'
  
  ### 默认配置
  ~~~javascript
  {
  // 高度
  height: 500,
  // 主题
  // theme: 'modern',
  menubar: false,
  forced_root_block: 'p',
  force_p_newlines: true,
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
  importcss_append: true,
  powerpaste_word_import: 'propmt', // 参数可以是propmt, merge, clear，效果自行切换对比
  powerpaste_html_import: 'propmt', // propmt, merge, clear
  powerpaste_allow_local_images: true,
  insert_button_items: 'image link | inserttable',
  fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
  // 字体
  font_formats: `
    微软雅黑=微软雅黑;
    宋体=宋体;
    黑体=黑体;
    仿宋=仿宋;
    楷体=楷体;
    隶书=隶书;
    幼圆=幼圆;
    Andale Mono=andale mono,times;
    Arial=arial, helvetica,
    sans-serif;
    Arial Black=arial black, avant garde;
    Book Antiqua=book antiqua,palatino;
    Comic Sans MS=comic sans ms,sans-serif;
    Courier New=courier new,courier;
    Georgia=georgia,palatino;
    Helvetica=helvetica;
    Impact=impact,chicago;
    Symbol=symbol;
    Tahoma=tahoma,arial,helvetica,sans-serif;
    Terminal=terminal,monaco;
    Times New Roman=times new roman,times;
    Trebuchet MS=trebuchet ms,geneva;
    Verdana=verdana,geneva;
    Webdings=webdings;
    Wingdings=wingdings,zapf dingbats`
}
  ~~~
