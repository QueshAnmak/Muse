const playwright = require('playwright');

const {startBrowser} = require('./browser')
const {startMeet} = require('./meet')

const browser = startBrowser()

const meetLink = "https://meet.google.com/fox-xdrt-nhs"
const meet = startMeet(browser, meetLink)