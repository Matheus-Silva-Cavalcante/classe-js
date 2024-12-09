export function formataValorMonetario(valor){
    if (parseInt(valor)) {
        return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
}

