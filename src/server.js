const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


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

    // console.log(req.query)


    return res.render("create-point.html")
    

})

server.post("/savepoint", (req, res) => {


    // req.body: O corpo do nosso formulário

    // console.log(req.body)
    // return res.send("ok")

    // inserir dados no banco de dados

    // inserir dados na tabela

    const query = `
        INSERT INTO places (
            img,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.uf,
            req.body.city,
            req.body.items
    ]

    function afterInsertData(err){

        if(err){
            
            return res.send("Erro no cadastro")
            // return console.log(err)
           

        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})

    }

    db.run(query, values, afterInsertData)

})

//resultados da pesquisa
server.get("/search-results.html", function(req, res){

    const search = req.query.search

    if(search==""){
        //pesquisa vazia

        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){

                if(err){
        
                    return console.log(err)
        
                }

                const total = rows.length
        
                //mostrar a paginal html com os dados do banco de dados
                 return res.render("search-results.html", { places: rows, total: total})
            })

  

})
//start server

server.listen(3000)