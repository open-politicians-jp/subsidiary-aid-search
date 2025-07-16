const fs = require('fs');
const path = require('path');

// ビルド時にディレクトリをスキャンしてファイルリストを生成するスクリプト
async function buildSubsidiesFileList() {
  try {
    const subsidiesDir = 'public/data/subsidies';
    
    if (!fs.existsSync(subsidiesDir)) {
      console.error(`Directory not found: ${subsidiesDir}`);
      process.exit(1);
    }
    
    const fileList = [];
    
    // ディレクトリを再帰的にスキャン
    function scanDirectory(dirPath, basePath = '') {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
        
        if (entry.isDirectory()) {
          scanDirectory(fullPath, relativePath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          fileList.push(relativePath);
          console.log(`Found JSON file: ${relativePath}`);
        }
      }
    }
    
    scanDirectory(subsidiesDir);
    
    // ファイルリストを public/subsidies-files.json に出力
    const outputPath = 'public/subsidies-files.json';
    fs.writeFileSync(outputPath, JSON.stringify(fileList, null, 2));
    console.log(`Generated file list with ${fileList.length} files: ${outputPath}`);
    
  } catch (error) {
    console.error('Error building subsidies file list:', error);
    process.exit(1);
  }
}

buildSubsidiesFileList();