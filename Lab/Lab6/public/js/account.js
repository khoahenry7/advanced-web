window.onload = function () {
    $("#login-form").submit(e => verify(e))
    $("#register-form").submit(e => addAccount(e))
    hideErrorWithChange()

    async function verify(e) {
        e.preventDefault()

        let username = $("input[name='username']").val()
        let password = $("input[name='password']").val()
        let token = $("input[name='_csrf']").val()

        let user = {
            username: username,
            password: password
        }

        await fetch("http://localhost:3000/account/verify/login", {
            method: 'POST',
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    window.location.href = "/"
                } else {
                    showErrorMessage(json)
                }
            })
    }

    async function addAccount(e) {
        e.preventDefault()

        let token = $("input[name='_csrf']").val()
        let name = $("input[name='name']").val()
        let username = $("input[name='username']").val()
        let password = $("input[name='password']").val()
        let confirmPassword = $("input[name='confirm-password']").val()

        let user = {
            name: name,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        console.log(user)


        await fetch("http://localhost:3000/account/verify/register", {
            method: 'POST',
            headers: {
                'CSRF-Token': token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    window.location.href = "login"
                } else {
                    showErrorMessage(json)
                }
            })
    }

    eventBlockSpecialCharacters()

    function blockSpecialCharacters(e) {
        let sChars = (/[`~,.<>;':"\/\[\]\|{}()=_+-]/).toString()

        let key = String.fromCharCode(e.which)
        if (sChars.indexOf(key) !== -1) {
            e.preventDefault()
        }
    }

    function eventBlockSpecialCharacters() {
        $("input[name='name']").keypress(e => blockSpecialCharacters(e))
        $("input[name='username']").keypress(e => blockSpecialCharacters(e))
        $("input[name='password']").keypress(e => blockSpecialCharacters(e))
        $("input[name='confirm-password']").keypress(e => blockSpecialCharacters(e))
    }


    function hideErrorWithChange() {
        $("input[name='name']").keydown(() => hideErrorMessage())
        $("input[name='username']").keydown(() => hideErrorMessage())
        $("input[name='password']").keydown(() => hideErrorMessage())
        $("input[name='confirm-password']").keydown(() => hideErrorMessage())
    }

    function hideErrorMessage() {
        if (!$("#error-message").hasClass("d-none")) {
            $("#error-message").addClass("d-none")
        }
    }

    function showErrorMessage(json) {
        if ($("#error-message").hasClass("d-none")) {
            $("#error-message").removeClass("d-none")
        }

        $("#error-message").html(json.message)
    }
}