const { blockchainCommand } = require('./blockChainCommand')

module.exports.getBlock = async (totalBlockhash) => {
    try {
        console.log("Total Block Hash",totalBlockhash.length)
        let totalGetBlockDetails = []
        for(let blockhash = 0; blockhash < totalBlockhash.length; blockhash++){
            let getBlockDetails = await blockchainCommand("getblock", totalBlockhash[blockhash])
            totalGetBlockDetails = [...totalGetBlockDetails, getBlockDetails]
        }
        
        return totalGetBlockDetails
    } catch (err) {
        console.error(err.message)
    }
}