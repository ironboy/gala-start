export default async function login() {
  const searchParams = new URLSearchParams(location.href.split('?')[1]);
  if (searchParams.get('email') && searchParams.get('token')) {
    await validateToken(searchParams.get('email'), searchParams.get('token'))
    return `
    <h2>Validating login...</h2>
    `
  } else {
    return `
      <h2>Login</h2>
      <form id="login">
        <input type="text" name="email" placeholder="Ange din epostadress">
        <input type="submit" value="Logga in via mail">
      </form>
    `;
  }
}

async function sendLoginMail(target) {
  console.log('target.email', target.email.value)
  await fetch('http://localhost:3003/mail-service/send-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: target.email.value
    })
  })
}

async function validateToken(email, token) {
  let customer = await (await fetch(`http://localhost:3002/customers/?email=${email}&token=${token}`)).json()
  console.log('customer', customer)
}

// add event listener
document.body.addEventListener('submit', async event => {
  if (!event.target.closest('#login')) { return; }
  event.preventDefault();
  await sendLoginMail(event.target);
});