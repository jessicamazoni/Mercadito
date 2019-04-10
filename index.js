const express = require("express");
const app = express();
const handlebars = require('express-handlebars')// Usei para criar o template
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// Config
 // Template Engine rsrsrs

app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

// Body Parser

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Rotas


app.get('/cad',function(req, res){
	Post.findAll({order: [['id','ASC']]}).then(function(posts){ // Peguei todos os meus dados da tabela...
			console.log(posts)
			res.render('cadastro',{posts: posts})
	})		
})

//app.get('/cad',function(req, res){
//			res.render('cadastro')		
//})


// Gravando as informações no banco de dados

app.post('/add',function(req, res){
Post.create({
	//id: req.body.id,
	nome: req.body.nome,
	preco: req.body.preco,
	quantidade: req.body.qtd,
	setor:req.body.tipo,
	marcar: req.body.marca
}).then(function(){
	res.redirect('/cad')
}).catch(function(erro){
	res.send("Ocorreu um erro: "+ erro)
}).catch(function(erro){
	res.send("Está postagem não existe!")
})
})

// Deletando o registro informado pelo ID

app.get('/deletar/:id',function(req, res){
	Post.destroy({where: {'id':req.params.id}}).then(function(){
		res.send("Postagem deletada com sucesso!")
	})
})

app.listen(8081, function(){
	console.log("Conectou");
});
