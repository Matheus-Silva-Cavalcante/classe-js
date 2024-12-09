export function addEventListenerGlobal(tipoEvento, seletor, callback){
    document.addEventListener(tipoEvento, (event) => {
        const elemento = event.target.closest(seletor);

        if(!elemento) return;

        if(!callback || typeof callback !== "function") return;

        callback(event);
    })
}

// export function filtrarCarro(seletor, filtro){
//     const campoBusca = document.querySelector('.input-busca');
    
//     const filtrarSeletor = document.querySelector(seletor);
//     console.log(seletor)
    
//     document.querySelectorAll('.botao-selecionavel').forEach(carroFiltrado => {
//         const filtrarCarro = carroFiltrado.innerHTML;

//         if (filtrarCarro.indexOf(filtrarSeletor.value) > -1) {
//             carroFiltrado.style.display = '';
//             campoBusca.value = "";
//         } else {
//             if (filtrarSeletor.value === filtro) {
//                 carroFiltrado.style.display = '';
//                 campoBusca.value = "";
//                 return;
//             }

//             carroFiltrado.style.display = 'none';
//         }
//     });
// }

export function filtrarCarro(filtro, textoBuscado){
    const seletor = '.carro' + Object.keys(filtro).map( key => `[data-${key}-id="${filtro[key]}"]`).join("");
    console.debug(seletor)

    document.querySelectorAll(".carro").forEach(carro => {
        carro.style.display = 'none';
    });

    document.querySelectorAll(seletor).forEach(carro => {
        const textoCarro = carro.innerText.toLowerCase();

        if (textoCarro.indexOf(textoBuscado.toLowerCase()) !== -1) {
            carro.style.display = "";
        }
    });
}

window.filtrarCarro = filtrarCarro;
