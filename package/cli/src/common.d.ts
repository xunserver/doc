export interface BaseOptions {
    method: 'git' | 'npm'
}

export interface AddOption extends BaseOptions {
    config?: string
}

export interface InitOptions extends BaseOptions {
    template: string
}
