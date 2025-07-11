'use client';

import { useState } from 'react';
import { Search, Star, Calendar, Clock, User, Film } from 'lucide-react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  imdbRating?: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
  Genre?: string;
}

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataSource, setDataSource] = useState('');

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (data.Response === 'False') {
        setError(data.Error || '未找到相关电影');
        setMovies([]);
      } else {
        setMovies(data.Search || []);
        setDataSource(data.dataSource || '');
      }
    } catch (error) {
      setError('搜索失败，请稍后重试');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      'Action': 'bg-red-500',
      'Adventure': 'bg-orange-500',
      'Comedy': 'bg-yellow-500',
      'Drama': 'bg-blue-500',
      'Horror': 'bg-purple-500',
      'Romance': 'bg-pink-500',
      'Sci-Fi': 'bg-cyan-500',
      'Thriller': 'bg-gray-500',
    };
    return colors[genre] || 'bg-green-500';
  };

  const recommendedSearches = ['复仇者联盟', '阿凡达', '泰坦尼克号', '星际穿越', '盗梦空间'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center py-16">
          <div className="flex justify-center items-center mb-4">
            <Film className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">Movie Hub</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            探索电影世界，发现你的下一部最爱影片
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="搜索电影名称..."
                className="w-full px-6 py-4 pl-14 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-300" />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? '搜索中...' : '搜索'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-200 mb-3">推荐搜索：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {recommendedSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    setTimeout(() => searchMovies(), 100);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-blue-200 rounded-lg transition-colors duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {dataSource && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
                数据来源: {dataSource}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200 text-center">
              {error}
            </div>
          </div>
        )}

        {movies.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative h-80 bg-gray-800">
                    {movie.Poster && movie.Poster !== 'N/A' ? (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {movie.imdbRating && (
                      <div className="absolute top-4 right-4 flex items-center bg-yellow-500 text-black px-2 py-1 rounded-lg font-bold">
                        <Star className="w-4 h-4 mr-1" />
                        {movie.imdbRating}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {movie.Title}
                    </h3>
                    
                    <div className="flex items-center text-blue-200 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{movie.Year}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{movie.Type}</span>
                    </div>

                    {movie.Runtime && (
                      <div className="flex items-center text-blue-200 mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{movie.Runtime}</span>
                      </div>
                    )}

                    {movie.Director && (
                      <div className="flex items-center text-blue-200 mb-2">
                        <User className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{movie.Director}</span>
                      </div>
                    )}

                    {movie.Genre && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {movie.Genre.split(', ').slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className={`px-2 py-1 rounded-full text-xs text-white ${getGenreColor(genre)}`}
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {movie.Plot && movie.Plot !== 'N/A' && (
                      <p className="text-blue-200 text-sm line-clamp-3 mb-3">
                        {movie.Plot}
                      </p>
                    )}

                    {movie.Actors && movie.Actors !== 'N/A' && (
                      <p className="text-blue-300 text-xs line-clamp-2">
                        主演: {movie.Actors}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && movies.length === 0 && !error && searchTerm && (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <p className="text-blue-200 text-lg">未找到相关电影，试试其他关键词吧</p>
          </div>
        )}
      </div>
    </div>
  );
}