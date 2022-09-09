import ButtonGroup from './src/button-group.vue'

const ButtonName = 'xs-button-group'
const install = (app, options) => {
  app.component(ButtonName, ButtonGroup)
}

export { ButtonGroup }
export default { install }
