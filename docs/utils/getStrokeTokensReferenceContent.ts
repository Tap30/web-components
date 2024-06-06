import fs from 'node:fs';
const strokeFile = fs.readFileSync('tokens/stroke.css');

const getStrokeTokensReferenceContent = () => {
  let content = ''
  content += '# Stroke Tokens\n\n';

  content += `| Token | Value | Example |\n`
  content += `| ----- | ----- | ----- |\n`

  strokeFile.toString().split('\n').forEach(line => {
    if (line.trim().startsWith('--tap-')) {
      const x = line.replace(':', ';').trim().split(';')
      content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="border: ${x[1]} solid var(--vp-c-text-2); width: 64px; height: 64px"></div>\n`
    }
  })


  return content
}

export default getStrokeTokensReferenceContent;
