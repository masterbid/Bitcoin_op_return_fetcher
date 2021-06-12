const { getBlockChainHeaders} = require('./getBlockChainHeaders')
const { getBlockHash } = require('./getBlockHash')
const { getBlock } = require('./getBlock')
const { getBlockTransactions } = require('./getBlockTransactions')


module.exports.getOpReturn = async (blockNo, blockCycle) => {
    try{
        const getHeadersCount = await getBlockChainHeaders()
        console.log("getHeadersCount",getHeadersCount)
        
        for(let i = blockNo + 1; i <= getHeadersCount; i+=blockCycle){
            if(i + blockCycle <= getHeadersCount){
                
                // Get the blockhash
                const blockHash = await getBlockHash(i, blockCycle)
               
                // Get Current block Details
                const currentBlock = await getBlock(blockHash)
               
                // Get Block Transaction
                await getBlockTransactions(currentBlock)
            }else{
                console.log(`BlockChain header(${getHeadersCount}) is not upto the required ${i + blockCycle} blocks. Please wait or consider reducing your block cycle`)
            }
        }
    }catch(err){
        console.error(err.message)
    }
}