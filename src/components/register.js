import table from './table/index'
import search from './search/index'
import breadcrumb from './breadcrumb/index'
import pagination from './pagination/index'


const install = function(Vue){
  if(install.installed) return
  Vue.component(table.name, table);
  Vue.component(search.name, search);
  Vue.component(breadcrumb.name, breadcrumb);
  Vue.component(pagination.name, pagination);

}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export default {
  install
}