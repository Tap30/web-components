import fs from 'node:fs';
const colorsFile = fs.readFileSync('tokens/colors.css');
const paletteFile = fs.readFileSync('tokens/pallete.css');

const getColorTokensReferenceContent = () => {
  let content = ''
  content += '# Color Tokens\n\n';

  content += `## Palette\n`
  content += `| Token | Value | Example |\n`
  content += `| ----- | ----- | ----- |\n`

  paletteFile.toString().split('\n').forEach(line => {
    if (line.trim().startsWith('--tap-')) {
      const x = line.replace(':', ';').trim().split(';')
      content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: ${x[1]}; width: 64px; height: 64px"></div>\n`
    }
  })


  colorsFile.toString().split('\n').forEach(line => {
    if (line.trim().startsWith('/*') && !line.includes('TODO')) {
      const subtitle = line.replace('/*', '').replace('*/', '').trim()
      content += `## ${subtitle}\n`
      content += `| Token | Value | Preview |\n`
      content += `| ----- | ----- | ----- |\n`
    } else if (line.trim().startsWith('--tap-')) {
      const x = line.replace(':', ';').trim().split(';')
      content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: ${x[1]}; width: 64px; height: 64px"></div>\n`
    }
  })
  return content
}

export default getColorTokensReferenceContent;
