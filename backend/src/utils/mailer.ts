import { Resend } from 'resend'

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.4; max-width:480px;">
      <h3>Reset your password</h3>
      <p>We received a request to reset your <strong>StartupVisors</strong> password.</p>
      <p>Click the button below. This link expires in <strong>15 minutes</strong>.</p>
      <a href="${resetLink}" style="
        display:inline-block;
        margin:16px 0;
        padding:12px 24px;
        background:#2563eb;
        color:#ffffff;
        border-radius:8px;
        text-decoration:none;
        font-weight:600;
        font-size:15px;
      ">Reset Password</a>
      <p>If the button doesn't work, copy this link into your browser:</p>
      <p style="word-break:break-all; color:#4b5563; font-size:13px;">${resetLink}</p>
      <hr style="margin:24px 0; border:none; border-top:1px solid #e5e7eb;" />
      <p style="color:#9ca3af; font-size:12px;">If you didn't request this, you can safely ignore this email. Your password won't change.</p>
    </div>
  `

  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Reset your StartupVisors password',
    html,
  })
}