export function optionsTemplate(option){
    const opTemplate = `
        <option value=${option.valor}>${option.nombre}</option>
    `

    return opTemplate
}