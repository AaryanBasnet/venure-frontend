// check-import-casing.js
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('./src');

function fileExistsCaseSensitive(filePath) {
  const dir = path.dirname(filePath);
  const file = path.basename(filePath);
  if (!fs.existsSync(dir)) return false;
  const files = fs.readdirSync(dir);
  return files.includes(file);
}

function checkImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      checkImports(fullPath);
    } else if (entry.isFile() && /\.(js|jsx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const importRegex = /import\s.*?from\s+['"](.*?)['"]/g;

      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
          const resolvedPath = path.resolve(path.dirname(fullPath), importPath);

          // Try with .js and .jsx extensions if no extension provided
          const possiblePaths = [];
          if (path.extname(resolvedPath)) {
            possiblePaths.push(resolvedPath);
          } else {
            possiblePaths.push(resolvedPath + '.js', resolvedPath + '.jsx', path.join(resolvedPath, 'index.js'), path.join(resolvedPath, 'index.jsx'));
          }

          const found = possiblePaths.some(p => fileExistsCaseSensitive(p));
          if (!found) {
            console.log(`Missing or casing mismatch: ${importPath} in ${fullPath}`);
          }
        }
      }
    }
  }
}

checkImports(SRC_DIR);
