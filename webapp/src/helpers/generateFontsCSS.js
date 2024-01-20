// src/helpers/generateFontsCSS.js

const fs = require('fs');
const path = require('path');

const fontsFolder = path.join(__dirname, '../fonts'); // Adjust the folder path as needed
const outputCSSPath = path.join(__dirname, '../fonts.css'); // Adjust the output path as needed

const fontFiles = fs.readdirSync(fontsFolder);

const generateFontCSS = (fileName, fontName, fontWeight) => {
  return `
    @font-face {
      font-family: '${fontName}';
      src: local('${fontName}'), url('${fileName}') format('woff');
      font-weight: ${fontWeight};
      font-style: normal;
    }
  `;
};

const cssContent = fontFiles
  .map((fileName, index) => {
    const fontName = `CustomFont${index + 1}`;
    const fontWeight = fileName.includes('bold') ? 'bold' : 'normal';
    return generateFontCSS(`./fonts/${fileName}`, fontName, fontWeight);
  })
  .join('\n');

fs.writeFileSync(outputCSSPath, cssContent);

console.log(`Fonts CSS file generated at ${outputCSSPath}`);
