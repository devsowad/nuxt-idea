import Model from './Model'

export default class Comment extends Model {
  resource() {
    return 'comments'
  }
}
