export const sequenceIterate = async (fns: Function[], ...args: any[]) => {
    for(let i = 0; i < fns.length; i++) {
        await fns[i](...args)
    }
}