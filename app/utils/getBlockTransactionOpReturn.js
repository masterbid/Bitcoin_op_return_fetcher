const { blockchainCommand } = require('./blockChainCommand')
const {opReturnValue} = require('./opReturnValue')

module.exports.getBlockTransactionOpReturn = async (transactions ) => {
    try {
        for(let j = 0; j < transactionList.length; j++){
            let getBlockTransactionDetails = await blockchainCommand("getrawtransaction", `${transactions[i].tx[j]} true ${transactions[i].hash}`)
            
            await opReturnValue(getBlockTransactionDetails, transactions[i].height)
        } 
    } catch (err) {
        console.error(err.message)
    }
}