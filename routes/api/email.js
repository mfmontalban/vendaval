const express = require('express');
const router = express.Router();
const MailComposer = require('nodemailer/lib/mail-composer');
const random = require('randomstring');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateResetInput = require('../../validation/reset');

// Load User model
const User = require('../../models/User');
// Load Temporary model
const Temp = require('../../models/Temp');

const api_key = process.env.MAILGUN_KEY || require('../../config/keys').mailgunKey;
const domain = process.env.MAILGUN_DOMAIN || require('../../config/keys').mailgunDomain;
const mg = require('mailgun-js')({apiKey: api_key, domain: domain});

// @route   POST api/email/sendRegister
// @desc    Send user validation email
// @access  Public
router.post('/sendRegister', (req, res) => {

  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = `Can't find User`;
      return res.status(400).json(errors);
    } else {
      const hash = random.generate();
      const confirmEmail = `https://www.vendaval.space/verify/${hash}`;

      const data = {
        from: "Vendaval Team <no-reply@vendaval.space>",
        to: req.body.email,
        subject: "Welcome",
        text: `
        Hey ${user.name}, Thanks for creating your Vendaval account.
        Your journey to think, learn, and create with the our global community starts now.
        Please use the link below to confirm your account:
        ${confirmEmail}
        We'll see you online!
        - Vendaval Team
        `,
        html:
        `
        <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
          <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
            <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
            <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
            <p style="margin-top:20px;margin-bottom:20px;">Hey ${user.name},</p>
            <p style="margin-top:10px;margin-bottom:25px;">
              Thanks for creating your Vendaval account.
              Your journey to think, learn, and create with the our global community starts now.
            </p>
            <p style="margin-bottom:5px;">
              Please use the link below to confirm your account:
            </p>
            <a href="${confirmEmail}">${confirmEmail}</a>
            <p style="margin-top:25px;">We'll see you online!</p>
            <p>- Vendaval Team</p>
          </div>
        </div>
        `
      };

      var mail = new MailComposer(data);

      mail.compile().build((err, message) => {
          var dataToSend = {
              to: req.body.email,
              message: message.toString('ascii')
          };

          mg.messages().sendMime(dataToSend, (sendError, body) => {
              if (sendError) {
                  console.log(sendError);
                  return;
              }
          });
      });

      const newTemp = new Temp({
        type: 'registered',
        user: user._id,
        key: hash
      });

      newTemp
        .save()
        .then(temp => res.json(temp))
        .catch(err => console.log(err));

    }
  });
});

// @route   POST api/email/sendUpdate
// @desc    Send user validation email
// @access  Private
router.post('/sendUpdate',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    let errors = {};

    const hash = random.generate();
    const confirmEmail = `https://www.vendaval.space/update/${hash}`;

    //Send email to new email address
    const data = {
      from: "Vendaval Team <no-reply@vendaval.space>",
      to: req.body.email,
      subject: "Verify your email address",
      text: `
      Hey ${req.body.name}, We received your request to update your email address.
      Please use the link below to confirm your request:
      ${confirmEmail}
      We'll see you online!
      - Vendaval Team
      `,
      html:
      `
      <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
        <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
          <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
          <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
          <p style="margin-top:20px;margin-bottom:20px;">Hey ${req.body.name},</p>
          <p style="margin-top:10px;margin-bottom:25px;">
            We received your request to update your email address.
          </p>
          <p style="margin-bottom:5px;">
            Please use the link below to confirm your request:
          </p>
          <a href="${confirmEmail}">${confirmEmail}</a>
          <p style="margin-top:25px;">We'll see you online!</p>
          <p>- Vendaval Team</p>
        </div>
      </div>
      `
    };

    var mail = new MailComposer(data);

    mail.compile().build((err, message) => {
        var dataToSend = {
            to: req.body.email,
            message: message.toString('ascii')
        };

        mg.messages().sendMime(dataToSend, (sendError, body) => {
            if (sendError) {
                console.log(sendError);
                return;
            }
        });
    });

    //Send email to old email address to advise of update
    const data2 = {
      from: "Vendaval Team <no-reply@vendaval.space>",
      to: req.user.email,
      subject: "Request to update your email address",
      text: `
      Hey ${req.body.name}, We received your request to update your email address.

      If you did you submit this request, please contact us immediately at contacto@vendaval.space
      Otherwise, please disregard this email notification.

      Thank you!
      - Vendaval Team
      `,
      html:
      `
      <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
        <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
          <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
          <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
          <p style="margin-top:20px;margin-bottom:20px;">Hey ${req.body.name},</p>
          <p style="margin-top:10px;margin-bottom:25px;">
            We received your request to update your email address.
          </p>
          <p style="margin-bottom:5px;">
          If you did you submit this request, please contact us immediately at contacto@vendaval.space
          </p>
          <p style="margin-bottom:5px;">
          Otherwise, please disregard this email notification.
          </p>
          <p style="margin-top:25px;">Thank you!</p>
          <p>- Vendaval Team</p>
        </div>
      </div>
      `
    };

    var mail2 = new MailComposer(data2);

    mail2.compile().build((err, message) => {
        var dataToSend = {
            to: req.user.email,
            message: message.toString('ascii')
        };

        mg.messages().sendMime(dataToSend, (sendError, body) => {
            if (sendError) {
                console.log(sendError);
                return;
            }
        });
    });

    const newTemp = new Temp({
      type: 'registered',
      user: req.user.id,
      email: req.body.email,
      key: hash
    });

    Temp.findOne({ user: req.user.id }).then(temp => {
      if(temp) {
        temp.remove();
      }
    });

    newTemp
      .save()
      .then(temp => res.json(temp))
      .catch(err => console.log(err));
  }
);

