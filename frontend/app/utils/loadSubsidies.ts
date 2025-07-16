// 補助金データを動的に読み込むためのユーティリティ

export interface Subsidy {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  applicationMethod: string;
  referenceUrl: string;
  prefecture: string;
  city: string;
  category?: string;
  keywords: string[];
}

// 全ての補助金データを読み込む関数
export async function loadAllSubsidies(): Promise<Subsidy[]> {
  const subsidies: Subsidy[] = [];
  
  try {
    // 環境に応じたベースパス（GitHub Pagesでは常にbasePathが必要）
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/subsidiary-aid-search' : '';
    
    // ビルド時に生成されたファイルリストを取得
    const fileListResponse = await fetch(`${basePath}/subsidies-files.json`);
    if (!fileListResponse.ok) {
      console.error(`Failed to load file list: ${fileListResponse.status}`);
      return [];
    }
    
    const fileList: string[] = await fileListResponse.json();
    console.log(`Found ${fileList.length} subsidy files to load`);
    
    // 各ファイルを並列で読み込み
    const promises = fileList.map(async (fileName) => {
      try {
        const filePath = `${basePath}/data/subsidies/${fileName}`;
        const response = await fetch(filePath);
        if (!response.ok) {
          console.warn(`Failed to load ${filePath}: ${response.status}`);
          return [];
        }
        const data = await response.json();
        console.log(`Loaded ${Array.isArray(data) ? data.length : 0} subsidies from ${fileName}`);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.warn(`Error loading ${fileName}:`, error);
        return [];
      }
    });
    
    const results = await Promise.all(promises);
    
    // 全ての結果をまとめる
    results.forEach(fileData => {
      subsidies.push(...fileData);
    });
    
    console.log(`Total loaded: ${subsidies.length} subsidies`);
    return subsidies;
  } catch (error) {
    console.error('Error loading subsidies:', error);
    return [];
  }
}

// 開発環境用の動的ファイル発見（本番ではstatic exportなので使用不可）
export async function loadSubsidiesDynamic(): Promise<Subsidy[]> {
  // 本番環境では固定のファイルリストを使用
  if (process.env.NODE_ENV === 'production') {
    return loadAllSubsidies();
  }
  
  // 開発環境では固定リストを使用（Next.jsの制限により動的発見は困難）
  return loadAllSubsidies();
}