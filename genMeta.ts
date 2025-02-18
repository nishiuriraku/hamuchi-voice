const title = 'ハムチサンプラー';
const description = 'ハムチをｷﾞｭｯとまとめました';
const url = 'https://hamuchi-voice.netlify.app/';
const ogp = url + 'ogp.png';

const meta = [
  { name: 'description', content: description },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:url', content: url },
  { property: 'og:image', content: ogp },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: title },
  { property: 'og:locale', content: 'ja_JP' },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:site', content: '@hamutima_86' },
  { name: 'twitter:creator', content: '@nishiuriraku' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: ogp },
];

let output = '';
for (const item of meta) {
  if ('name' in item) {
    output += `<meta name="${item.name}" content="${item.content}" />\n`;
  }
  if ('property' in item) {
    output += `<meta property="${item.property}" content="${item.content}" />\n`;
  }
}
console.log(output);
