'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Copy, ExternalLink, Star, Calendar, Clock, Download, Eye } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [copySuccess, setCopySuccess] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    setLoading(true)
    try {
      // 调用后端搜索API
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.movies || [])
      } else {
        console.error('搜索请求失败')
        setSearchResults([])
      }
    } catch (error) {
      console.error('搜索错误:', error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(`${type}已复制!`)
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  const platformColors = {
    "QUARK": "bg-blue-100 text-blue-800 border-blue-200",
    "BAIDU": "bg-green-100 text-green-800 border-green-200",
    "ALIYUN": "bg-orange-100 text-orange-800 border-orange-200",
    "THUNDER": "bg-purple-100 text-purple-800 border-purple-200"
  }

  const platformNames = {
    "QUARK": "夸克网盘",
    "BAIDU": "百度网盘", 
    "ALIYUN": "阿里云盘",
    "THUNDER": "迅雷云盘"
  }

  const qualityColors = {
    "UHD_4K": "bg-purple-100 text-purple-800",
    "BD": "bg-blue-100 text-blue-800",
    "HD": "bg-green-100 text-green-800",
    "DVD": "bg-yellow-100 text-yellow-800"
  }

  const qualityNames = {
    "UHD_4K": "4K",
    "BD": "蓝光",
    "HD": "高清",
    "DVD": "DVD"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 搜索头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">资</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                资源搜
              </button>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="搜索电影、电视剧、综艺、动漫..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              搜索
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 搜索结果提示 */}
        <div className="mb-6">
          <p className="text-gray-600">
            {query && (
              <>
                搜索 "<span className="font-semibold text-blue-600">{query}</span>" 找到 
                <span className="font-semibold text-blue-600 ml-1">{searchResults.length}</span> 个相关资源
              </>
            )}
            {copySuccess && (
              <span className="ml-4 text-green-600 text-sm">{copySuccess}</span>
            )}
          </p>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">正在搜索...</p>
          </div>
        )}

        {/* 搜索结果 */}
        {!loading && searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                      🎬
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {movie.title}
                          <span className="text-gray-500 font-normal ml-2">({movie.year})</span>
                        </h3>
                        {movie.originalTitle && (
                          <p className="text-gray-600 text-sm mb-2">{movie.originalTitle}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{movie.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{movie.duration}分钟</span>
                          </div>
                          {movie.director && (
                            <div className="flex items-center space-x-1">
                              <span>导演: {movie.director}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 mb-3">
                          {movie.genre && movie.genre.split(',').map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                        {movie.plot && (
                          <p className="text-gray-600 text-sm line-clamp-2">{movie.plot}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        下载链接 ({movie.downloadLinks?.filter(link => link.isActive).length || 0} 个可用)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {movie.downloadLinks?.filter(link => link.isActive).map((link, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${platformColors[link.platform]}`}>
                                  {platformNames[link.platform]}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${qualityColors[link.quality]}`}>
                                  {qualityNames[link.quality]}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">{link.size}</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => copyToClipboard(link.url, '链接')}
                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                复制链接
                              </button>
                              
                              <button
                                onClick={() => openLink(link.url)}
                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                打开链接
                              </button>
                            </div>
                            
                            {link.password && (
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="text-xs text-gray-500">提取码:</span>
                                <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">{link.password}</code>
                                <button
                                  onClick={() => copyToClipboard(link.password, '提取码')}
                                  className="text-blue-600 hover:text-blue-800 text-xs"
                                >
                                  复制
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 无结果提示 */}
        {!loading && query && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到相关资源</h3>
            <p className="text-gray-600 mb-6">试试其他关键词或检查拼写</p>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                返回首页
              </button>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                清空搜索
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}