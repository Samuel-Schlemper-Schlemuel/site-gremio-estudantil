var chk = localStorage.getItem('chk') || "claro"
var aberto = false


function ajustarData() {
    const imagens = document.getElementsByTagName('img')
    const guia = document.getElementsByClassName('guia')[0]
    const larguraTela = window.innerWidth

    for(img in imagens){
        let larguraImagem = imagens[img].naturalWidth

        if(img == 0 || !Number.parseInt(img)){
            continue
        } else if (larguraImagem > larguraTela - larguraTela / 100 * 18) {
            imagens[img].style.width = `100%`
        } else {
            imagens[img].removeAttribute('style')
        }
    }

    if (larguraTela <= 600) {
        guia.innerHTML = `
            <i class="fa fa-bars" onclick="abrir()"></i>
        `

        if(chk == 'escuro'){
            chk = 'claro'
            claro_escuro()
        }

        if(aberto){
            aberto = false
            abrir()
        }
    } else if (larguraTela > 600) {
        if(aberto){
            abrir()
        }

        guia.innerHTML = `
        <ul>
            <li><a href="/" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Inicio</a></li>
            <li><a href="/sigaa" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Sigaa</a></li>
            <li><a href="/moodle" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Moodle</a></li>
            <li><a href="/forum" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Forum</a></li>
        </ul>

        <div>
            <input type="checkbox" onclick="claro_escuro()" class="checkbox" id="chk" />
            <label class="label" for="chk">
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-sun-o"></i>
            <div class="ball"></div>
            </label>
        </div>
        `
        let chkId = document.getElementById('chk')

        if(chk == 'escuro'){
            chk = 'claro'
            chkId.click()
        }
    }
}

function abrir(){
    const guia = document.getElementsByClassName('guia')[0]

    if(aberto){
        guia.innerHTML = `
            <i class="fa fa-bars" onclick="abrir()"></i>
        `

        guia.style.height = "auto"
        
        if(chk == 'escuro'){
            chk = 'claro'
            claro_escuro()
        }

        aberto = false
    } else {
        guia.innerHTML = `
        <i class="fa fa-bars fa-rotate-90" onclick="abrir()"></i>
    
        <ul>
            <li><a href="/" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Inicio</a></li><br>
            <li><a href="/sigaa" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Sigaa</a></li><br>
            <li><a href="/moodle" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Moodle</a></li><br>
            <li><a href="/forum" ${chk == 'escuro' ? 'style="color: #fff;"': ''}>Forum</a></li>
        </ul>
    
        <div>
            <input type="checkbox" onclick="claro_escuro()" class="checkbox" id="chk" />
            <label class="label" for="chk">
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-sun-o"></i>
            <div class="ball"></div>
            </label>
        </div>
        `

        guia.style.height = "360px"

        let chkId = document.getElementById('chk')

        if(chk == 'escuro'){
            chk = 'claro'
            chkId.click()
        }

        aberto = true
    }
}

function claro_escuro() {
    const body = document.body
    const nav = document.getElementsByTagName('nav')[0]
    const imgs = document.getElementsByTagName('img')
    const bloco = document.getElementsByClassName('bloco')[0]
    const bars = document.getElementsByClassName('fa-bars')[0]
    const guia = document.getElementsByClassName('guia')[0]

    if(chk == 'claro'){
        body.style.background = '#1B1B32'
        bloco.style.background = '#038296'
        guia.style.backgroundColor = '#1B1B32'

        if(bars != null){
            bars.style.color = '#038296'
        }

        let asNav = nav.getElementsByTagName('a')

        for(i in asNav){
            if(typeof asNav[i] == 'object'){
                asNav[i].style.color = '#fff'
            }
        }

        for(let i = 0; i <= 1; i++){
            imgs[i].style.backgroundColor = '#e1e1e1'
            imgs[i].style.borderRadius = '10px'
        }

        chk = 'escuro'
        localStorage.setItem('chk', 'escuro')
    } else {
        body.style.background = '#fff'
        bloco.style.background = '#46afbf'
        guia.style.backgroundColor = '#fff'

        if(bars != null){
            bars.style.color = '#46afbf'
        }

        let asNav = nav.getElementsByTagName('a')

        for(i in asNav){
            if(typeof asNav[i] == 'object'){
                asNav[i].style.color = '#000'
            }
        }

        for(let i = 0; i <= 1; i++){
            imgs[i].style.backgroundColor = ''
            imgs[i].style.borderRadius = ''
        }

        chk = 'claro'
        localStorage.setItem('chk', 'claro')
    }
}

function ajustarDataDobro(){
    ajustarData()
    ajustarData()
}

window.addEventListener('load', ajustarDataDobro)
window.addEventListener('resize', ajustarData)