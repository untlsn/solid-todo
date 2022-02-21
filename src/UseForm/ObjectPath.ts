export declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export declare type FieldValues = Record<string, any>;
export declare type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;
declare type ArrayPathImpl<K extends string | number, V> = V extends Primitive ? never : V extends ReadonlyArray<infer U> ? U extends Primitive ? never : `${K}` | `${K}.${ArrayPath<V>}` : `${K}.${ArrayPath<V>}`;
export declare type ArrayPath<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
  [K in TupleKey<T>]-?: ArrayPathImpl<K & string, T[K]>;
}[TupleKey<T>] : ArrayPathImpl<ArrayKey, V> : {
  [K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
}[keyof T];
export declare type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends Path<T[K]> ? PathValue<T[K], R> : never : K extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? PathValue<V, R & Path<V>> : never : never : P extends keyof T ? T[P] : P extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? V : never : never : never;
export declare type UseFormSetValue<TFieldValues extends FieldValues> = <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TFieldName, value: UnpackNestedValue<FieldPathValue<TFieldValues, TFieldName>>) => void;

type PathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}.${Path<V>}`;
type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;
declare const $NestedValue: unique symbol;
export type NestedValue<TValue extends object = object> = {
  [$NestedValue]: never;
} & TValue;
export type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<TFieldValues, TFieldPath>;
export type UnpackNestedValue<T> = T extends NestedValue<infer U> ? U : T extends Date | FileList | File ? T : T extends object ? {
  [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;

export type Path<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
  [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
}[TupleKey<T>] : PathImpl<ArrayKey, V> : {
  [K in keyof T]-?: PathImpl<K & string, T[K]>;
}[keyof T];
