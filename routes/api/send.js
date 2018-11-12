const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// EmailService.js
const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
// Configure transport options
const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_KEY || require('../../config/keys.js').mailgunKey,
    domain: process.env.MAILGUN_DOMAIN || require('../../config/keys.js').mailgunDomain,
  }
}
const transport = mailgunTransport(mailgunOptions)
// EmailService
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport)
  }
  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail({
        from: 'Vendaval Team <contacto@vendaval.space>',
        to,
        subject,
        text,
      }, (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve(info)
        }
      })
    })
  }
}
module.exports = new EmailService()
