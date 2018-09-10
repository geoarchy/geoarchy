import * as DatabaseClient from "s3-db";
import { fsString } from "@geoarchy/utils";

const short = require('short-uuid');

const translator = short();

const defaultCollection = {
  id: {
    //Passing in the document is new with 2.0
    generator: document => { return translator.new()},
    propertyName: 'id'
  },
  onlyUpdateOnMD5Change: true,
  collideOnMissmatch: false,
  errorOnNotFound: false,
  encryption: true,
  pageSize: 100
};

const accountCollection = {
  id: {
    generator: document => { return fsString(document.email) },
    propertyName: 'id'
  },
  pageSize: 100
}

export interface Database {
  _db: DatabaseClient
  accounts: DatabaseClient.Collection
  maps: DatabaseClient.Collection
  getAccountMapCollection: Function
  accountMaps: DatabaseClient.Collection
}

class DataService {
  _db: DatabaseClient
  _config: any
  _collectionNames: string[]
  maps: DatabaseClient.Collection
  constructor(config) {
    this._config = config;
    this._collectionNames = [];
    // connect it to the instance of user DB it needs
    this._db = new DatabaseClient(this.getDbConfig(this._config));
  }

  async init() {
    let self = this;
    this._collectionNames = await this._db.getCollectionNames();
    const getCollectionNames = this._collectionNames.map(async collection => {
      self[collection] = await this.collection(collection);
    });

    await Promise.all(getCollectionNames)
  }

  async getAccountMapCollection(accountId, path = 'account') {
    console.log({accountId})
    this[`${path}Maps`] = this.maps.subCollection(accountId);
  }

  getDbConfig(config) {
    return {
      db: {
        name: "geoarchy",
        namePattern: '${db.name}.${db.environment}-${name}', // name is passed in, db.* comes from the configuration.
      },
      collections: {
        default: defaultCollection,
        accounts: accountCollection,
        components: {
          pageSize: 100
        },
        themes: {
          pageSize: 100
        },
        maps: {
          pageSize: 100,
          encryption: false
        }
      }
    }
  }
  
  async collection(name) {
    return this._db.getCollection(name)
  }

  async findAndGetData(collectionName, ...findArgs){
    let collection = await this.collection(collectionName);
    let results = await collection.find(...findArgs || null);
    return Promise.all(results.map(result => result.getDocument()))
  }

  async createUnique(id, data, collectionName) {
    let collection = await this.collection(collectionName);
    const exists = await collection.exists(id);
    if (exists) {
      return { 
        error: `${collectionName} ID is not unique` 
      };
    }
    // thus, we should be able to ensure create document
    return collection.saveDocument(data);
  }
}

export { DataService }