'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setHasSearched(true)
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      console.log('API完整响应:', data)
      
      // 检查数据格式，支持两种可能的响应格式
      let movieList = []
      if (Array.isArray(data)) {
        // 如果直接返回数组
        movieList = data
      } else if (data && data.movies && Array.isArray(data.movies)) {
        // 如果返回 {movies: [...]} 格式
        movieList = data.movies
      } else if (data && Array.isArray(data.data)) {
        // 如果返回 {data: [...]} 格式
        movieList = data.data
      }
      
      console.log('处理后的电影列表:', movieList)
      console.log('电影数量:', movieList.length)
      
      // 打印每部电影的详细信息
      movieList.forEach((movie, index) => {
        console.log(`电影 ${index + 1}:`, movie.title)
        console.log(`磁力链接:`, movie.magnetLinks)
        console.log(`磁力链接数量:`, movie.magnetLinks ? movie.magnetLinks.length : 0)
      })
      
      setMovies(movieList)
    } catch (error) {
      console.error('搜索错误:', error)
      setMovies([])
    }
    
    setIsLoading(false)
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 页面标题 */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#333',
          marginBottom: '10px'
        }}>
          🎬 资源搜
        </h1>
        <p style={{ color: '#666' }}>搜索你喜欢的电影资源</p>
      </header>

      {/* 搜索表单 */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索电影名称..."
          style={{
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            width: '300px'
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '搜索中...' : '搜索'}
        </button>
      </form>

      {/* 调试信息 */}
      {hasSearched && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '10px', 
          marginBottom: '20px',
          border: '1px solid #dee2e6',
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <strong>调试信息:</strong><br/>
          搜索关键词: {query}<br/>
          是否正在加载: {isLoading ? '是' : '否'}<br/>
          电影数量: {movies ? movies.length : 0}<br/>
          电影数据: {movies && movies.length > 0 ? '有数据' : '无数据'}
        </div>
      )}

      {/* 搜索结果 */}
      <div>
        {isLoading && (
          <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            正在搜索中，请稍候...
          </div>
        )}

        {!isLoading && hasSearched && (!movies || movies.length === 0) && (
          <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            没有找到相关电影，请尝试其他关键词
          </div>
        )}

        {movies && movies.length > 0 && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              🎬 搜索到 {movies.length} 部电影
            </h2>
            
            {movies.map((movie, movieIndex) => (
              <div key={movie.id || movieIndex} style={{
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#fafafa'
              }}>
                {/* 电影标题 */}
                <h3 style={{ 
                  color: '#333', 
                  marginBottom: '10px',
                  fontSize: '1.5rem'
                }}>
                  🎬 {movie.title}
                </h3>
                
                {/* 电影信息 */}
                {movie.description && (
                  <p style={{ color: '#666', marginBottom: '8px' }}>
                    <strong>简介：</strong> {movie.description}
                  </p>
                )}
                
                {movie.genre && (
                  <p style={{ color: '#666', marginBottom: '15px' }}>
                    <strong>类型：</strong> {movie.genre}
                  </p>
                )}

                {/* 磁力链接 */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '2px solid #28a745'
                }}>
                  <h4 style={{ 
                    color: '#333', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    🔗 下载链接 
                    <span style={{
                      backgroundColor: movie.magnetLinks && movie.magnetLinks.length > 0 ? '#28a745' : '#dc3545',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {movie.magnetLinks ? movie.magnetLinks.length : 0} 个可用
                    </span>
                  </h4>
                  
                  {movie.magnetLinks && movie.magnetLinks.length > 0 ? (
                    <div>
                      {movie.magnetLinks.map((link, linkIndex) => (
                        <div key={link.id || linkIndex} style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          marginBottom: '10px',
                          borderRadius: '8px',
                          border: '1px solid #dee2e6'
                        }}>
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                          }}>
                            <span style={{ 
                              fontWeight: 'bold', 
                              color: '#495057',
                              fontSize: '16px'
                            }}>
                              📱 {link.quality}
                            </span>
                            <span style={{ 
                              color: '#6c757d',
                              fontSize: '14px',
                              backgroundColor: '#e9ecef',
                              padding: '2px 8px',
                              borderRadius: '12px'
                            }}>
                              💾 {link.size}
                            </span>
                          </div>
                          <div>
                            <a 
                              href={link.magnetUrl}
                              style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                fontSize: '12px',
                                wordBreak: 'break-all',
                                display: 'block',
                                padding: '5px',
                                backgroundColor: '#fff',
                                border: '1px solid #ced4da',
                                borderRadius: '4px'
                              }}
                              title="点击复制或下载"
                            >
                              🧲 {link.magnetUrl}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ 
                      color: '#6c757d', 
                      textAlign: 'center',
                      padding: '20px',
                      backgroundColor: '#f8d7da',
                      border: '1px solid #f5c6cb',
                      borderRadius: '8px'
                    }}>
                      ❌ 暂无可用下载链接
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}