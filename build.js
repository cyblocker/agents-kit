#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const OUTPUT_DIR = 'dist';

// Clean and recreate output directory
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function minifyJS(inputFile, outputFile) {
  try {
    const code = fs.readFileSync(inputFile, 'utf-8');
    const result = await minify(code, {
      compress: {
        passes: 2,
        unsafe: true,
        pure_funcs: ['console.log']
      },
      mangle: {
        toplevel: false
      },
      output: {
        comments: false
      }
    });

    if (result.error) {
      console.error(`Error minifying ${inputFile}:`, result.error);
      return false;
    }

    fs.writeFileSync(outputFile, result.code);
    const originalSize = code.length;
    const minifiedSize = result.code.length;
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    console.log(`✓ ${inputFile} → ${outputFile} (${savings}% reduction)`);
    return true;
  } catch (error) {
    console.error(`Error processing ${inputFile}:`, error);
    return false;
  }
}

async function build() {
  console.log('🔨 Building assets...\n');

  // 1. Minify core.js
  await minifyJS('core.js', `${OUTPUT_DIR}/core.min.js`);

  // 2. Minify data.js
  await minifyJS('data.js', `${OUTPUT_DIR}/data.min.js`);

  // 3. Minify app.js
  await minifyJS('app.js', `${OUTPUT_DIR}/app.min.js`);

  // 3. Copy static files
  const filesToCopy = ['index.html', 'manifest.json', 'favicon.svg', 'sw.js', 'app-icon.png', 'style.css', 'utilities.css'];
  
  for (const file of filesToCopy) {
    if (fs.existsSync(file)) {
      const destPath = path.join(OUTPUT_DIR, file);
      fs.copyFileSync(file, destPath);
      console.log(`✓ Copied ${file}`);
    }
  }

  // 4. Copy static directory
  if (fs.existsSync('static')) {
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
    };
    copyDir('static', path.join(OUTPUT_DIR, 'static'));
    console.log(`✓ Copied static directory`);
  }

  console.log('\n✅ Build complete! Output in ./dist');
}

build().catch(console.error);
