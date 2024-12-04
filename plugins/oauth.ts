import SocialAuthJS from 'social-auth-js'
import axios from 'axios'

interface SocialAuthJs {
  authenticate: (provider: string) => Promise<unknown>
}

export default defineNuxtPlugin(() => {
  const socialAuth: SocialAuthJs = new SocialAuthJS(axios, {
    providers: {
      // https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=124606321433-mlefn0p1i7cnrvf26o3tlktf4d1j8ipk.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Frequiem.club%2Fsignin-google&scope=openid%20profile%20email&state=CfDJ8EG5n1eH9EFJlzHarFoAA0pACEN4t3YLLIL0AgnrF-VUjo18f-w9jDq7gOPOMOmcW7gJB_gznx1cib1WaiksXXC9rwHYxoozw6rzVVrPGooUrsGJVrLOruwea9axl2m0tj498VgNSLYxvk6P53TjtV1y5IRYKrSTe7pJObuyKfnjEKEDv0XIzx8JZRIlnRX-mRtrWlL1PMPXzQA-q8rm0xQIPTe-HR5EGTWl9ZXA0TdpZZPzz5ulHOr8AR5O8kwRcrQbbzuLDzBoZmtf4FOjpj0
      google: {
        clientId: '124606321433-mlefn0p1i7cnrvf26o3tlktf4d1j8ipk.apps.googleusercontent.com',
        redirectUri: 'https%3A%2F%2Frequiem.club%2Fsignin-google',
        responseType: 'code',
        scope: ['openid', 'profile', 'email'],
        scopeDelimiter: '%20',
      },
      facebook: {
        clientId: '3666275590353204',
      },
      instagram: {
        clientId: '1132061061181077',
        redirectUri: 'https://requiem.club/api/xcallbacklogin',
        scope: ['user_profile', 'user_media'],
        popupOptions: { width: 495, height: 645 },
      },
      // https://blog.csdn.net/qq_38935605/article/details/136389612
      x: {
        name: 'x',
        url: '/auth/twitter',
        authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
        // redirectUri: window.location.origin,
        redirectUri: 'https://7699-115-133-203-29.ngrok-free.app/signin-twitter',
        oauthType: '2.0',
        requiredUrlParams: ['scope', 'state', 'code_challenge', 'code_challenge_method'],
        scope: ['tweet.read'],
        scopeDelimiter: '%20',
        codeChallenge: 'challenge',
        codeChallengeMethod: 'plain',
        state: 'state',
        popupOptions: { width: 495, height: 645 },
        responseType: 'code',
        clientId: 'kwWNfI8GF8YmbLzQZDAZjAqqf',
      },
    },
  })
  return {
    provide: {
      socialAuth,
    },
  }
})
