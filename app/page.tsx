'use client'

import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true)
    
    console.log('=== 开始搜索 ===');
    console.log('搜索关键词:', query);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      console.log('API响应状态:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('=== 前端收到的数据 ===');
      console.log('数据类型:', typeof data);
      console.log('数据内容:', data);
      
      // 处理数据
      let movieList = []
      if (Array.isArray(data)) {
        movieList = data
      } else if (data && Array.isArray(data.data)) {
        movieList = data.data
      } else if (data && typeof data === 'object') {
        // 如果data是对象，尝试从对象的值中提取数组
        const values = Object.values(data)
        const arrayValue = values.find(value => Array.isArray(value))
        if (arrayValue) {
          movieList = arrayValue
        }
      }
      
      console.log('=== 处理后的电影列表 ===');
      console.log('电影数量:', movieList.length);
      console.log('电影数据:', movieList);
      
      // 为每部电影添加磁力链接信息
      const moviesWithMagnetInfo = movieList.map((movie: any) => {
        let magnetLinks = []
        
        // 尝试不同的可能字段
        if (movie.magnet_links && Array.isArray(movie.magnet_links)) {
          magnetLinks = movie.magnet_links
        } else if (movie.magnetLinks && Array.isArray(movie.magnetLinks)) {
          magnetLinks = movie.magnetLinks
        } else if (movie.magnets && Array.isArray(movie.magnets)) {
          magnetLinks = movie.magnets
        } else if (movie.downloads && Array.isArray(movie.downloads)) {
          magnetLinks = movie.downloads
        }
        
        console.log(`电影 ${movieList.indexOf(movie) + 1}: ${movie.title || movie.name} - 磁力链接数量: ${magnetLinks.length}`);
        
        return {
          ...movie,
          magnetLinks: magnetLinks
        }
      })
      
      setMovies(moviesWithMagnetInfo)
    } catch (error) {
      console.error('搜索失败:', error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            🎬 电影资源搜索
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            搜索最新最热门的电影资源，一键获取下载链接
          </p>
        </div>

        {/* 搜索区域 */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="输入电影名称，如：流浪地球、复仇者联盟..."
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-pink-500/10 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-2xl hover:from-yellow-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    搜索中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    🔍 搜索
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 调试信息 */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-white/80 text-sm">
              <strong>🔍 搜索状态:</strong> 电影数量: {movies.length}, 电影数据: {movies.length > 0 ? '有数据' : '无数据'}
            </div>
          </div>
        )}

        {/* 搜索结果 */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-white/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
                <p className="text-white text-xl">正在搜索电影资源...</p>
              </div>
            ) : movies.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  🎬 搜索到 {movies.length} 部电影
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {movies.map((movie: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {movie.title || movie.name || '未知电影'}
                        </h3>
                        {movie.year && (
                          <p className="text-yellow-400 font-medium">📅 {movie.year}</p>
                        )}
                        {movie.rating && (
                          <p className="text-green-400 font-medium">⭐ {movie.rating}</p>
                        )}
                        {movie.category && (
                          <p className="text-blue-400 font-medium">🎭 {movie.category}</p>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/10">
                          <span className="text-white font-medium">🔗 下载链接</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold rounded-full">
                            {movie.magnetLinks?.length || 0}个可用
                          </span>
                        </div>
                        
                        {movie.magnetLinks && movie.magnetLinks.length > 0 && (
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {movie.magnetLinks.map((link: any, linkIndex: number) => (
                              <div key={linkIndex} className="p-3 bg-black/30 rounded-lg border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-yellow-400 font-medium text-sm">
                                    📁 {link.quality || link.name || `资源 ${linkIndex + 1}`}
                                  </span>
                                  {link.size && (
                                    <span className="text-green-400 text-xs">
                                      💾 {link.size}
                                    </span>
                                  )}
                                </div>
                                <a
                                  href={link.magnet || link.url || link.link}
                                  className="inline-block w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center"
                                >
                                  🧲 下载
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😢</div>
                <p className="text-white text-xl mb-2">没有找到相关电影</p>
                <p className="text-gray-400">试试搜索其他关键词吧</p>
              </div>
            )}
          </div>
        )}

        {/* 底部说明 */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">精准搜索</h3>
                <p className="text-gray-300">输入电影名称，快速找到你想要的资源</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">极速下载</h3>
                <p className="text-gray-300">提供多种下载链接，选择最适合的</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-white mb-2">热门资源</h3>
                <p className="text-gray-300">最新最热门的电影资源一网打尽</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}