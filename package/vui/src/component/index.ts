import Button from './button'
import ButtonGroup from './button-group'

export default {
  install(app) {
    app.use(Button)
    app.use(ButtonGroup)
  },
}

export { Button, ButtonGroup }
