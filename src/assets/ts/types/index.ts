//自然数
export type NaturalNumber = number & {
  toString: () => string
  toFixed: () => string
} // 使用交叉类型与限制方法

//带长度限制的数组（元组）
export type LengthArray<T, L extends number> = [T, ...T[]] & { length: L }
export function assertLengthArray<T, L extends number>(
  arr: any[],
  length: L
): asserts arr is LengthArray<T, L> {
  if (arr.length !== length) {
    throw new Error(
      `Array length does not match. Expected ${length}, got ${arr.length}`
    )
  }
}
