import DataType, { DataTypeJSON } from "./DataType";
import { IType, PartialRecord } from "./type";

class ObjectType {
  constructor(objectTypeJSON: ObjectTypeJSON) {
    this._id = objectTypeJSON._id;
    this._name = objectTypeJSON._name;

    this._data = Object.entries(objectTypeJSON._data).reduce((p, entry) => {
      if (entry[1] == null) {
        throw new Error("field is null");
      }
      p[entry[0]] = new DataType(entry[1]);
      return p;
    }, {} as PartialRecord<string, DataType>);
  }

  toJSON(): ObjectTypeJSON {
    return {
      _id: this._id,
      _type: "ObjectType",
      _name: this._name,
      _data: Object.entries(this._data).reduce((p, entry) => {
        if (entry[1] == null) {
          throw new Error("field is null");
        }
        p[entry[0]] = entry[1].toJSON();
        return p;
      }, {} as PartialRecord<string, DataTypeJSON>),
    };
  }
}

export default ObjectType;

interface ObjectType extends IType<PartialRecord<string, DataType>> {}

export interface ObjectTypeJSON
  extends IType<PartialRecord<string, DataTypeJSON>> {
  _type: "ObjectType";
}
