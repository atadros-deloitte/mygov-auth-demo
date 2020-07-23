import { UserManager } from 'oidc-client';

const userManager = new UserManager({
	authority: 'https://test3.my.gov.au',
	client_id: 'mygov-citizen-portal',
	redirect_uri: 'http://localhost:8080/callback.html',
	response_type: 'code',
	scope: 'openid%20profile',
});

window.login = () => {
  console.log('Redirecting to myGov login screen..')
  userManager.signinRedirect();
}

window.callback = () => {
  // 1. get access token
  // 2. call profile api
}
