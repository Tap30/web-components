import fs from 'node:fs';
const radiusFile = fs.readFileSync('tokens/radius.css');

const getRadiusTokensReferenceContent = () => {
  let content = ''
  content += '# Radius\n\n';

  content += `| Token | Value | Preview |\n`
  content += `| ----- | ----- | ----- |\n`

  radiusFile.toString().split('\n').forEach(line => {
    if (line.trim().startsWith('--tap-')) {
      const x = line.replace(':', ';').trim().split(';')
      content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="border-radius: ${x[1]}; width: 24px; height: 24px"></div>\n`
    }
  })


  return content
}

export default getRadiusTokensReferenceContent;
