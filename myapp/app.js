const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const products = [];

app.use(express.json());

app.use(cors())

app.get('/products/:id', (req, res) => {
    const paramId = parseInt(req.params.id);

    products.forEach(item => {
        if(item.id == paramId){
            res.send(item)
        }
        else {
            res.status(404);
        res.send({message:"Not Found"})
        }
    })
  })

app.get('/products/', (req, res) => {
    res.send(products)
  })

app.post("/products", (req, res) =>{
    const newProd = req.body

    
        products.push(newProd)
        res.send(newProd)


})

app.put("/products/:id", (req, res) => {
    
})

app.delete("/products/:id", (req, res) => {
  const paramId = parseInt(req.params.id);
  products.splice(
    products.findIndex(({id}) => id === paramId),1
    
    );
    
  res.send(products)  
})

app.delete("/products/", (req, res) => {
  products.splice(0, products.length)
  res.send(products)  
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
