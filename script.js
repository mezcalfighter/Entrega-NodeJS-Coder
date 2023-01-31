class ProductManager{
    constructor(){
        this.products = [];
    }

    addProducts(title, description, price, thumbnail, code, stock){
        const id = this.products.length + 1
        let product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        console.log(id)
        const long = id - 1
        if(long => 1){
            for(const p of this.products){
                if(p.code === product.code){
                    throw new Error('Codigo ya existe, intente con otro')
                }
            }
        }
        product.id = id
        this.products.push(product)
        console.log('Producto agregado')
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        if(this.products[id] === undefined){
            throw new Error('Producto no existe, intente con otro')
        }else{
            console.log(this.products[id])
        }
    }
}

let create1 = new ProductManager()

create1.addProducts(title='Producto 1', description='Test',price=200,thumbnail='No imagen',code='abc222',stock=25)
//create1.addProducts(title='Producto 1', description='Test',price=200,thumbnail='No imagen',code='abc222',stock=25)
create1.getProducts()
create1.getProductById(2)