'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Film, Calendar, Star, Download, ExternalLink } from 'lucide-react';

// 强制动态渲染，不进行静态生成
export const dynamic = 'force-dynamic';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  description: string;
  poster: string;
  magnetLink: string;
  size: string;
  quality: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // 模拟API调用
      setTimeout(() => {
        const mockMovies: Movie[] = [
          {
            id: 1,
            title: "Spider-Man: No Way Home",
            year: 2021,
            rating: 8.4,
            genre: "Action, Adventure, Fantasy",
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
            poster: "/api/placeholder/300/450",
            magnetLink: "magnet:?xt=urn:btih:1234567890abcdef&dn=Spider-Man+No+Way+Home+2021+1080p&tr=udp%3A%2F%2Ftracker.example.com%3A80",
            size: "2.1 GB",
            quality: "1080p"
          },
          {
            id: 2,
            title: "The Batman",
            year: 2022,
            rating: 7.8,
            genre: "Action, Crime, Drama",
            description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham.",
            poster: "/api/placeholder/300/450",
            magnetLink: "magnet:?xt=urn:btih:abcdef1234567890&dn=The+Batman+2022+1080p&tr=udp%3A%2F%2Ftracker.example.com%3A80",
            size: "2.8 GB",
            quality: "1080p"
          },
          {
            id: 3,
            title: "Avengers: Endgame",
            year: 2019,
            rating: 8.4,
            genre: "Action, Adventure, Drama",
            description: "After the devastating events of Infinity War, the universe is in ruins.",
            poster: "/api/placeholder/300/450",
            magnetLink: "magnet:?xt=urn:btih:fedcba0987654321&dn=Avengers+Endgame+2019+1080p&tr=udp%3A%2F%2Ftracker.example.com%3A80",
            size: "3.2 GB",
            quality: "1080p"
          }
        ];
        
        // 根据搜索词过滤
        const filteredMovies = mockMovies.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase())
        );
        
        setMovies(filteredMovies);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('搜索失败:', error);
      setLoading(false);
    }
  };

  const handleDownload = (magnetLink: string, movieTitle: string) => {
    window.open(magnetLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* 搜索结果标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            搜索结果
          </h1>
          {searchTerm && (
            <p className="text-gray-300 text-lg">
              搜索: <span className="text-blue-400 font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-300 mt-4">正在搜索中...</p>
          </div>
        )}

        {/* 搜索结果 */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50">
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {movie.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  
                  <div className="flex items-center text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{movie.year}</span>
                  </div>
                  
                  <p className="text-blue-400 text-sm mb-3">{movie.genre}</p>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {movie.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-400 font-semibold">{movie.quality}</span>
                    <span className="text-gray-400">{movie.size}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(movie.magnetLink, movie.title)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载磁力链接
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 无搜索结果 */}
        {!loading && movies.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              未找到相关电影
            </h3>
            <p className="text-gray-400">
              尝试使用不同的关键词搜索
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">加载中...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}