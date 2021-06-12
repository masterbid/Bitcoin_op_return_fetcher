const { blockchainCommand } = require('./blockChainCommand')

module.exports.getBlockHash = async (blockNumber, blocks) => {
    try {
        let totalBlockHashDetails = []
        for(let blockCount = 0; blockCount < blocks; blockCount++){
            let blockHashDetails = await blockchainCommand('getblockhash', blockNumber + blockCount)
            totalBlockHashDetails = [...totalBlockHashDetails, blockHashDetails]
        }
        return totalBlockHashDetails  
    } catch (err) {
        console.error(err.message)
    }
}