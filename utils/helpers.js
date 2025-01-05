const reduceOp = (args, reducer) => {
    args = Array.from(args);
    args.pop(); // => options
    let first = args.shift();
    return args.reduce(reducer, first);
};
export const format_date = (date) => {
    return date.toLocaleDateString();
};
export const format_datetime = (date) => {
    return date.toLocaleString();
};
export const equal = () => {
    return reduceOp(arguments, (a, b) => a === b);
};
export const not = () => {
    return reduceOp(arguments, (a, b) => a !== b);
};
export const lt = () => {
    return reduceOp(arguments, (a, b) => a < b);
};
export const gt = () => {
    return reduceOp(arguments, (a, b) => a > b);
};
export const lte = () => {
    return reduceOp(arguments, (a, b) => a <= b);
};
export const gte = () => {
    return reduceOp(arguments, (a, b) => a >= b);
};
export const and = () => {
    return reduceOp(arguments, (a, b) => a && b);
};
export const or = () => {
    return reduceOp(arguments, (a, b) => a || b);
};
export default {
    format_date,
    format_datetime,
    equal,
    not,
    lt,
    gt,
    lte,
    gte,
    and,
    or
};
