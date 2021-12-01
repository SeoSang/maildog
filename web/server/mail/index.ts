import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

async function main() {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'ddrrpg2011@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    }),
  )

  const info = await transporter.sendMail({
    from: '"MailDog ð" <foo@example.com>', // sender address
    to: 'ddrrpg@naver.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
}

main().catch(console.error)
