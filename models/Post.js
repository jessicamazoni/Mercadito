const db = require('./db')

// Criei minha tabela e exportei minha constante Post...

const Post = db.sequelize.define('produtos', {
//	id:{
//		type: db.Sequelize.STRING
//	},
	nome: {
		type: db.Sequelize.TEXT
	},
	preco:{
		type: db.Sequelize.TEXT
	},
	quantidade:{
		type: db.Sequelize.TEXT
	},
	setor:{
		type: db.Sequelize.TEXT
	},
	marcar:{
		type: db.Sequelize.TEXT
	}
})

//Post.sync({force:true})

module.exports = Post