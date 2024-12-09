import * as views from "./views/views.js"

export function inicializarView(nomeView){
    const view = views[nomeView];

    if(!view) throw `Não existe interface (view) com o nome "${nomeView}"`;

    window.addEventListener("load", () =>{
        view.inicializar?.();
    })
}