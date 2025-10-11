
// let server_address='https://etymo-5cpb.onrender.com';
let server_address='http://127.0.0.1:8000';


export async function checkuser(email, password ,loginType) {
  try {
    const response = await fetch(`${server_address}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        loginType:loginType
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      if (data.message === 'correct credentials') {
        localStorage.setItem("loged email", email)
        localStorage.setItem("token", data.token)}
        localStorage.setItem("loginType",loginType)
      return data.message;
    }
    return 'error'
  } catch (error) {
    console.log(error)
    return 'server not responding'
  }


}

export async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${server_address}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data.message);
    if (data.message === 'registered') {
      localStorage.setItem("loged email", email)
    }
    console.log(data.message)
    return data.message;
  } catch (error) {
    return 'server not responding'
  }

}


export async function submitOTP(email, otp) {
  try {
    const response = await fetch(`${server_address}/verify_otp/`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        })
      }
    );
    const data = await response.json();
    return data.message
  } catch (error) {
    return 'server not responding'
  }

}

export async function send_otp(email) {
  try {
    const response = await fetch(`${server_address}/send_otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      }),
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    return 'server not responding'
  }

}

export async function send_reset_password_email(email) {
  try {
    const response = await fetch(`${server_address}/send_password_reset_email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      }),
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    return 'server not responding'
  }


}

export async function reset_password(email, password, token) {
  try {
    const response = await fetch(`${server_address}/update_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password:password,
        reset_token:token
      }),
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    return 'server not responding'
    console.log(error)
  }
}
