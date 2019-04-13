const express = require("express");
const app = express();
const path = require('path');
__dirname = path.resolve();
const handlebars = require('express-handlebars')// Usado para criar o template
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// Config
 // Template Engine 

app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

// Body Parser

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/'));

// Rotas
app.get('/', function (req, res) {
  res.render('tela-login')
})

app.get('/cadastro', function (req, res) {
  res.render('cadastro')
})

app.get('/cad',function(req, res){
	Post.findAll({order: [['id','ASC']]}).then(function(posts){ // Pega todos os dados da tabela.
			console.log(posts)
			res.render('cadastro',{posts: posts})
	})		
})

//app.get('/cad',function(req, res){
//			res.render('cadastro')		
//})


// Gravando as informações no banco de dados.

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
		res.redirect('/cad')//res.send("Postagem deletada com sucesso!")
	})
})

app.get('/editar/:id', function (req, res) {
  Post.findOne({ id: req.params.id }).then((prod) => {
    res.render('editar', { prod: prod})
  }).catch(function (erro) {
    res.send("Aluno Inexistente!")
  })
});

// Editando 

app.post('/editar', (req, res) => {
  Post.findOne({ id: request.body.id }).then((prod) => {

	cad.nome = req.body.nome,
	cad.preco = req.body.preco,
	cad.quantidade = req.body.qtd,
	cad.setor = req.body.tipo,
	cad.marcar = req.body.marca

    prod.save().then(() => {
      res.redirect('/prod')
    }).catch((err) => {
      res.send("Houve um erro ao editar produto")
    })

  }).catch((err) => {
    res.send("Erro ao editar produto")
  })
});


app.listen(8081, function(){
	console.log("Conectou");
});
