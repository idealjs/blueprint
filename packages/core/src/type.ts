export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type PartialRecord<K extends string | number | symbol, T> = Partial<
  Record<K, T>
>;

export interface IType<T = any> {
  _id: string;
  _name?: string;
  _type: T;
}

export interface DataTypeJSON
  extends IType<
    BaseTypeJSON | ArrayTypeJSON | ObjectTypeJSON | FunctionTypeJSON
  > {}

export interface BaseTypeJSON {
  value: BASE_TYPE;
  _type: BASE_TYPE;
}

export interface ArrayTypeJSON {
  value: {
    dimension: number;
    type: DataTypeJSON;
  };
  _type: "ArrayType";
}

export interface ObjectTypeJSON {
  value: PartialRecord<string, DataTypeJSON>;
  _type: "ObjectType";
}

export interface FunctionTypeJSON {
  value: {
    parameters: DataTypeJSON[];
    returnType?: DataTypeJSON;
  };
  _type: "FunctionType";
}

export enum BASE_TYPE {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
  ANY = "ANY",
}
