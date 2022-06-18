import Vue from 'vue'
import {
  Button,
  Header,
  Container,
  Aside,
  Main,
  Backtop,
  Icon,
  Col,
  Row,
  Autocomplete,
  Avatar,
  Scrollbar,
  Card,
  Image,
  Table,
  TableColumn,
  Message,
  Notification,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Input
} from 'element-ui'

Vue.use(Button)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Autocomplete)
Vue.use(Avatar)
Vue.use(Scrollbar)
Vue.use(Card)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Input)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
