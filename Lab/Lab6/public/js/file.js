window.onload = function () {

    $("#upload-form").submit(e => {
        e.preventDefault()

        const input = document.getElementById('customFile')
        let file = input.files[0]

        // let data = new FormData()
        // data.append('file', input.files[0])
        // data.append('username', 'khoa')

        // console.log(input.files[0])

        fetch('http://localhost:3000/file/upload', {
            method: 'POST',
            body: file
        })
    })

}