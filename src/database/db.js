// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas operações

//  db.serialize(() => {
//     //criar uma tabela

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             img     TEXT,
//             name    TEXT,
//             address TEXT,
//             address2    TEXT,
//             state   TEXT,
//             city    TEXT,
//             items   TEXT  
//         );
//     `)

//     //inserir dados na tabela

//     const query = `
//         INSERT INTO places (
//             img,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
    
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err){

//         if(err){

//             return console.log(err)

//         }

//         console.log("Cadastrado com Sucesso")
//         console.log(this)

//     }

//     db.run(query, values, afterInsertData)

//     //consultar os dados da tabela

//     db.all(`SELECT * FROM places`, function(err, rows){

//         if(err){

//             return console.log(err)

//         }

//         console.log("Aqui estão seus registros")
//         console.log(rows)

//     })

    //deletar um dado da tabela

//     db.run(`DELETE FROM places WHERE id = ?`, [5], function(err){
    
//         if(err){
    
//             return console.log(err)
    
//         }
    
//        console.log("Registro deletado com sucesso!")
    
//      })


// }) 