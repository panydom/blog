// T是一个Promise
type PromiseReturnType<T> = T extends Promise<infer R> ? R : T
// T是一个返回Promise的方法
// type ResolvedReturnType<T> = ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>
type ResolvedReturnType<T> = PromiseReturnType<ReturnType<T>>

type ResponseData<T> = {
    success: boolean;
    message: string;
    data: T;
}