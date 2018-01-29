import electron from 'electron'
import { Application } from 'spectron'

export default {
  beforeEach () {
    this.timeout(10000)
    this.app = new Application({
      path: electron,
      args: ['dist/electron/main.js'],
      startTimeout: 10000,
      waitTimeout: 10000
    })

    return this.app.start()
  },

  afterEach () {
    this.timeout(10000)

    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  },

  error (error) {
    console.warn("ERROR", error)
  }
}
