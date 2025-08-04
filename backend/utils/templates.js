export const verificationEmailTemplate = (link) => `
  <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 40px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #333;">🔒 Verify Your Email</h1>
    </div>

    <p style="font-size: 16px; color: #555;">
      Hello 👋,<br><br>
      Thank you for registering. To complete your sign-up, please verify your email address by clicking the button below:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${link}" target="_blank" style="background-color: #4f46e5; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
        ✅ Verify Email
      </a>
    </div>

    <p style="font-size: 14px; color: #999; text-align: center;">
      If you didn’t create an account, you can safely ignore this email.
    </p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 12px; color: #aaa; text-align: center;">
      &copy; ${new Date().getFullYear()} EShopty. All rights reserved.
    </p>
  </div>
`;
