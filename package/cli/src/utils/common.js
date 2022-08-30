export const sequenceIterate = async (fns, ...args) => {
    for(let i = 0; i < fns.length; i++) {
        await fns[i](...args)
    }
}