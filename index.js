require('dotenv').config()

// Declaração de variaveis
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const mongo = require('./mongoose.js')

//Configurações
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/gifs'))
app.use(express.static(__dirname + '/imagens'))
app.use(express.static(__dirname + '/imagens/integrantes'))
app.use(express.static(__dirname + '/js'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/EJS')

app.use(express.urlencoded({
    extended: true
}))

//Rotas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/paginas/inicio.html')
})

app.get('/perguntas_frequentes', (req, res) => {
    res.sendFile(__dirname + '/paginas/perguntas_frequentes.html')
})

app.get('/moodle', (req, res) => {
    res.sendFile(__dirname + '/paginas/moodle.html')
})

app.get('/sigaa', (req, res) => {
    res.sendFile(__dirname + '/paginas/sigaa.html')
})

app.get('/forum', async (req, res) => {
    let foruns = await mongo.getRecentSites()

    if(foruns === 'não existem foruns'){
        res.render('forum', {
            foruns: foruns
        })

        return
    }

    let titulos = []
    let datas = []

    for(i in foruns){
        titulos.push(foruns[i].titulo)
        datas.push(foruns[i].data)
    }

    let object = JSON.stringify({titulos: titulos, datas: datas})

    res.render('forum', {
        foruns: object
    })
})

app.get('/logar_forum', (req, res) => {
    res.render('logar_forum', {alert: false})
})

app.post('/criar_forum', (req, res) => {
    const senha_botada = req.body.senha

    if(senha_botada === process.env.senha){
        res.render('criar_forum', {
            alert: false
        })
    } else {
        res.render('logar_forum', {alert: true})
    }
})

app.post('/adicionar_forum', async (req, res) => {
    const texto = req.body.texto
    const titulo = req.body.titulo
    const site = await mongo.getSite(titulo)

    if(site != 'não encontrado'){
        res.render('criar_forum', {
            alert: true
        })
        return
    }

    mongo.salvarSite(titulo, texto)
    res.redirect(`/forum/${titulo}`)
})

app.get('/forum/:site', async (req, res) => {
    const site_name = req.params.site
    const site = await mongo.getSite(site_name)

    if(site == 'error' || site == 'não encontrado'){
        res.render('forum_criado', {
            estado: site,
            titulo: site
        })
    } else {
        res.render('forum_criado', {
            estado: false,
            texto: site.texto,
            titulo: site.titulo
        })
    }
})

app.listen(PORT)