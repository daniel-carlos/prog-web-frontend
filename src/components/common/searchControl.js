export const searchProduct = (product, text) => {
    return product.name.toUpperCase().includes(text.toUpperCase()) || product.id.toString().toUpperCase().includes(text.toUpperCase())
}