const { blockchainCommand } = require('./blockChainCommand')

module.exports.getBlockChainHeaders = async () => {
    try {
        const blockChainHeaderCount = await blockchainCommand("getblockchaininfo")
        return blockChainHeaderCount.headers
        
    } catch (err) {
        console.error(err.message)
    }
}