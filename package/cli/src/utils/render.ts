import ejs from 'ejs'
import fs from 'fs-extra'
import path from 'path'


export const renderAndOutput = async (source: string, dest: string, context: Object) => {
    const result = await ejs.renderFile(source, context);
    fs.writeFileSync(path.resolve(process.cwd(), dest), result)
}