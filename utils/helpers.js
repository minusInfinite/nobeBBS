const reduceOp = (args, reducer) => {
    args = Array.from(args)
    args.pop() // => options
    let first = args.shift()
    return args.reduce(reducer, first)
}

module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString()
    },
    format_datetime: (date) => {
        return date.toLocaleString()
    },
    equal: () => {
        return reduceOp(arguments, (a, b) => a === b)
    },
    not: () => {
        return reduceOp(arguments, (a, b) => a !== b)
    },
    lt: () => {
        return reduceOp(arguments, (a, b) => a < b)
    },
    gt: () => {
        return reduceOp(arguments, (a, b) => a > b)
    },
    lte: () => {
        return reduceOp(arguments, (a, b) => a <= b)
    },
    gte: () => {
        return reduceOp(arguments, (a, b) => a >= b)
    },
    and: () => {
        return reduceOp(arguments, (a, b) => a && b)
    },
    or: () => {
        return reduceOp(arguments, (a, b) => a || b)
    },
}

/*conditional helpers from 
https://gist.github.com/servel333/21e1eedbd70db5a7cfff327526c72bc5 */
