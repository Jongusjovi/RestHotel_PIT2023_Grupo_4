function ConvertDataBr(data) {
    let novaData = new Date(data)
    let dataFormatada = novaData.toLocaleDateString('pt-BR')
    let horaFormatada = novaData.toLocaleTimeString('pt-BR')

    return dataFormatada + ' ' + horaFormatada
}

function ConvertDataOnly(data) {
    let dataFormatada = data.split("-", 3)

    return dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0]
}

function ConvertDataOnlyBr(data) {
    let dataFormatada = data.split("-", 3)

    return dataFormatada[0] + '-' + dataFormatada[1] + '-' + dataFormatada[2]
}

function ConvertData(data) {
    let novaData = new Date(data)
    let dataFormatada = novaData.toLocaleDateString('pt-BR').split("/", 3)

    return dataFormatada[2] + '-' + dataFormatada[1] + '-' + dataFormatada[0];
}

function ConvertMoney(valor) {
    const valorNumber = parseFloat(valor === null ? 0.00 : valor)
    
    return valorNumber.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

module.exports = {
    ConvertDataBr,
    ConvertDataOnly,
    ConvertDataOnlyBr,
    ConvertData,
    ConvertMoney
}