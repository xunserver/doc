import * as Icon from '@xunserver/icon';
import { renderFile } from 'ejs';
import { writeFileSync, mkdirSync } from 'fs';

const icons = Object.entries(Icon).filter(([_,icon]) => icon.name)
const templateContent = {
  importString: '',
  exportString: '',
  install: ''
}

mkdirSync('./src/icon')

icons.forEach(async ([name, icon]) => {
  const string = await renderFile('./template/icon.vue.ejs', {name: icon.name});
  writeFileSync(`./src/icon/${name}.ts`, string);
})

icons.forEach(([name, icon]) => {
  templateContent.importString += `import ${name}Default, { ${name} } from './icon/${name}.ts';\n`;
  templateContent.exportString += `export { ${name} };\n`;
  templateContent.install += `app.use(${name}Default);\n`;
})
renderFile('./template/index.ts.ejs', templateContent).then(string => {
  writeFileSync(`./src/index.ts`, string)
});
