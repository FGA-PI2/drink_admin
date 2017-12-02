// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .end()
  },
  'Test if user cant log with wrong password': (browser) => {
    const devServer = browser.globals.devServerURL
    
    browser
      .url(devServer)
    .setValue('#login > form > div:nth-child(1) > div > div > input', 'jose@maciel.com.br')
    .setValue('#login > form > div:nth-child(3) > div > div > input', '1234')
    .click('#login > form > div:nth-child(5) > div > button')
    .expect.element('body > div.v-transfer-dom > div.ivu-modal-wrap > div > div > div > div > div.ivu-modal-confirm-body > div:nth-child(2) > center').text.to.contain('Email ou senha Incorretas!').before(10000)
  },
  'Test if user cant log with no-admin account': (browser) => {
    const devServer = browser.globals.devServerURL
    
    browser
      .url(devServer)
    .setValue('#login > form > div:nth-child(1) > div > div > input', 'pedro@email.com')
    .setValue('#login > form > div:nth-child(3) > div > div > input', '123')
    .click('#login > form > div:nth-child(5) > div > button')
    .expect.element('body > div.v-transfer-dom > div.ivu-modal-wrap > div > div > div > div > div.ivu-modal-confirm-body > div:nth-child(2) > center').text.to.contain('Sua conta não é uma conta administrativa!').before(10000)
  },
  'Test if user can loggin': (browser) => {
    const devServer = browser.globals.devServerURL
    
    browser
      .url(devServer)
    .setValue('#login > form > div:nth-child(1) > div > div > input', 'admin@email.com')
    .setValue('#login > form > div:nth-child(3) > div > div > input', '123')
    .click('#login > form > div:nth-child(5) > div > button')
    browser.pause(10000)
    browser.assert.urlEquals(devServer+'/#/home')
  },
  'Test if can delete drink': (browser) => {
    const devServer = browser.globals.devServerURL
    
    browser
      .url(devServer)
    .setValue('#login > form > div:nth-child(1) > div > div > input', 'admin@email.com')
    .setValue('#login > form > div:nth-child(3) > div > div > input', '123')
    .click('#login > form > div:nth-child(5) > div > button')
    .pause(10000)
    .click('#app > div > div > div.layout-menu-left.ivu-col.ivu-col-span-5 > ul > li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected > span')
    .click('#app > div > div > div.ivu-col.ivu-col-span-19 > div.layout-content > div > div > div > div:nth-child(1) > div.ivu-card-body > button')
    .click('#app > div > div > div.ivu-col.ivu-col-span-19 > div.layout-content > div > div > div > div:nth-child(1) > div.ivu-card-body > div > div > div.ivu-table-body > table > tbody > tr:nth-child(1) > td.ivu-table-column-center > div > div > button.ivu-btn.ivu-btn-error.ivu-btn-small')
    .click('body > div:nth-child(4) > div.ivu-modal-wrap > div > div > div.ivu-modal-footer > div > button')
    .expect.element('#app > div > div > div.ivu-col.ivu-col-span-19 > div.layout-content > div > div > div > div:nth-child(1) > div.ivu-card-body > div > div > div.ivu-table-body > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > span').text.to.contain('Vodka').before(10000)
  },
  'Test if can create drink': (browser) => {
    const devServer = browser.globals.devServerURL
    
    browser
      .url(devServer)
    .setValue('#login > form > div:nth-child(1) > div > div > input', 'admin@email.com')
    .setValue('#login > form > div:nth-child(3) > div > div > input', '123')
    .click('#login > form > div:nth-child(5) > div > button')
    .pause(10000)
    .click('#app > div > div > div.layout-menu-left.ivu-col.ivu-col-span-5 > ul > li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected > span')
    .click('#app > div > div > div.ivu-col.ivu-col-span-19 > div.layout-content > div > div > div > div:nth-child(1) > div.ivu-card-body > button')
    .setValue('body > div:nth-child(3) > div.ivu-modal-wrap > div > div > div.ivu-modal-body > form > div:nth-child(1) > div > div > input', 'Rum')
    .setValue('body > div:nth-child(3) > div.ivu-modal-wrap > div > div > div.ivu-modal-body > form > div:nth-child(2) > div > div > div.ivu-input-number-input-wrap > input', '35')
    .setValue('body > div:nth-child(3) > div.ivu-modal-wrap > div > div > div.ivu-modal-body > form > div:nth-child(3) > div > div > div.ivu-input-number-input-wrap > input', '1000')
    .setValue('body > div:nth-child(3) > div.ivu-modal-wrap > div > div > div.ivu-modal-body > form > div:nth-child(4) > div > div > div.ivu-input-number-input-wrap > input', '1000')
    .setValue('body > div:nth-child(3) > div.ivu-modal-wrap > div > div > div.ivu-modal-body > form > div:nth-child(5) > div > div > div.ivu-input-number-input-wrap > input', '')
    .assert.urlEquals(devServer+'/#/home')
  },

}
