import * as Data from '@geoarchy/data-service'

export interface Context {
  db: Data.DataService
  token: any
  request: any
  connection: any
  userId: String
  mapBoxToken: String
}
