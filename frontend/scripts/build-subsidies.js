const fs = require('fs');
const path = require('path');

// ビルド時に全ての補助金データを統合するスクリプト
async function buildSubsidiesData() {
  try {
    const subsidies = [];
    
    // データファイルのパス
    const dataFiles = [
      'public/data/subsidies/saitama/kawaguchi.json',
      'public/data/subsidies/tokyo/kodaira.json',
      'public/data/subsidies/tokyo/tokyo-to.json'
    ];
    
    // 各ファイルを読み込み
    for (const filePath of dataFiles) {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        subsidies.push(...data);
        console.log(`Loaded ${data.length} subsidies from ${filePath}`);
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    }
    
    // 統合データを public/subsidies.json に出力
    const outputPath = 'public/subsidies.json';
    fs.writeFileSync(outputPath, JSON.stringify(subsidies, null, 2));
    console.log(`Combined ${subsidies.length} subsidies into ${outputPath}`);
    
  } catch (error) {
    console.error('Error building subsidies data:', error);
    process.exit(1);
  }
}

buildSubsidiesData();