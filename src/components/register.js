import table from './kubUI/table/index'
import search from './kubUI/search/index'
import breadcrumb from './kubUI/breadcrumb/index'
import pagination from './kubUI/pagination/index'
import deldialog from './kubUI/dialog/index'


const install = function(Vue){
  if(install.installed) return
  Vue.component(table.name, table);
  Vue.component(search.name, search);
  Vue.component(breadcrumb.name, breadcrumb);
  Vue.component(pagination.name, pagination);
  Vue.component(deldialog.name, deldialog);

}
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export default {
  install
}