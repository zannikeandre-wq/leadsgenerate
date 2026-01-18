import sgMail from '@sendgrid/mail';
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

export async function sendEmail(to, subject, message) {
  try {
    await sgMail.send({
      to,
      from: 'you@domain.com',
      subject,
      html: message
    });
    return true;
  } catch (err) {
    console.error('Email sending failed', err);
    return false;
  }
}
