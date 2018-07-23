/// <reference path="typings/jquery.d.ts" />

function onAuthError(errorMsg) {
  debugger;
  if (!window.location.href.match(/signin\.html/)) {
    window.location.href = '/frpagl-finance/signin.html';
  }
}

$(document).ready(() => {
  try {
    Authenticator.isAutenticated().catch(onAuthError);
  } catch(e) {
    onAuthError(e);
  }
});

