const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const MailComposer = require('nodemailer/lib/mail-composer');
const random = require('randomstring');

// Load Input Validation
const validateForgotInput = require('../../validation/forgot');
const validateResetInput = require('../../validation/reset');

// Load User model
const User = require('../../models/User');
// Load Temporary model
const Temp = require('../../models/Temp');

const api_key = process.env.MAILGUN_KEY || require('../../config/keys').mailgunKey;
const domain = process.env.MAILGUN_DOMAIN || require('../../config/keys').mailgunDomain;
const mg = require('mailgun-js')({apiKey: api_key, domain: domain});

// @route   POST api/email/sendApplicationAlertsRegistered
// @desc    Send registered account email
// @access  Public
router.post('/sendApplicationAlertsRegistered', (req, res) => {

  let errors = {};

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      if (req.body.language = "es") {
        errors.email = `No puede encontrar la nueva cuenta`;
        return res.status(400).json(errors);
      } else {
        errors.email = `Can't find User`;
        return res.status(400).json(errors);
      }
    } else {
      const hash = random.generate();
      if (req.body.language = "es") {
        const confirmEmail = `https://www.vendaval.space/verificar/${hash}`;

        const data = {
          from: "Vendaval Equipo <no-responda@vendaval.space>",
          to: req.body.email,
          subject: "Welcome",
          text: `
          Hola ${user.name}, Gracias por crear su cuenta en Vendaval.
          Su viaje a piensar, apprender, y crear con el communidad global empieza ya.
          Por favor usa el hiperenlace para confirmar su cuenta:
          ${confirmEmail}
          Te vemos en la red!
          - Vendaval Equipo
          `,
          html:
          `
          <div style="border-radius:20px;margin:10px;padding:10px;background-color:#17a2b8;">
            <div style="border-radius:20px;padding:20px;background-color:#f8f9fa;">
              <p style="font-size:2rem;font-weight:bold;text-align:center;">Vendaval</p>
              <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>vientos</i> de <strong>cambio</strong></p>
              <p style="margin-top:20px;margin-bottom:20px;">Hola ${user.name},</p>
              <p style="margin-top:10px;margin-bottom:25px;">
                Gracias por creando su cuenta en Vendaval.
                Su viaje a piensar, apprender, y crear con el communidad global empieza ya.
              </p>
              <p style="margin-bottom:5px;">
                Por favor usa el hiperenlace para confirmar su cuenta:
              </p>
              <a href="${confirmEmail}">${confirmEmail}</a>
              <p style="margin-top:25px;">Te vemos en la red!</p>
              <p>- Vendaval Equipo</p>
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
      } else {
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
              <p style="text-align:center;padding-bottom:5px;border-bottom:1px solid grey;"><i>winds</i> of <strong>change</strong></p>
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
    }
  });
});

// @route   POST api/email/resendApplicationAlertsRegistered
// @desc    Resend registered account email
// @access  Public
router.post('/resendApplicationAlertsRegistered', (req, res) => {

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



// @route   POST api/email/sendApplicationAlertsForgot
// @desc    Send forgot password email
// @access  Public
router.post('/sendApplicationAlertsForgot', (req, res) => {

  const { errors, isValid } = validateForgotInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

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

// @route   POST api/email/resendApplicationAlertsForgot
// @desc    Resend forgot password email
// @access  Public
router.post('/resendApplicationAlertsForgot', (req, res) => {

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
                <p style="margin-top:25px;">Let us know if you need anything else!</p>
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



// @route   POST api/email/sendApplicationAlertsUpdated
// @desc    Send user validation email
// @access  Private
router.post('/sendApplicationAlertsUpdated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    let errors = {};
    let nChange;
    let eChange;
    let pChange;
    let nChangef;
    let eChangef;
    let pChangef;

    const hash = random.generate();
    const confirmEmail = `https://www.vendaval.space/update/${hash}`;

    if (req.body.eChange) {
      eChange = `Primary Email changed from ${req.body.originalEmail} to ${req.body.email}`;
      eChangef = `<li>Primary Email changed from ${req.body.originalEmail} to ${req.body.email}</li>`;

      if (req.body.nChange) {
        nChange = `Name changed from ${req.body.originalName} to ${req.body.name}`;
        nChangef = `<li>Name changed from ${req.body.originalName} to ${req.body.name}</li>`;
      }

      if (req.body.pChange) {
        pChange = `Password updated`;
        pChangef = `<li>Password updated</li>`;
      }

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

      //Send email to old email address to advise of update
      const data2 = {
        from: "Vendaval Team <no-reply@vendaval.space>",
        to: req.body.originalEmail,
        subject: "Account Changes",
        text: `
        Hey ${req.body.name}, We received the following changes to your account:
          ${nChange ? nChange : ''}
          ${eChange ? eChange : ''}
          ${pChange ? pChange : ''}

        If you did not request these changes, please contact us immediately at contacto@vendaval.space

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
              We received the following changes to your account:
            </p>

            <ul>
              ${nChangef ? nChangef : ''}
              ${eChangef ? eChangef : ''}
              ${pChangef ? pChangef : ''}
            </ul>

            <p style="margin-bottom:5px;">
            If you did not request these changes, please contact us immediately at contacto@vendaval.space
            </p>
            <p style="margin-top:25px;">Thank you!</p>
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

      var mail2 = new MailComposer(data2);

      mail2.compile().build((err, message) => {
          var dataToSend = {
              to: req.body.originalEmail,
              message: message.toString('ascii')
          };

          mg.messages().sendMime(dataToSend, (sendError, body) => {
              if (sendError) {
                  console.log(sendError);
                  return;
              }
          });
      });

    } else {

      if (req.body.nChange) {
        nChange = `Name changed from ${req.body.originalName} to ${req.body.name}`;
        nChangef = `<li>Name changed from ${req.body.originalName} to ${req.body.name}</li>`;
      }

      if (req.body.pChange) {
        pChange = `Password updated`;
        pChangef = `<li>Password updated</li>`;
      }

      //Send email to old email address to advise of update
      const data2 = {
        from: "Vendaval Team <no-reply@vendaval.space>",
        to: req.body.email,
        subject: "Account Changes",
        text: `
        Hey ${req.body.name}, We received the following changes to your account:
          ${nChange ? nChange : ''}
          ${pChange ? pChange : ''}

        If you did not request these changes, please contact us immediately at contacto@vendaval.space

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
              We received the following changes to your account:
            </p>

            <ul>
              ${nChangef ? nChangef : ''}
              ${pChangef ? pChangef : ''}
            </ul>

            <p style="margin-bottom:5px;">
            If you did not request these changes, please contact us immediately at contacto@vendaval.space
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

    }

    const newTemp = new Temp({
      type: 'updated',
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

module.exports = router;
