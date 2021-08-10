import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // Define a base url for a REST API
  baseURL() {
    return process.env.API_URL || 'http://localhost:8000/api'
  }

  // Implement a default request method
  request(config) {
    return this.$http.request(config)
  }
}