// @route   POST api/email/resendRegister
// @desc    Resend user validation email
// @access  Public
router.post('/resendRegister', (req, res) => {

  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.json('sent');
    } else {
      if (user.isActive === true) {
        return res.json('sent');
      }
      else {
        const id = user._id;
        Temp.findOne({ user: id }).then(temp => {
          if(temp) {
            temp.remove();
          }
          const hash = random.generate();
          const confirmEmail = `https://www.vendaval.space/verify/${hash}`;

          const data = {
            from: "Vendaval Team <no-reply@vendaval.space>",
            to: req.body.email,
            subject: "Welcome",
            text: `
            Hey ${user.name}, Thanks for creating your Vendaval account.
            Your journey to think, learn, and create with the our global community starts now.
            Please use the link below to confirm your account:
            ${confirmEmail}
            We'll see you online!
            - Vendaval Team
            `,
            html:
            `
            <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
              <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
                <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
                <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
                <p style="margin-top:20px;margin-bottom:20px;">Hey ${user.name},</p>
                <p style="margin-top:10px;margin-bottom:25px;">
                  Thanks for creating your Vendaval account.
                  Your journey to think, learn, and create with the our global community starts now.
                </p>
                <p style="margin-bottom:5px;">
                  Please use the link below to confirm your account:
                </p>
                <a href="${confirmEmail}">${confirmEmail}</a>
                <p style="margin-top:25px;">We'll see you online!</p>
                <p>- Vendaval Team</p>
              </div>
            </div>
            `
          };

          var mail = new MailComposer(data);

          mail.compile().build((err, message) => {
              var dataToSend = {
                  to: req.body.email,
                  message: message.toString('ascii')
              };

              mg.messages().sendMime(dataToSend, (sendError, body) => {
                  if (sendError) {
                      console.log(sendError);
                      return;
                  }
              });
          });

          const newTemp = new Temp({
            type: 'registered',
            user: id,
            key: hash
          });

          newTemp
            .save()
            .then(temp => res.json(temp))
            .catch(err => console.log(err));

        });
      }
    }
  });
});

// @route   GET api/email/verifyRegister
// @desc    Confirm user validation email
// @access  Public
router.get('/verifyRegister/:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find no validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'registered') {
        verify.expired = `Ain't a registered validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            temp.remove();
            user.isActive = true;
            verify.success = "true";
            user
            .save()
            .then(active => res.json(verify))
            .catch(err => res.json(err));
          }
        });
      }
    }
  });
});

// @route   GET api/email/verifyUpdate
// @desc    Confirm user validation email
// @access  Public
router.get('/verifyUpdate/:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find no validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'registered') {
        verify.expired = `Ain't a registered validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            temp.remove();
            user.email = temp.email;
            verify.success = "true";
            user
            .save()
            .then(active => res.json(verify))
            .catch(err => res.json(err));
          }
        });
      }
    }
  });
});



