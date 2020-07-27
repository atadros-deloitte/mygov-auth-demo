import { UserManager } from 'oidc-client';

const userManager = new UserManager({
	authority: 'https://test3.my.gov.au',
	client_id: 'mygov-citizen-portal',
	redirect_uri: 'http://localhost:8080/callback.html',
	response_type: 'code',
	scope: 'openid%20profile',
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

  console.log(user.profile.sub);

  // extract user id from JWT (this is a hack!)
  const unencrypted_jwt = JSON.parse(atob(user.access_token.split('.')[1]));
  const user_id = unencrypted_jwt.sub;
  console.log('User ID: ', user_id);

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
