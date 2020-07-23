import { UserManager } from 'oidc-client';

const userManager = new UserManager({
	authority: 'https://test3.my.gov.au',
	client_id: 'mygov-citizen-portal',
	redirect_uri: 'http://localhost:8080/callback.html',
	response_type: 'code',
	scope: 'openid%20profile',
});

function fetchProfile(user) {
  console.log(user)
  // fetch Profile
  const profile = fetch('https://test3.api.my.gov.au/mygov/ext-tst-3/profile/v1/profiles/PG642732', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
      'Origin': 'http://localhost:8080/callback.html',
      'X-MGV-Client-Id': 'mygov-citizen-portal'
    }
  })
  .then(val => val.json())
  .then(prof => console.log('profile', profile));
}

window.login = () => {
  console.log('Redirecting to myGov login screen..')
  userManager.signinRedirect();
}

window.callback = () => {
  // 1. get access token
  // 2. call profile api
  const user = userManager.getUser()
  .then(user => {
    if (user) {
      fetchProfile(user);
    } else {
      return userManager.signinRedirectCallback()
      .then(user => {
        if (user) {
          fetchProfile(user);
        }
      })
    }
  });
  // call profile api
}
