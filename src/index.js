import { UserManager } from 'oidc-client';

const userManager = new UserManager({
<<<<<<< HEAD
  authority: 'https://test3.my.gov.au',
  client_id: 'mygov-citizen-portal',
  redirect_uri: 'http://localhost:8080/auth-callback.html',
  silent_redirect_uri: 'http://localhost:8080/renew.html',
  popup_redirect_uri: 'http://localhost:8080/renew.html',
  post_logout_redirect_uri: 'https://mygovcdn.test65.dta.adobecqms.net/en/logout',
  response_type: 'code',
  scope: 'openid profile',
  includeIdTokenInSilentRenew: false,
  loadUserInfo: true, // This defaults to true.
  metadata: {
    issuer: 'https://test3.my.gov.au',
    authorization_endpoint: 'https://test3.my.gov.au/mga/sps/oauth/oauth20/authorize',
    token_endpoint: 'https://test3.my.gov.au/mga/sps/oauth/oauth20/token',
    userinfo_endpoint: 'https://test3.my.gov.au/mga/sps/oauth/oauth20/userinfo',
    jwks_uri: 'https://test3.my.gov.au/mga/sps/oauth/oauth20/jwks/MYGOV-OIDC-RS256',
    end_session_endpoint: 'https://test3.my.gov.au/mga/sps/authsvc/policy/slo'
=======
	authority: 'https://test3.my.gov.au',
	client_id: 'mygov-citizen-portal',
	redirect_uri: 'http://localhost:8080/callback.html',
	response_type: 'code',
  scope: 'openid profile',
  metadata: {
    "issuer": "https://test3.my.gov.au",
    "authorization_endpoint": "https://test3.my.gov.au/mga/sps/oauth/oauth20/authorize",
    "token_endpoint": "https://test3.my.gov.au/mga/sps/oauth/oauth20/token",
    "userinfo_endpoint": "https://test3.my.gov.au/mga/sps/oauth/oauth20/userinfo",
    "jwks_uri": "https://test3.my.gov.au/mga/sps/oauth/oauth20/jwks/MYGOV-OIDC-RS256"
>>>>>>> 84099c9facd35b1675c071b01b1208d45ab30bf3
  }
});
const test = userManager.signoutRedirectCallback().then(console.log);
window.login = () => {
  // redirect to mygov login screen

  userManager.signinRedirect();

}

window.callback = () => {

  userManager.getUser().then(user => {
    // check if user data is in session storage
    if (user) {
      console.log('user in get', user)
      // fetchProfile(user);
    }
    else {
      // otherwise get access token
      return userManager.signinRedirectCallback().then(user => {
        if (user) {
          console.log('user in else', user)
          // fetchProfile(user);
        }
      });
    }
  });
}

window.authCallback = () => {
  console.log('location', window.location);
  console.log(window.serviceConfig);
  window.location.replace(`${window.serviceConfig.aemRedirect}${window.location.search}`)
}

window.renewSession = () => {
  userManager.signinPopup()
    .then(user => {
      console.log('user', user)
    })
    .catch(e => {
      console.log('err', e)
    })
}

window.logout = () => {
  userManager.signoutRedirect();
  // userManager.createSignoutRequest().then(signout => {
  //   console.log(signout)
  // })
};

window.logoutCallback = () => {
  userManager.signoutRedirectCallback().then(val => {
    console.log('valueee', value)
    window.location.href = 'https://google.com'
  })
}

window.sessionRenew = () => {
  userManager.signinPopupCallback().then(user => {
    console.log('user', user)
    console.log('silentcallback did a thing')
    userManager.signinRedirectCallback()
      .then(user => {
        if (user) {
          console.log('user in else om sesssionmRemew', user)
          // fetchProfile(user);
        }
      });
  })
}

const fetchProfile = (user) => {
  const profile = fetch(`https://test3.api.my.gov.au/mygov/ext-tst-3/profile/v1/profiles/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
      'Origin': 'http://localhost:8080',
      'X-MGV-Client-Id': 'mygov-citizen-portal'
    }
  })
    .then(response => console.log('User Profile', response.json()));
};
