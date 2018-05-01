/// <reference path="../../Authenticator.ts" />

function handleSignin(event) {
    const email = <string>$('#emailInputSignin').val();
    const password = <string>$('#passwordInputSignin').val();
    event.preventDefault();
    Authenticator.signIn(email, password, handleNewPasswordRequest).then(function () {
        window.location.href = 'ride.html';
    }).catch(function (error) {
        alert(error);
    });
}

function handleNewPasswordRequest() : Promise<string> {
    const deferred = $.Deferred();
    const modal = <any> $("#myModal");
    modal.modal('show');
    $("#passwordResetButton").on('click', function () {
        const newPassword = $('#originalPasswordInput').val();
        const repeatedPassword = $('#copiedPasswordInput').val();
        if (newPassword == repeatedPassword) {
            deferred.resolve(newPassword);
            modal.modal('hide');
        } else {
            alert("Passwords don't match!");
        }
    });

    return deferred.promise();
}

$(document).ready(() => {
    $('#signinForm').submit(handleSignin);
});
