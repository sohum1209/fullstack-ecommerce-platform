const nodemailer = require("nodemailer");

// Configure transporter using environment variables
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

/**
 * Sends a verification email with an OTP to the specified email address.
 *
 * @param {string} email - The recipient's email address
 * @param {string|number} otp - The OTP to be included in the email body
 */
function sendVerificationEmail(email, otp) {
    const mailOptions = {
        from: 'ShopZone <' + process.env.EMAIL + '>',
        to: email,
        subject: "Verify your email address",
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify your email</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f7fb;
          font-family: Arial, Helvetica, sans-serif;
          color: #1f2937;
        ">

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="padding: 40px 20px;"
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 500px;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td style="
                      background-color: #2563eb;
                      padding: 28px 30px;
                      text-align: center;
                    ">
                      <h1 style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 24px;
                        font-weight: 600;
                      ">
                        Verify Your Email
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 35px 30px;">

                      <p style="
                        margin: 0 0 16px;
                        font-size: 16px;
                        line-height: 1.6;
                      ">
                        Hello,
                      </p>

                      <p style="
                        margin: 0 0 24px;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #4b5563;
                      ">
                        Thanks for signing up! Please use the verification
                        code below to verify your email address.
                      </p>

                      <!-- OTP -->
                      <div style="
                        background-color: #f3f4f6;
                        border: 1px solid #e5e7eb;
                        border-radius: 10px;
                        padding: 20px;
                        text-align: center;
                        margin: 0 0 24px;
                      ">
                        <p style="
                          margin: 0 0 8px;
                          font-size: 13px;
                          color: #6b7280;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                        ">
                          Verification Code
                        </p>

                        <div style="
                          font-size: 32px;
                          font-weight: 700;
                          letter-spacing: 8px;
                          color: #111827;
                        ">
                          ${otp}
                        </div>
                      </div>

                      <p style="
                        margin: 0 0 16px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #6b7280;
                        text-align: center;
                      ">
                        This code will expire in <strong>10 minutes</strong>.
                      </p>

                      <hr style="
                        border: none;
                        border-top: 1px solid #e5e7eb;
                        margin: 25px 0;
                      " />

                      <p style="
                        margin: 0;
                        font-size: 13px;
                        line-height: 1.6;
                        color: #9ca3af;
                      ">
                        If you didn't create an account, you can safely ignore
                        this email. Never share this verification code with
                        anyone.
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="
                      background-color: #f9fafb;
                      padding: 20px 30px;
                      text-align: center;
                    ">
                      <p style="
                        margin: 0;
                        font-size: 12px;
                        color: #9ca3af;
                      ">
                        This is an automated email. Please do not reply.
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
      </html>
    `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error) => {

        console.error("Error sending verification email:", error);

    });
}

module.exports = sendVerificationEmail;