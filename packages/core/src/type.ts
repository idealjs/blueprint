export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type PartialRecord<K extends string | number | symbol, T> = Partial<
  Record<K, T>
>;

export interface IType<T = any> {
  _id: string;
  _name?: string;
  _data: T;
}
