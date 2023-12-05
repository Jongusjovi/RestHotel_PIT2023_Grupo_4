function CurrencyConvert(valor) {
    const valorArray = valor.split(',')
    const valorEsquerda = valorArray[0].replace('.', ',')
    const valorFormatado = valorEsquerda + '.' + valorArray[1]

    return valorFormatado
}

module.exports = {
    CurrencyConvert
}