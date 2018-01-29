import utils from '../utils'

describe('Appearance', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('go to configurations and change scheme', function () {
    return this.app.client
      .click('#sidebar #toggle')
      .waitForVisible('.btn[title="Configurations"]')
      .click('.btn[title="Configurations"]')
      .waitForVisible('#configurations .schemes')
      .click('#configurations .schemes .select')
      .waitForVisible('#context-menu')
      .click('#context-menu .item[data-index="0"]')
      .getAttribute('#app', 'class')
      .then(className => {
        expect(className).to.have.string('scheme-sharp')
      })
      .click('#configurations .schemes .select')
      .waitForVisible('#context-menu')
      .click('#context-menu .item[data-index="1"]')
      .getAttribute('#app', 'class')
      .then(className => {
        expect(className).to.have.string('scheme-smooth')
      })
      .catch(utils.error)
  })
})
