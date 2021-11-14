import { DataType, FunctionType } from "./type";

class Chessman {}

export default Chessman;

interface IPin {
  id: string;
  type: PIN_TYPE;
  parent: IChessman;
  targetPin: IPin;
}

interface IChessman {
  id: string;
  type: {
    isArray: boolean;
    dataType: DataType | FunctionType;
  };
  pins: Map<string, IPin>;
}

enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
