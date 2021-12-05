import { BASE_TYPE, BaseTypeJSON } from "../type";

class BaseType {
  constructor(json: BaseTypeJSON) {
    this.value = json.value;
    this._type = json._type;
  }

  toJSON(): BaseTypeJSON {
    return {
      value: this.value,
      _type: this._type,
    };
  }
}

export default BaseType;

interface BaseType {
  id: BASE_TYPE;
  value: BASE_TYPE;
  _type: BASE_TYPE;
}
