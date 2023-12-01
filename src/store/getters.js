const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  groupList: state => state.user.groupList,
  userType: state => state.user.userType,
  userData: state => state.user.userData,
}
export default getters
