import fs from "node:fs"
import path from "node:path"

import { MailtrapClient } from "mailtrap"

/**
 * For this example, you need to have ready-to-use sending domain or,
 * a Demo domain that allows sending emails to your own account email.
 * @see https://help.mailtrap.io/article/69-sending-domain-setup
 */

const TOKEN = "<YOUR-TOKEN-HERE>";
const SENDER_EMAIL = "<SENDER@YOURDOMAIN.COM>";
const RECIPIENT_EMAIL = "<RECIPIENT@EMAIL.COM>";
const REPLY_TO_EMAIL = "<REPLYTO@EMAIL.COM>";

const client = new MailtrapClient({ token: TOKEN });

const welcomeImage = fs.readFileSync(path.join(__dirname, "welcome.png"));

client
  .send({
    category: "test",
    custom_variables: {
      hello: "world",
      year: 2022,
      anticipated: true,
    },
    from: { name: "Mailtrap Test", email: SENDER_EMAIL },
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Mailtrap!",
    reply_to: { email: REPLY_TO_EMAIL },
    html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
          <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
          <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
          <p>Now send your email using our fake SMTP server and integration of your choice!</p>
          <p>Good luck! Hope it works.</p>
        </div>
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>
  `,
    attachments: [
      {
        filename: "welcome.png",
        content_id: "welcome.png",
        disposition: "inline",
        content: welcomeImage,
      },
    ],
  })
  .then(console.log)
  .catch(console.error);
