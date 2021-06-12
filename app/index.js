require("dotenv").config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json(), cors())

const { client } = require('./db')
const { getLastBlockNumberFromDb} = require('./utils/getLastBlockNumberFromDb')
const { getBlockChainHeaders} = require('./utils/getBlockChainHeaders')
const { getOpReturn } = require('./utils/getOpReturn')

start()
async function start(){
    try {
        console.log("Started...")

        await client.connect()

        const lastBlockHeight = await getLastBlockNumberFromDb()
        console.log("Last Block Height...........", lastBlockHeight)

        const blockCycle = 1
        
        if(lastBlockHeight === 0 || lastBlockHeight === null){
            await getOpReturn(0, blockCycle)
        }

        
            await getOpReturn(lastBlockHeight, blockCycle)
       

        setInterval( async () => {
            
                await getOpReturn(lastBlockHeight, blockCycle)
            
        }, 1000 * 60)
        
    } catch (err) {
        console.error(err.message)
    }
    
}



app.get('/opreturn/:opReturnData', async (req, res) => {
    try {
        const { opReturnData } = req.params
        const requestData = await client.query("SELECT transaction_hash, block_hash FROM blockchain_data WHERE op_return = $1",[opReturnData]);
        return res.json(requestData.rows)
    } catch (err) {
        console.error(err.message)
        res.send("No result found, Please try again with a valid OP_RETURN HASH")
    }
})

const PORT = 7779

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})