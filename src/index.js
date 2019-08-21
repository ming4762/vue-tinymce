import Vue from 'vue'

import TinymceEdit from '../packages/tinymceEdit'

const components = [
  TinymceEdit
]

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


const installComponents = {
  install,
  ...components
}

Vue.use(installComponents)
