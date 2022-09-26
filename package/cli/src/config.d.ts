/**
 * 自定义build函数
 */
export interface CustomBuild {
  (config: OriginConfig): any
}

/**
 * 自定义publish函数
 */
export interface CustomPublish extends CustomPublish { }

/**
 * buildConfig
 */
export interface BuildConfig {
  webpackConfig: {
    [key: string]: any
  },
  webpackChain: (config: T) => T
  [key: string]: any
}


export type PublishConfig = boolean | CustomPublish | {
  git: boolean | {  // 是否支持自动提交git
    origin?: string;  // 需要上传的仓库名，默认origin
    branch?: string;  // 默认 main
    commitMsg?: string | ((package: any) => string)  // 默认当前 `${packageJson.name} pub ${packageJson.version} + 1`
  },
  npmToken?: string  // npm 发布秘钥，如果未配置，从APP_NPM_TOKEN获取
}

/**
 * 用户配置文件原始配置
 */
export interface OriginConfig {
  type: 'vue' | 'vue2' | 'react' | 'common';
  compiler?: 'webpack' | 'vite' | 'rollup' | 'gulp'
  typescript: boolean; // default true
  build: Boolean | CustomBuild | BuildConfig,
  pub: PublishConfig
  server: {  // 如果type是
    [key: string]: any
  }
}
