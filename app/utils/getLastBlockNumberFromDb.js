const { client } = require('../db')

module.exports.getLastBlockNumberFromDb = async (worker) => {
    try{
        const lastBlockHeight = await client.query("SELECT last_block_height FROM searched_blocks LIMIT $1", [worker])
        return lastBlockHeight.rows[0].last_block_height

    }catch(err){
        console.error(err.message)
        return
    }
}

