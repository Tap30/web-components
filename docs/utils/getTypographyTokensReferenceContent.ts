import fs from 'node:fs';
const typographyFile = fs.readFileSync('tokens/typography.css');

const getTypographyTokensReferenceContent = () => {
  let content = ''
  content += '# Typography Tokens <Badge>Not Complete</Badge>\n\n';

  typographyFile.toString().split('\n').forEach((line, index) => {
    if (line.trim().startsWith('/*') && !line.includes('TODO') && index > 0) {
      const subtitle = line.replace('/*', '').replace('*/', '').trim()
      content += `## ${subtitle}\n`
      content += `| Token | Value | Preview (English) | Preview (Persian) |\n`
      content += `| ----- | ----- | ----- | ----- |\n`
    } else if (line.trim().startsWith('--tap-') && index > 0) {
      const x = line.replace(':', ';').trim().split(';')
      content += `| \`${x[0]}\` | \`${x[1]}\` | - | - |\n`
    }
  })
  return content
}

export default getTypographyTokensReferenceContent;
