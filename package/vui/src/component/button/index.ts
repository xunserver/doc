import Button from './src/button.vue'

const ButtonName = 'xs-button'
const install = (app, options) => {
  app.component(ButtonName, Button)
}

export { Button }
export default install
