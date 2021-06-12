const fetch = require('node-fetch')
const { RPC_USER, RPC_PASSWORD, RPC_HOST, RPC_PORT } = require('../config')


const requestDetails = async (methods, args ) => {
    try {
        
        if(args == null) args = []
        if(typeof(args) == "number") args = [args]
        if(typeof(args) == "string") {
            args = args.split(" ")
            args.forEach((element, index) => {
                if(element === 'true') args[index] = true 
                if(element === 'false') args[index] = false 
            })
        }
    
        const headers = {
            "content-type": "application/json"
        }
        
        const body = {jsonrpc: 1.0, id:"curltest", method: methods, params: args}
        let res = await fetch(`http://${RPC_USER}:${RPC_PASSWORD}@${RPC_HOST}:${RPC_PORT}/`, {
            method: "post",
            body: JSON.stringify(body),
            headers
        }) 
        res = await res.json()
        return res.result
    } catch (err) {
        console.error(err.message)
    }
    
}



module.exports.blockchainCommand = async (methods, args) => {
    try{
        return await requestDetails(methods, args)
        
    }catch(err){
        console.log(err)
    }
    
}



