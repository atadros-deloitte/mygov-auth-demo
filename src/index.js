import { UserManager } from 'oidc-client';

const userManager = new UserManager({
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
  }
});

window.login = () => {
  // redirect to mygov login screen
  userManager.signinRedirect();
}

window.callback = () => {

  userManager.getUser().then(user => {

    // check if user data is in session storage
    if (user) {
      fetchProfile(user);
    }
    else {
      // otherwise get access token
      return userManager.signinRedirectCallback().then(user => {
        if (user) {
          fetchProfile(user);
        }
      });
    }
  });
}

const fetchProfile = (user) => {

  // convert user id to uppercae (hack!)
  user.profile.sub = user.profile.sub.toString().toUpperCase();

  console.log('User ID: ', user.profile.sub);

  const profile = fetch(`https://test3.api.my.gov.au/mygov/ext-tst-3/profile/v1/profiles/${user.profile.sub}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
      'Origin': 'http://localhost:8080',
      'X-MGV-Client-Id': 'mygov-citizen-portal'
    }
  })
  .then(response => response.json())
  .then(profile => console.log(profile));
};
