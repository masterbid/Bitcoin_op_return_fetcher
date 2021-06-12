const { client } = require('../db')


module.exports.opReturnValue = async (blockUnhashedTransaction, blockHeight) => {
    try {
        
        for(j = 0; j < blockUnhashedTransaction.vout.length; j++){
            let opData = blockUnhashedTransaction.vout[j].scriptPubKey.asm.split(' ')
            if(opData[0] === "OP_RETURN" && opData[1] !== "OP_IF" && opData[1] !== "OP_CHECKSIG"){ 
                let opDataValue = opData[1]
                let op_transaction_hash = blockUnhashedTransaction.txid
                let op_block_hash = blockUnhashedTransaction.blockhash
                await client.query(`INSERT INTO blockchain_data(blockchain_data_id, block_height, op_return, transaction_hash, block_hash)
                    VALUES(uuid_generate_v4(), $1, $2, $3, $4) ON CONFLICT ( transaction_hash ) DO NOTHING
                `, [blockHeight, opDataValue, op_transaction_hash, op_block_hash]);
                
                console.log(`
                Output Values
                =====================================================
                
                TRANSACTION HASH
                ${op_transaction_hash}

                OP_RETURN VALUE
                ${opDataValue}

                BLOCK HASH
                ${op_block_hash}

                BLOCK HEIGHT
                ${blockHeight}
                
                =====================================================
                `)
                
            }
        }
        
    } catch (err) {
        console.error(err.message)
    }
}
