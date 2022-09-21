export declare const ignoreError: (fn: Function, context: any, ...args: any[]) => any;
export declare const pipe: (...fns: Function[]) => (initParams?: any) => any;
export declare const pipeAsync: (...fns: Function[]) => (initParams: any) => Promise<any>;
