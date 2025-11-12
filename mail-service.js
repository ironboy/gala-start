import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import info from "./secrets.json" with { type: "json" };

const app = express();
const PORT = 3003;

app.use(express.json());

// Lift CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});


app.post('/mail-service/send-login', async (req, res) => {
  if (!req.body.to) {
    return res.status(400).json({ ok: false, error: 'Missing recipient email' });
  }

  // get customer object
  let customer = await (await fetch('http://localhost:3002/customers/?email=' + req.body.to)).json()
  if (!customer[0]) {
    return res.status(400).json({ ok: false, error: 'No such email registered' });
  }
  customer = customer[0]

  // save token with customer
  customer.token = crypto.randomBytes(7).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 7);
  const postCustomer = await fetch('http://localhost:3002/customers/' + customer.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  })
  console.log(postCustomer)

  // Authenticate / create a mail client
  const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: info.email,
      pass: info.appPassword
    }
  });

  // Send the mail
  // (see https://nodemailer.com/message for more options)
  client.sendMail({
    from: info.email,
    to: req.body.to,
    subject: 'Gala login',
    text: `Besök http://localhost:5500/#login?email=${req.body.to}&token=${customer.token} för att logga in som ${req.body.to} på Gala Emporium`,
    html: `<a href="http://localhost:5500/#login?email=${req.body.to}&token=${customer.token}">Klicka här för att logga in</a> som ${req.body.to} på Gala Emporium`
  });

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});