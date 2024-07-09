// Javascript中各种运算符转换规则

// 特殊
console.log(Number(undefined))
console.log(Number(null))
console.log(Number(NaN))
console.log(Number("12A"))
console.log(Number("12"))

// 位运算符
const num = 9
// ～num 计算规则： 
//  1. num转换成二进制
//  2. 按位取反， 0-》1，1-》0
//  3. +1 
console.log(~num) // -10