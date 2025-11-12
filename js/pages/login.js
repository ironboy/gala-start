export async function login() {
  const searchParams = new URLSearchParams(location.href.split('?')[1]);
  if (searchParams.get('email') && searchParams.get('token')) {
    if (await validateToken(searchParams.get('email'), searchParams.get('token'))) {
      return `<h2>Logged in</h2>`
    } else {
      return `<h2>Invalid login</h2>`
    }

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

export async function logout() {
  delete (localStorage.customer)
  checkStoredLogin()
  return ''
}

// add event listener
document.body.addEventListener('submit', async event => {
  if (!event.target.closest('#login')) { return; }
  event.preventDefault();
  await sendLoginMail(event.target);
});

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
  customer = customer[0]
  console.log('validateToken customer', customer)
  if (customer.email == email && customer.token == token) {
    // you are logged in, now save customer session (here using local storage)
    localStorage.customer = JSON.stringify(customer);
    return true
  }
}

// check stored login (like on reload)
export async function checkStoredLogin() {
  const storedLogin = (localStorage.customer && JSON.parse(localStorage.customer));
  if (!storedLogin) {
    return false
  }
  let customer = await (await fetch(`http://localhost:3002/customers/?email=${storedLogin.email}&token=${storedLogin.token}`)).json()
  customer = customer[0]
  if (!customer || !(customer.email = storedLogin.email && customer.token == storedLogin.token)) {
    // you are NOT logged in, clear session
    delete (localStorage.customer);
    return false
  } else {
    return localStorage.customer
  }
}
