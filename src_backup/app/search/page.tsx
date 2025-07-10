'use client'

import React, { useState, useEffect } from 'react';
import { Search, Copy, ExternalLink, Star, Calendar, Clock, Download, Eye, Filter, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [copySuccess, setCopySuccess] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('hot');
  
  // 模拟搜索结果数据
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: "无间道",
      originalTitle: "Infernal Affairs",
      year: 2002,
      rating: 9.3,
      duration: 101,
      category: "电影",
      tags: ["犯罪", "悬疑", "港片"],
      poster: "🎬",
      heat: 100,
      updateTime: "2024-04-03",
      downloadLinks: [
        {
          platform: "夸克网盘",
          quality: "4K",
          size: "8.5GB",
          url: "https://pan.quark.cn/s/abcd1234",
          password: "1234",
          isActive: true,
          uploadTime: "2024-04-01"
        },
        {
          platform: "百度网盘", 
          quality: "蓝光",
          size: "4.2GB",
          url: "https://pan.baidu.com/s/efgh5678",
          password: "abcd",
          isActive: true,
          uploadTime: "2024-04-02"
        },
        {
          platform: "阿里云盘",
          quality: "高清",
          size: "2.1GB", 
          url: "https://www.aliyundrive.com/s/ijkl9012",
          password: "",
          isActive: false,
          uploadTime: "2024-03-28"
        }
      ]
    },
    {
      id: 2,
      title: "流浪地球2",
      originalTitle: "The Wandering Earth II", 
      year: 2023,
      rating: 8.3,
      duration: 173,
      category: "电影",
      tags: ["科幻", "灾难", "国产"],
      poster: "🎬",
      heat: 95,
      updateTime: "2024-04-02",
      downloadLinks: [
        {
          platform: "夸克网盘",
          quality: "4K",
          size: "12.8GB",
          url: "https://pan.quark.cn/s/mnop3456", 
          password: "5678",
          isActive: true,
          uploadTime: "2024-04-01"
        },
        {
          platform: "百度网盘",
          quality: "蓝光",
          size: "6.5GB",
          url: "https://pan.baidu.com/s/qrst7890",
          password: "efgh",
          isActive: true,
          uploadTime: "2024-04-02"
        }
      ]
    }
  ]);

  // 热门推荐数据
  const hotRecommendations = [
    "肖申克的救赎",
    "教父",
    "阿甘正传", 
    "泰坦尼克号",
    "星际穿越",
    "盗梦空间",
    "复仇者联盟",
    "速度与激情",
    "变形金刚",
    "哈利波特"
  ];

  const platformColors = {
    "夸克网盘": "bg-blue-100 text-blue-800 border-blue-200",
    "百度网盘": "bg-green-100 text-green-800 border-green-200", 
    "阿里云盘": "bg-orange-100 text-orange-800 border-orange-200",
    "迅雷云盘": "bg-purple-100 text-purple-800 border-purple-200"
  };

  const qualityColors = {
    "4K": "bg-purple-100 text-purple-800",
    "蓝光": "bg-blue-100 text-blue-800",
    "高清": "bg-green-100 text-green-800", 
    "标清": "bg-yellow-100 text-yellow-800"
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type}已复制!`);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const LinkButton = ({ link, movie }: { link: any, movie: any }) => (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${platformColors[link.platform]}`}>
            {link.platform}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${qualityColors[link.quality]}`}>
            {link.quality}
          </span>
          {!link.isActive && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
              链接失效
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">{link.size}</span>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => copyToClipboard(link.url, '链接')}
          disabled={!link.isActive}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            link.isActive 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Copy className="w-4 h-4 mr-1" />
          复制链接
        </button>
        
        <button
          onClick={() => openLink(link.url)}
          disabled={!link.isActive}
          className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            link.isActive
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部搜索区域 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer"
                   onClick={() => router.push('/')}>
                <span className="text-white font-bold">资</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 cursor-pointer"
                  onClick={() => router.push('/')}>资源搜</h1>
            </div>
            
            {/* 搜索框 */}
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
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              搜索
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* 主内容区域 */}
          <main className="flex-1">
            {/* 筛选和排序 */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">筛选:</span>
                  <div className="flex space-x-2">
                    {['all', 'movie', 'tv', 'anime'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          activeFilter === filter
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filter === 'all' ? '全部' : filter === 'movie' ? '电影' : filter === 'tv' ? '电视剧' : '动漫'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">排序:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="hot">热度</option>
                    <option value="time">时间</option>
                    <option value="rating">评分</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 搜索结果提示 */}
            <div className="mb-4">
              <p className="text-gray-600">
                搜索 "<span className="font-semibold text-blue-600">{searchParams.get('q')}</span>" 找到 <span className="font-semibold text-blue-600">{searchResults.length}</span> 个相关资源
                {copySuccess && (
                  <span className="ml-4 text-green-600 text-sm">{copySuccess}</span>
                )}
              </p>
            </div>

            {/* 搜索结果列表 */}
            <div className="space-y-6">
              {searchResults.map((movie) => (
                <div key={movie.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex gap-4">
                    {/* 电影海报占位符 */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
                        {movie.poster}
                      </div>
                    </div>

                    {/* 电影信息 */}
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
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{movie.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{movie.duration}分钟</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>热度 {movie.heat}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            {movie.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right text-sm text-gray-500">
                          <div>更新时间</div>
                          <div>{movie.updateTime}</div>
                        </div>
                      </div>

                      {/* 下载链接 */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          下载链接 ({movie.downloadLinks.filter(link => link.isActive).length}/{movie.downloadLinks.length} 可用)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {movie.downloadLinks.map((link, index) => (
                            <LinkButton key={index} link={link} movie={movie} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                加载更多结果
              </button>
            </div>
          </main>

          {/* 侧边栏 */}
          <aside className="w-80">
            {/* 热门推荐 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                热门推荐
              </h3>
              <div className="space-y-2">
                {hotRecommendations.map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setSearchQuery(item)}
                  >
                    {index + 1}. {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 搜索提示 */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">搜索提示</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 尝试使用电影的英文名搜索</li>
                <li>• 添加年份可以更精确匹配</li>
                <li>• 使用演员或导演名字搜索</li>
                <li>• 发现失效链接请及时反馈</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;