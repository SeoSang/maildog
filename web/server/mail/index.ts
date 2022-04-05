import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

import { generatePhotoFrame, PhotoParam } from '@/server/mail/html'

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

export const sendMail = async (
  fromEmail = '"MailDog ð" <foo@example.com>',
  targetEmail: string,
  photoParams: PhotoParam[],
  alt = 'image',
) => {
  const info = await transporter.sendMail({
    from: fromEmail, // sender address
    to: targetEmail, // list of receivers
    subject: 'Here is Mail Dog 📧 🐕 !  ', // Subject line
    html: generatePhotoFrame(photoParams, alt), // html body
  })

  console.log('Message sent: %s', info.messageId)
}
