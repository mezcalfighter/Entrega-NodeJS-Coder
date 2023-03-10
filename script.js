const {
    readFileSync,
    rmSync,
    appendFileSync,
    promises:{ 
        appendFile,
        writeFile
    }
} = require('fs')

class ProductManager{
    constructor(){
        this.products = [];
    }

    writeProducts(){
        for(let product of this.products){
            if(product){
                appendFileSync('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt',`{${product.title},${product.description},${product.price},${product.thumbnail},${product.code},${product.id}} `)
            }
        }
    }

    readProducts(){
        this.products = []
        let temp_products = readFileSync('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt','utf-8')
        const arr_products = temp_products.split(' ')
        for(let product of arr_products){
            if(product){
                this.products.push(product)
            }
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock){
        const id = this.products.length + 1
        let product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
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
        const lastProduct = product
        await appendFile('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt',`{${lastProduct.title},${lastProduct.description},${lastProduct.price},${lastProduct.thumbnail},${lastProduct.code},${lastProduct.id}} `)
        console.log('Producto agregado')
    }

    async getProducts(){
        const allProducts = await this.products
        return allProducts.toString()
    }

    async getProductById(id){
        if(id <= 0){
             return `No existe el producto con ID: ${id}`
        }else if(this.products[id-1] === undefined){
            return 'Producto no existe, intente con otro'
        }else{
            const foundProduct = await this.products[id-1].toString()
            return foundProduct
        }
    }

    modifyProduct(id,newInfo){
        if(id <= 0){
            throw new Error('No existe el ID: ',id)
        }else if(this.products[id-1] === undefined){
            throw new Error('Producto no existe, intente con otro')
        }else{
            this.products[id].id = newInfo.id
            this.products[id].title = newInfo.title
            this.products[id].description = newInfo.description
            this.products[id].price = newInfo.price
            this.products[id].thumbnail = newInfo.thumbnail
            this.products[id].code = newInfo.code
            rmSync('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt')
            writeFile('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt','')
            this.writeProducts()
        }
    }

    deleteInfo(id){
        if(id <= 0){
            throw new Error('No existe el ID: ',id)
        }else if(this.products[id-1] === undefined){
            throw new Error('Producto no existe, intente con otro')
        }else{
            this.products.pop(id-1)
            rmSync('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt')
            writeFile('C:/Users/emanu/Documents/Entrega-NodeJS-Coder/productos_db.txt','')
            this.writeProducts()
        }
    }
}

const express = require('express');
const app = express()
const puerto = 8080
app.listen(puerto, () => {console.log('Conectado!')})

let create1 = new ProductManager()
create1.readProducts()

function getAllProducts(req,res){
    res.send(create1.getProducts()) 
}

function getProductById(req,res){
    if(!req.params.id){
        res.send(create1.getProductById(req.query.id))
    }else{
        res.send(create1.getProductById(req.params.id))
    }
}

app.get('/allProducts',getAllProducts)
app.get('/productById/:id',getProductById)
//create1.addProducts(title='Producto 1', description='Test',price=200,thumbnail='No imagen',code='abc222',stock=25)
//create1.addProducts(title='Producto 1', description='Test',price=200,thumbnail='No imagen',code='abc222',stock=25)
//create1.getProducts()