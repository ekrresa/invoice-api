import nodemailer from 'nodemailer'

import { renderVerifyEmail } from '@/emails/render.js'
import env from 'env.js'

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: true,
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
})

interface SendVerificationEmailArgs {
  name: string
  code: string
  email: string
}
export async function sendVerificationEmail(args: SendVerificationEmailArgs) {
  const verifyEmailHtml = await renderVerifyEmail({
    name: args.name,
    code: args.code,
  })

  return transporter.sendMail({
    html: verifyEmailHtml,
    from: '"Invoice API" <invoice.ekrresa.com>',
    to: args.email,
    subject: 'Email Verification',
  })
}
