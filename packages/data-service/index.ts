import * as MongoDB from "mongodb";
import bcrypt from "bcrypt";
import { TMapDisplay } from "../../types";

import { emailString } from "@geoarchy/utils";

const { MONGO_INSTANCE_URL, M_ACCOUNT_USER, M_ACCOUNT_PASS } = process.env;

export const hashPass = async password => await bcrypt.hash(password, 10);

const globalConfig = {
  auth: { user: M_ACCOUNT_USER, password: M_ACCOUNT_PASS }
};

const DATABASES: Object = {
  accountDb: {
    config: { ...globalConfig },
    collections: ["account", "user"]
  },
  mapDb: {
    config: { ...globalConfig },
    collections: ["display"]
  }
};

export class DataService {
  accountDb: {
    account: MongoDB.Collection;
  };
  mapDb: {
    display: MongoDB.Collection;
  };
  toObjectId(string) {
    return new MongoDB.ObjectId(string);
  }
  urlString(dbName: String): String {
    return `${MONGO_INSTANCE_URL}/${dbName}`;
  }
  hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
  hasDuplicateIds(array: Array<{ _id: String }>) {
    return (
      array &&
      array.length > 0 &&
      this.hasDuplicates(array.map(({ _id }) => _id))
    );
  }
  /**
   *  updateDoc
   *    Update mongo documents in a mongoose-esque fashion
   * @param collectionPath a path to the Mongo collection
   * @param data
   */
  async updateDoc(db = "mapDb", collectionPath = "display", data: any) {
    const { _id: stringId, ...dataToUpdate } = data;
    const _id = this.toObjectId(stringId);
    await this[db][collectionPath].updateOne({ _id }, { $set: dataToUpdate });

    return this[db][collectionPath].findOne({
      _id
    });
  }
  async getAccount(data): Promise<MongoDB.AggregationCursorResult> {
    return this.accountDb.account.findOne({ email: emailString(data.email) });
  }
  async createAccount(data): Promise<any> {
    const opResult = await this.accountDb.account.save({
      ...data,
      password: await hashPass(data.password)
    });
    return opResult.result;
  }
  async getMapDisplay(data: { id: String }): Promise<TMapDisplay> {
    return this.mapDb.display.findOne({ _id: this.toObjectId(data.id) });
  }
  async createMapDisplay(data: TMapDisplay): Promise<TMapDisplay> {
    const { insertedId } = await this.mapDb.display.insertOne(data);

    return this.mapDb.display.findOne({ _id: insertedId });
  }
  async updateMapDisplay(data): Promise<TMapDisplay> {
    if (this.hasDuplicateIds(data.layerGroups)) {
      throw Error("layer group id already exists");
    }

    if (this.hasDuplicateIds(data.components)) {
      throw Error("component id already exists");
    }
    return this.updateDoc("mapDb", "display", data);
  }
  /**
   * Needs to be resolved to instantiate the DB client
   * Instantiates all database clients, and collections
   * at dbClient.myDbName.collection
   *
   * @returns Promise<DataService>
   */
  async init() {
    try {
      // let self = this;
      await Promise.all(
        Object.entries(DATABASES).map(async ([dbName, dbConfig]) => {
          let dbClient = new MongoDB.MongoClient(
            MONGO_INSTANCE_URL,
            dbConfig.config
          );
          await dbClient.connect();
          this[dbName] = dbClient.db(dbName);
          dbConfig.collections.map(async collectionName => {
            this[dbName][collectionName] = this[dbName].collection(
              collectionName
            );
          });
        })
      );
      return this;
    } catch (err) {
      console.log("Mongo Initialization Error");
      console.error(err);
      throw err;
    }
  }
}
