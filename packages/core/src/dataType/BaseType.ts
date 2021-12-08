import { BASE_TYPE, BaseTypeJSON } from "../type";

class BaseType {
  constructor(json: BaseTypeJSON) {
    this.value = json.value;
  }

  toJSON(): BaseTypeJSON {
    return {
      value: this.value,
      _type: "BaseType",
    };
  }
}

export default BaseType;

interface BaseType {
  id: BASE_TYPE;
  value: BASE_TYPE;
  _type: BASE_TYPE;
}
