class ChatController {
    index(req, res) {
        res.render("index")
    }
}

module.exports = new ChatController()
