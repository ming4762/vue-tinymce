<template>
  <textarea :id="elementId"></textarea>
</template>

<script>

import { getTinymce, isTinymecEvent, defaultConfig, convertToolbarListToString, convertToolbarsToArray, defaultToolbar, defaultPlugins } from './TinymceConfig'
/**
 * 编辑器组件
  */
export default {
  name: 'vue-tinymce-edit',
  props: {
    // v-model绑定
    value: String,
    id: { type: String, default: () => {
        return 'tinymce_dom' + new Date().getTime()
      }
    },
    // 双向绑定触发事件，默认 change keyup undo redo
    modelEvents: {
      default: 'change keyup undo redo'
    },
    // 是否带有默认的插件
    withDefaultPlugins: { type: Boolean, default: true },
    // 插件
    plugins: { type: Array, default: () => [] },
    toolbars: { type: Array, default: () => [] },
    // 是否带有默认的toolbar
    withDefaultToolbar: { type: Boolean, default: false },
    // 配置信息
    config: { type: Object, default: () => { return {} } },
    jsPath: {
      type: String,
      required: true
    },
    uploadHandler: Function,
    language: {
      type: String,
      default: () => {
        let language = navigator.language
        if (language === 'zh-CN') {
          language = 'zh_CN'
        }
        return language
      }
    }
  },
  data () {
    return {
      // 编辑器对象
      editor: null,
      // 节点ID
      elementId: '',
      // 编辑内容
      currentContent: '',
      tinymce: null,
      defaultToolbarList: convertToolbarsToArray(defaultToolbar)
    }
  },
  created() {
    this.tinymce = getTinymce(this.jsPath)
    this.elementId = this.id
    this.currentContent = this.value || ""
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.tinymce.remove(this.editor)
  },
  watch: {
    /**
     * 监控内容变化
     */
    value (newValue, oldValue) {
      if (this.editor && this.currentContent !== newValue && newValue !== oldValue) {
        this.currentContent = newValue
        this.editor.setContent(newValue)
      }
    }
  },
  methods: {
    /**
     * 初始化编辑器
     */
    init () {
      const config = Object.assign({}, defaultConfig, this.config)
      config.toolbar = this.initToolbar()
      config.plugins = this.initPlugins()
      if (this.uploadHandler) {
        config.images_upload_handler = this.uploadHandler
      }
      const tinymceConfig = {
        ...config,
        selector: `#${this.elementId}`,
        language: this.language,
        setup: (editor) => {
          this.editor = editor
          // 绑定初始化事件
          editor.on('init', this.initEditEvent)
        }
      }
      this.tinymce.init(tinymceConfig)
    },
    initToolbar () {
      let toolbarList = this.getPropToolbarList()
      const propToolbarList = this.getPropToolbarList()
      if (toolbarList.length === 0) {
        toolbarList = this.defaultToolbarList
      } else {
        if (this.withDefaultToolbar) {
          // 去除重复的toolbar
          const propToolBarlist = []
          propToolbarList.forEach(toolbars => {
            toolbars.forEach(item => {
              propToolBarlist.push(item)
            })
          })
          // 存储重复的
          const repeatedToobarList = []
          let i = this.defaultToolbarList.length
          while (i --) {
            const toolbars = this.defaultToolbarList[i]
            let j = toolbars.length
            while (j --) {
              if (propToolBarlist.indexOf(toolbars[j]) > -1) {
                repeatedToobarList.push(toolbars[j])
                toolbars.splice(j, 1)
              }
            }
            if (toolbars.length === 0) {
              this.defaultToolbarList.splice(i, 1)
            }
          }
          // 进行警告
          if (repeatedToobarList.length > 0) {
            /* eslint-disable */
            console.warn('toolbar重复', repeatedToobarList)
          }
          toolbarList = this.defaultToolbarList.concat(propToolbarList)
        }
      }
      return convertToolbarListToString(toolbarList)
    },
    /**
     * 初始化插件
     */
    initPlugins () {
      if (this.plugins.length === 0) {
        return defaultPlugins
      } else {
        if (this.withDefaultPlugins) {
          return [].concat(this.plugins, defaultPlugins)
        } else {
          return this.plugins
        }
      }
    },
    /**
     * 获取组件传递的toolbar
     * @returns {Array}
     */
    getPropToolbarList () {
      return convertToolbarsToArray(this.toolbars)
    },
    /**
     * 初始化编辑器事件
     */
    initEditEvent (e) {
      // 设置编辑器的内容
      this.editor.setContent(this.currentContent)
      // v-model绑定
      if (this.$listeners.input) {
        this.bindModelHandlers()
      }
      // 绑定事件
      this.bindHandlers(e)
    },
    /**
     * 绑定v-model触发事件
     */
    bindModelHandlers () {
      const events = Array.isArray(this.modelEvents) ? this.modelEvents.join(' ') : this.modelEvents
      this.editor.on(events, () => {
        this.currentContent = this.editor.getContent()
        this.$emit('input', this.currentContent)
      })
    },
    /**
     * 绑定编辑器事件
     */
    bindHandlers (initEvent) {
      Object.keys(this.$listeners)
        .filter(isTinymecEvent)
        .forEach((key) => {
          const handler = this.$listeners[key]
          if (typeof handler === 'function') {
            if (key === 'onInit') {
              // 初始化事件
              handler(initEvent, this.editor)
            } else {
              this.editor.on(key.substring(2), (e) => handler(e, this.editor))
            }
          }
        })
    }
  }
}
</script>

<style>

</style>
