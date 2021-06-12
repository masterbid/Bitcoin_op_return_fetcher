const { client } = require('../db')
const { getBlockTransactionOpReturn } = require('./getBlockTransactionOpReturn')

module.exports.getBlockTransactions = async (transactions ) => {
    try {
        for(let i = 0; i < transactions.length; i++){
            let transactionList = transactions[i].tx
            await getBlockTransactionOpReturn(transactionList)
            const searchResult = await client.query(`SELECT last_block_id, last_block_height FROM searched_blocks LIMIT 1`);
            if(searchResult.rowCount == 0){
                await client.query(`INSERT INTO searched_blocks(last_block_id, last_block_height)
                            VALUES(uuid_generate_v4(), $1) 
                        `, [transactions[i].height - 1]);
            }else{
                await client.query(`UPDATE searched_blocks SET last_block_height = $1 WHERE last_block_id = $2`,[transactions[i].height, searchResult.rows[0].last_block_id]);
            }
        }
        
    } catch (err) {
        console.error(err.message)
    }
}