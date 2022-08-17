interface BaseOptions {
    method: 'git' | 'npm'
}

interface AddOption extends BaseOptions {
    config?: string
}

interface InitOptions extends BaseOptions {
    template: string
}
