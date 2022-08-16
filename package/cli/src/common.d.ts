interface BaseOptions {
    method: 'git' | 'npm'
}

interface AddOption extends BaseOptions {
    
}

interface InitOptions extends BaseOptions {
    template: string
}
