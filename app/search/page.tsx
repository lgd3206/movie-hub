'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// 定义电影类型接口
interface Movie {
  id?: string | number;
  title?: string;
  name?: string;
  year?: string | number;
  rating?: string | number;
  category?: string;
  magnetLinks?: Array<{
    magnet?: string;
    url?: string;
    link?: string;
    quality?: string;
    name?: string;
    size?: string;
  }>;
  [key: string]: any; // 允许其他属性
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (query) {
      handleSearch(query)
    }
  }, [query])

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setLoading(true)
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // 处理数据
      let movieList: Movie[] = []
      if (Array.isArray(data)) {
        movieList = data
      } else if (data && Array.isArray(data.data)) {
        movieList = data.data
      } else if (data && typeof data === 'object') {
        const values = Object.values(data)
        const arrayValue = values.find(value => Array.isArray(value))
        if (arrayValue && Array.isArray(arrayValue)) {
          movieList = arrayValue as Movie[]
        }
      }
      
      // 为每部电影添加磁力链接信息
      const moviesWithMagnetInfo = movieList.map((movie: any, index: number) => {
        let magnetLinks = []
        
        if (movie.magnet_links && Array.isArray(movie.magnet_links)) {
          magnetLinks = movie.magnet_links
        } else if (movie.magnetLinks && Array.isArray(movie.magnetLinks)) {
          magnetLinks = movie.magnetLinks
        } else if (movie.magnets && Array.isArray(movie.magnets)) {
          magnetLinks = movie.magnets
        } else if (movie.downloads && Array.isArray(movie.downloads)) {
          magnetLinks = movie.downloads
        }
        
        return {
          ...movie,
          id: movie.id || index, // 确保有 id 属性
          magnetLinks: magnetLinks
        }
      })
      
      setSearchResults(moviesWithMagnetInfo)
    } catch (error) {
      console.error('搜索失败:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
      
      // 更新 URL
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('q', searchQuery)
      window.history.pushState({}, '', newUrl.toString())
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部搜索区域 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🎬 电影搜索</h1>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索电影..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '搜索中...' : '🔍 搜索'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 搜索结果区域 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">正在搜索...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                找到 {searchResults.length} 个结果 {query && `"${query}"`}
              </h2>
            </div>
            
            <div className="space-y-6">
              {searchResults.map((movie) => (
                <div key={movie.id || movie.title || 'unknown'} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                        🎬
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {movie.title || movie.name || '未知电影'}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        {movie.year && (
                          <span className="flex items-center gap-1">
                            📅 {movie.year}
                          </span>
                        )}
                        {movie.rating && (
                          <span className="flex items-center gap-1">
                            ⭐ {movie.rating}
                          </span>
                        )}
                        {movie.category && (
                          <span className="flex items-center gap-1">
                            🎭 {movie.category}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">下载链接:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {movie.magnetLinks?.length || 0} 个可用
                          </span>
                        </div>
                        
                        {movie.magnetLinks && movie.magnetLinks.length > 0 && (
                          <div className="space-y-2">
                            {movie.magnetLinks.slice(0, 3).map((link, linkIndex) => (
                              <div key={linkIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                      📁 {link.quality || link.name || `资源 ${linkIndex + 1}`}
                                    </span>
                                    {link.size && (
                                      <span className="text-xs text-gray-500">
                                        💾 {link.size}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <a
                                  href={link.magnet || link.url || link.link || '#'}
                                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  🧲 下载
                                </a>
                              </div>
                            ))}
                            
                            {movie.magnetLinks.length > 3 && (
                              <p className="text-sm text-gray-500 text-center">
                                还有 {movie.magnetLinks.length - 3} 个下载链接...
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到相关结果</h3>
            <p className="text-gray-600">尝试使用其他关键词搜索</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">开始搜索电影</h3>
            <p className="text-gray-600">在上方输入框中输入电影名称</p>
          </div>
        )}
      </div>
    </div>
  )
}