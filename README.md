# Bitcoin OP_RETURN DATA FETCHER
by Bassey Iniabasi Edet
### Setup
The app uses Node.js and Docker. The database is contained in a docker container, therefore you should have Node.js and Docker installed. 
Also ensure that you bitcoin core testnet (you can also use the mainnet if you please by changing your ***RPC_PORT*** in the config.js file to ***8332*** and removing ***-testnet*** from the command below)
is running using:  
  `$ bitcoind -testnet`

### To run the database: 
 `$ docker-compose up`

### To run the server:
- After running your database and its ready to accept connections,run:   
  `$ npm install`  
to install all the necessary dependencies
- To navigate to the app directory, run:  
  `$ cd app`
- To navigate to the app directory and then run:  
   `$ npm run dev`
  
## How it works
Immediately you start you server, the app performs the following actions;
- Query the database for the last synced block
- Query the bitcoin core for the current block header(block Height).
- If the last synced block isn't upto the current block header, then it run the following functions which enables it continues the syncing process from the next block into the database;
  - Get the blockhash of the next block from bitcoin core
  - Get the block details with the gotten blockhash from bitcoin core
  - Get the all the transactions from the block details from bitcoin core
  - Cycle through each transaction and get the Raw transaction details from bitcoin core
  - Cycle through each transactions _'vout'_ and _'asm'_ attribute and check if it contains ***OP_RETURN***
  - Save the ***OP_RETURN*** data to the database
  - Update the search block table with the block height.
The app also check if new block(s) have been added every _10mins_ and go through the process stated above and also logs the details of blocks with ***OP_RETURN***

## Configuration
The environmental variable used to test the app are as follows;
``` 
DB_HOST: '127.0.0.1',
DB_PORT: "5430",
DB_USER: "postgres",
DB_NAME: "exodusappdb",
DB_PASSWORD: "postgres",
RPC_USER: <input your bitcoin core username>,
RPC_PASSWORD: <input your bitcoin core password>,
RPC_HOST: "127.0.0.1",
RPC_PORT: 18332 or use 8332 if you are running the mainnet
```

Also the _"database.sql"_ file contains the database setup queries.

### Querying for OP_RETURN data:
You can make this query using your browser or the postman using   _http://localhost:7779/opreturn/<the opReturnData>_.  
This query return a list of the associated of transaction hash and blockhash which can be verified using  
_https://test.smartbit.com.au/_  
or  
_https://www.blockchain.com/explorer?view=btc-testnet_

NB: The current blocks synced is from block _1878816_ to block _1903699_ which would be updated subsequently. Also the Dockfile is use if you which to put to server in docker 

  

