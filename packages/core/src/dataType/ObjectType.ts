import Chessboard from "../chessboard/Chessboard";
import { DataTypeJSON, ObjectTypeJSON, PartialRecord } from "../type";
import DataType from "./DataType";

class ObjectType {
  constructor(objectTypeJSON: ObjectTypeJSON, chessboard: Chessboard) {
    this.value = Object.entries(objectTypeJSON.value).reduce((p, entry) => {
      if (entry[1] == null) {
        throw new Error("field is null");
      }
      p[entry[0]] = DataType.fromJSON(entry[1], chessboard);
      return p;
    }, {} as PartialRecord<string, DataType>);
  }

  toJSON(): ObjectTypeJSON {
    return {
      _type: "ObjectType",
      value: Object.entries(this.value).reduce((p, entry) => {
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

interface ObjectType {
  value: PartialRecord<string, DataType>;
}
