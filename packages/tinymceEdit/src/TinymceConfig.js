const getGlobal = () => (typeof window !== 'undefined' ? window : global)


const getTinymce = (jsPath) => {
  const global = getGlobal()
  const tinymce = global && global.tinymce ? global.tinymce : null
  if (tinymce) {
    tinymce.suffix = '.min'
    tinymce.baseURL = jsPath
  }
  return tinymce
}
/**
 * 事件信息
 */
const validEvents = [
  'onActivate',
  'onAddUndo',
  'onBeforeAddUndo',
  'onBeforeExecCommand',
  'onBeforeGetContent',
  'onBeforeRenderUI',
  'onBeforeSetContent',
  'onBeforePaste',
  'onBlur',
  'onChange',
  'onClearUndos',
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onDblclick',
  'onDeactivate',
  'onDirty',
  'onDrag',
  'onDragDrop',
  'onDragEnd',
  'onDragGesture',
  'onDragOver',
  'onDrop',
  'onExecCommand',
  'onFocus',
  'onFocusIn',
  'onFocusOut',
  'onGetContent',
  'onHide',
  'onInit',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onLoadContent',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onNodeChange',
  'onObjectResizeStart',
  'onObjectResized',
  'onObjectSelected',
  'onPaste',
  'onPostProcess',
  'onPostRender',
  'onPreProcess',
  'onProgressState',
  'onRedo',
  'onRemove',
  'onReset',
  'onSaveContent',
  'onSelectionChange',
  'onSetAttrib',
  'onSetContent',
  'onShow',
  'onSubmit',
  'onUndo',
  'onVisualAid'
]

/**
 * 判断是否是tinymce事件
 * @param key 事件的key
 */
const isTinymecEvent = (key) => validEvents.indexOf(key) !== -1

/**
 * 默认工具
 */
const defaultToolbar = [
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
]
/**
 * 默认的插件
 */
const defaultPlugins = [
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
]


/**
 * 将toolbar转为list方便处理
 * @param toolbars toolbars列表
 */
const convertToolbarsToArray = (toolbars) => {
  const toolbarList = []
  toolbars.forEach(item => {
    const toolbarSecondList = item.split(' ')
      .map(toolbarItem => {
        return toolbarItem.trim()
      })
    toolbarList.push(toolbarSecondList)
  })
  return toolbarList
}

/**
 * 将toolbarList转为string
 * @param toolbarList toolbar列表
 */
const convertToolbarListToString = (toolbarList) => {
  return toolbarList.map(toolbars => {
    return toolbars.join(' ')
  }).join(' | ')
}

/**
 * 默认配置
 */
const defaultConfig = {
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

export {
  getTinymce,
  isTinymecEvent,
  defaultToolbar,
  defaultPlugins,
  convertToolbarsToArray,
  convertToolbarListToString,
  defaultConfig
}
