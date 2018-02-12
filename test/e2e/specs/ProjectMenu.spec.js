import utils from '../utils'

describe('ProjectMenu', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows project menu with expected items', function () {
    return this.app.client
      .click('#sidebar #toggle')
      .waitForVisible('.btn[title="Project"]')
      .click('.btn[title="Project"]')
      .waitForVisible('#context-menu')
      .getText('#context-menu')
      .then(text => {
        expect(text).to.have.string('New project')
        expect(text).to.have.string('Open')
        expect(text).to.have.string('Save')
        expect(text).to.have.string('Import')
        expect(text).to.have.string('Export')
        expect(text).to.have.string('Quit')
      })
  })
})
