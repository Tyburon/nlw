const express = require("express")
const server = express()


//configurar pasta publica
server.use(express.static("public"))


//utiliizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true

})




//configurar caminhos da aplicação
//pagina inicial
server.get("/", function(req, res){
    return res.render("index.html")

})

//criar ponto de coleta
server.get("/create-point.html", function(req, res){
    return res.render("create-point.html")

})
//resultados da pesquisa
server.get("/search-results.html", function(req, res){
    return res.render("search-results.html")

})
//start server

server.listen(3000)