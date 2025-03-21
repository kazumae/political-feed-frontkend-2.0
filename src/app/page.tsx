'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { Politician } from '@/lib/api/types/politician';

export default function Home() {
  const { politicians } = useApi();
  const [politicianList, setPoliticianList] = useState<Politician[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const data = await politicians.getPoliticians();
        setPoliticianList(data || []);
        setIsLoading(false);
      } catch {
        setError('政治家データの取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchPoliticians();
  }, [politicians]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">政治家フィード</h1>
        
        {isLoading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : politicianList.length === 0 ? (
          <p>政治家データがありません</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {politicianList.map((politician) => (
              <div 
                key={politician.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  {politician.image_url ? (
                    <img 
                      src={politician.image_url} 
                      alt={politician.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{politician.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{politician.name}</h2>
                    {politician.role && (
                      <p className="text-sm text-gray-600">{politician.role}</p>
                    )}
                  </div>
                </div>
                {politician.profile_summary && (
                  <p className="text-sm text-gray-700 mt-2">{politician.profile_summary}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
