require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI

mongoose.set('strictQuery', true)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})

const forumSchema = new mongoose.Schema({
    titulo: String,
    texto: String
})

const forumModel = mongoose.model('forum', forumSchema)

function salvarSite(titulo, texto){
    let site = new forumModel({
        titulo: titulo,
        texto: texto
    })

    site.save()
}

async function getSite(titulo){
    let result

    await forumModel.find({
        titulo: titulo
    })
    .then(doc => {
        result = doc[0]
    })
    .catch(err => {
        result = 'error'
    })

    if(result == undefined){
        result = 'não encontrado'
    }
    
    return result
}

module.exports = {salvarSite, getSite}