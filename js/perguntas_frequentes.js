function ajustarData() {
    const guia = document.getElementById('guia')
    const larguraTela = window.innerWidth

    if (larguraTela <= 600) {
        guia.innerHTML = `
        <select onchange="location.href=this.value">
            <option value="/">Inicio</option>
            <option value="/sigaa">Sigaa</option>
            <option value="/moodle">Moodle</option>
            <option value="/forum">Forum</option>
        </select>
        `
    } else if (larguraTela > 600) {
        guia.innerHTML = `
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/sigaa">Sigaa</a></li>
            <li><a href="/moodle">Moodle</a></li>
            <li><a href="/forum">Forum</a></li>
        </ul>
        `
    }
}

ajustarData()
window.addEventListener('resize', ajustarData)