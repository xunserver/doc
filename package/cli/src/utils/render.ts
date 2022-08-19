import nunjucks from 'nunjucks'
import fs from 'fs-extra'
import path from 'path'


export const renderAndOutput = (source: string, dest: string, context: Object) => {
    console.log(source)
    const result = nunjucks.render(fs.readFileSync(source).toString(), context);
    fs.writeFileSync(path.resolve(process.cwd(), dest), result)
}