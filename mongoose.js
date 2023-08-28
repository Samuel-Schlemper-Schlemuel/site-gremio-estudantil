require('dotenv').config()
const mongoose = require('mongoose')
const URI = process.env.MONGO_URI

mongoose.set('strictQuery', true)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})

const forumSchema = new mongoose.Schema({
    titulo: String,
    texto: String,
    data: Date
})

const forumModel = mongoose.model('forum', forumSchema)

function salvarSite(titulo, texto){
    let site = new forumModel({
        titulo: titulo,
        texto: texto,
        data: new Date()
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

async function getRecentSites(){
    let result

    await forumModel.find().sort({data: -1}).limit(5)
    .then(doc => {
        result = doc
    })
    .catch(err => {
        result = 'error'
    })

    if(result == undefined){
        result = 'não existem foruns'
    }
    
    return result
}

module.exports = {salvarSite, getSite, getRecentSites}