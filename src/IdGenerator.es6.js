let _id = 0;
export default class IdGenerator{
  static generateId() {
    _id += 1;
    return _id;
  }
}
