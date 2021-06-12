CREATE DATABASE exodusappdb;

CREATE TABLE blockchain_data(
    blockchain_data_id UUID PRIMARY KEY NOT NULL,
    block_height INT NOT NULL,
    op_return VARCHAR NOT NULL,
    transaction_hash VARCHAR UNIQUE NOT NULL,
    block_hash VARCHAR NOT NULL
);
CREATE TABLE searched_blocks(
    last_block_id UUID PRIMARY KEY NOT NULL,
    last_block_height INT UNIQUE NOT NULL
);


CREATE INDEX block_height_index ON blockchain_data(block_height);
CREATE INDEX op_return_index ON blockchain_data(op_return);

CREATE INDEX searched_block_index ON searched_blocks(last_block_height);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";