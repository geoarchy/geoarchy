import { Collection } from 's3-db';

export interface Database {
    accounts: Collection
    maps: Collection
    getAccountMapCollection: Function
    accountMaps: Collection
}

export interface Context {
    db: Database
    token: any
    request: any
    connection: any
    userId: string
    mapBoxToken: string
}