// @route   POST api/email/forgotPassword
// @desc    Send forgot password email
// @access  Public
router.post('/sendForgot', (req, res) => {

  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.json('sent');
    } else {
      const id = user._id;
      Temp.findOne({ user: id }).then(temp => {
        if(temp) {
          temp.remove();
          const hash = random.generate();
          const forgotPassword = `https://www.vendaval.space/reset/${hash}`;

          const data = {
            from: "Vendaval Team <no-reply@vendaval.space>",
            to: req.body.email,
            subject: "Reset Password",
            text: `
            Hey ${user.name}, We received your password reset request.
            Please use the link below to create a new password:
            ${forgotPassword}
            Let us know if need anything else!
            - Vendaval Team
            `,
            html:
            `
            <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
              <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
                <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
                <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
                <p style="margin-top:20px;margin-bottom:20px;">Hey ${user.name},</p>
                <p style="margin-top:10px;margin-bottom:25px;">
                  We received your request to reset your password
                </p>
                <p style="margin-bottom:5px;">
                  Please use the link below to create a new password:
                </p>
                <a href="${forgotPassword}">${forgotPassword}</a>
                <p style="margin-top:25px;">Let us know if need anything else!</p>
                <p>- Vendaval Team</p>
              </div>
            </div>
            `
          };

          var mail = new MailComposer(data);

          mail.compile().build((err, message) => {
              var dataToSend = {
                  to: req.body.email,
                  message: message.toString('ascii')
              };

              mg.messages().sendMime(dataToSend, (sendError, body) => {
                  if (sendError) {
                      console.log(sendError);
                      return;
                  }
              });
          });

          const newTemp = new Temp({
            type: 'forgot',
            user: user._id,
            key: hash
          });

          newTemp
            .save()
            .then(temp => res.json(temp))
            .catch(err => console.log(err));
        }
        else {
          const hash = random.generate();
          const forgotPassword = `https://www.vendaval.space/reset/${hash}`;

          const data = {
            from: "Vendaval Team <no-reply@vendaval.space>",
            to: req.body.email,
            subject: "Reset Password",
            text: `
            Hey ${user.name}, We received your password reset request.
            Please use the link below to create a new password:
            ${forgotPassword}
            Let us know if need anything else!
            - Vendaval Team
            `,
            html:
            `
            <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
              <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
                <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
                <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
                <p style="margin-top:20px;margin-bottom:20px;">Hey ${user.name},</p>
                <p style="margin-top:10px;margin-bottom:25px;">
                  We received your request to reset your password
                </p>
                <p style="margin-bottom:5px;">
                  Please use the link below to create a new password:
                </p>
                <a href="${forgotPassword}">${forgotPassword}</a>
                <p style="margin-top:25px;">Let us know if need anything else!</p>
                <p>- Vendaval Team</p>
              </div>
            </div>
            `
          };

          var mail = new MailComposer(data);

          mail.compile().build((err, message) => {
              var dataToSend = {
                  to: req.body.email,
                  message: message.toString('ascii')
              };

              mg.messages().sendMime(dataToSend, (sendError, body) => {
                  if (sendError) {
                      console.log(sendError);
                      return;
                  }
              });
          });

          const newTemp = new Temp({
            type: 'forgot',
            user: user._id,
            key: hash
          });

          newTemp
            .save()
            .then(temp => res.json(temp))
            .catch(err => console.log(err));
        }
      });
    }
  });
});

// @route   GET api/email/verifyForgot
// @desc    Verify forgot password email
// @access  Public
router.get('/verifyForgot/:key', (req, res) => {
  let verify = {};

  Temp.findOne({ key: req.params.key }).then(temp => {
    if (!temp) {
      verify.expired = `Can't find validation key`;
      return res.json(verify);
    } else {
      if (temp.type !== 'forgot') {
        verify.expired = `Ain't a forgot validation key`;
        return res.json(verify);
      } else {
        const id = temp.user;
        User.findOne({ _id: id }).then(user => {
          if (!user) {
            verify.expired = `Can't find no user`;
            return res.json(verify);
          } else {
            verify.success = `Found em'`;
            return res.json(verify);
          }
        });
      }
    }
  });
});

// @route   POST api/email/resendForgot
// @desc    Resend forgot password email
// @access  Public
router.post('/resendForgot', (req, res) => {

  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.json('sent');
    } else {

      Temp.findOne({ user: user._id }).then(temp => {
        if (!temp) {
          return res.json('sent');
        } else {
          temp.remove();
          const hash = random.generate();
          const forgotPassword = `https://www.vendaval.space/reset/${hash}`;

          const data = {
            from: "Vendaval Team <no-reply@vendaval.space>",
            to: req.body.email,
            subject: "Reset Password",
            text: `
            Hey ${user.name}, We received your password reset request.
            Please use the link below to create a new password:
            ${forgotPassword}
            Let us know if need anything else!
            - Vendaval Team
            `,
            html:
            `
            <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
              <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
                <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
                <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
                <p style="margin-top:20px;margin-bottom:20px;">Hey ${user.name},</p>
                <p style="margin-top:10px;margin-bottom:25px;">
                  We received your request to reset your password
                </p>
                <p style="margin-bottom:5px;">
                  Please use the link below to create a new password:
                </p>
                <a href="${forgotPassword}">${forgotPassword}</a>
                <p style="margin-top:25px;">Let us know if you have any feedback!</p>
                <p>- Vendaval Team</p>
              </div>
            </div>
            `
          };

          var mail = new MailComposer(data);

          mail.compile().build((err, message) => {
              var dataToSend = {
                  to: req.body.email,
                  message: message.toString('ascii')
              };

              mg.messages().sendMime(dataToSend, (sendError, body) => {
                  if (sendError) {
                      console.log(sendError);
                      return;
                  }
              });
          });

          const newTemp = new Temp({
            type: 'forgot',
            user: user._id,
            key: hash
          });

          newTemp
            .save()
            .then(temp => res.json(temp))
            .catch(err => console.log(err));
        }
      });

    }
  });
});

module.exports = router;
