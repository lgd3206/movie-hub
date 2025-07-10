import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff, RefreshCw, BarChart3, Users, Download, AlertTriangle, CheckCircle2, Clock, Settings } from 'lucide-react';

const WeekTwoAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalMovies: 1234,
    totalLinks: 3456,
    activeLinks: 3267,
    todayViews: 2847,
    todayDownloads: 1823,
    pendingReviews: 12,
    failedLinks: 189
  });

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "流浪地球2",
      year: 2023,
      status: "APPROVED",
      viewCount: 12543,
      downloadCount: 8934,
      activeLinks: 3,
      totalLinks: 4,
      lastChecked: "2024-12-15 10:30",
      addedBy: "admin",
      addedAt: "2024-12-10"
    },
    {
      id: 2,
      title: "长安三万里",
      year: 2023,
      status: "PENDING",
      viewCount: 8901,
      downloadCount: 5642,
      activeLinks: 2,
      totalLinks: 2,
      lastChecked: "2024-12-15 09:15",
      addedBy: "user001",
      addedAt: "2024-12-14"
    },
    {
      id: 3,
      title: "封神第一部",
      year: 2023,
      status: "APPROVED",
      viewCount: 6789,
      downloadCount: 4123,
      activeLinks: 1,
      totalLinks: 3,
      lastChecked: "2024-12-14 16:45",
      addedBy: "admin",
      addedAt: "2024-12-12"
    }
  ]);

  const [linkChecks, setLinkChecks] = useState([
    {
      id: 1,
      movieTitle: "流浪地球2",
      platform: "夸克网盘",
      url: "https://pan.quark.cn/s/***",
      status: "active",
      lastCheck: "2024-12-15 10:30",
      responseTime: "1.2s",
      failCount: 0
    },
    {
      id: 2,
      movieTitle: "长安三万里",
      platform: "百度网盘",
      url: "https://pan.baidu.com/s/***",
      status: "failed",
      lastCheck: "2024-12-15 09:15",
      responseTime: "timeout",
      failCount: 3
    }
  ]);

  const tabs = [
    { id: 'dashboard', label: '数据总览', icon: BarChart3 },
    { id: 'movies', label: '内容管理', icon: Search },
    { id: 'links', label: '链接检测', icon: RefreshCw },
    { id: 'add', label: '添加内容', icon: Plus },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'settings', label: '系统设置', icon: Settings }
  ];

  const StatusBadge = ({ status }) => {
    const configs = {
      'APPROVED': { bg: 'bg-green-100', text: 'text-green-800', label: '已发布' },
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '待审核' },
      'REJECTED': { bg: 'bg-red-100', text: 'text-red-800', label: '已拒绝' }
    };
    
    const config = configs[status] || configs['PENDING'];
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const LinkStatusBadge = ({ status }) => {
    const configs = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', label: '正常', icon: CheckCircle2 },
      'failed': { bg: 'bg-red-100', text: 'text-red-800', label: '失效', icon: AlertTriangle },
      'checking': { bg: 'bg-blue-100', text: 'text-blue-800', label: '检测中', icon: Clock }
    };
    
    const config = configs[status] || configs['checking'];
    const Icon = config.icon;
    
    return (
      <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const DashboardTab = () => (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总影片数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMovies.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">本月新增 +234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">有效链接</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeLinks.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            可用率 {((stats.activeLinks / stats.totalLinks) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今日访问</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayViews.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">比昨日 +12.5%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">今日下载</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayDownloads.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Download className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">下载转化率 64.2%</p>
        </div>
      </div>

      {/* 待处理任务 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-500" />
            待处理任务
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800">待审核内容</p>
                <p className="text-xs text-yellow-600">有 {stats.pendingReviews} 个资源等待审核</p>
              </div>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">
                处理
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-800">失效链接</p>
                <p className="text-xs text-red-600">发现 {stats.failedLinks} 个失效链接</p>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                修复
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            今日热门资源
          </h3>
          <div className="space-y-3">
            {movies.slice(0, 3).map((movie, index) => (
              <div key={movie.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{movie.title}</p>
                    <p className="text-xs text-gray-500">{movie.downloadCount} 下载</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">↗ +{Math.floor(Math.random() * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">快速操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('add')}
            className="p-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-blue-600">添加电影</p>
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            className="p-4 border border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <RefreshCw className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-green-600">检查链接</p>
          </button>
          <button className="p-4 border border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <BarChart3 className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-purple-600">数据导出</p>
          </button>
          <button className="p-4 border border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group">
            <Settings className="h-8 w-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 group-hover:text-orange-600">系统设置</p>
          </button>
        </div>
      </div>
    </div>
  );

  const MoviesTab = () => (
    <div className="space-y-6">
      {/* 操作栏 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索电影标题、导演、演员..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>全部状态</option>
              <option>已发布</option>
              <option>待审核</option>
              <option>已拒绝</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>所有分类</option>
              <option>电影</option>
              <option>电视剧</option>
              <option>动漫</option>
              <option>综艺</option>
            </select>
            <button 
              onClick={() => setActiveTab('add')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              添加内容
            </button>
          </div>
        </div>
      </div>

      {/* 电影列表 */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  影片信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数据统计
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  链接状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  更新时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-lg">
                        🎬
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {movie.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {movie.year}年 • 由 {movie.addedBy} 添加
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={movie.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>观看: {movie.viewCount.toLocaleString()}</div>
                    <div>下载: {movie.downloadCount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {movie.activeLinks}/{movie.totalLinks} 可用
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          (movie.activeLinks / movie.totalLinks) > 0.8 ? 'bg-green-600' :
                          (movie.activeLinks / movie.totalLinks) > 0.5 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(movie.activeLinks / movie.totalLinks) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{movie.lastChecked}</div>
                    <div className="text-xs">添加于 {movie.addedAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="编辑">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="查看">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="检测链接">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="删除">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页 */}
      <div className="bg-white px-6 py-3 border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            显示第 1-{movies.length} 条，共 {stats.totalMovies} 条记录
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              上一页
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LinksTab = () => (
    <div className="space-y-6">
      {/* 链接检测控制面板 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">链接检测中心</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              全部重检
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              修复失效链接
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">正常链接</p>
                <p className="text-2xl font-bold text-green-800">{stats.activeLinks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">失效链接</p>
                <p className="text-2xl font-bold text-red-800">{stats.failedLinks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">检测中</p>
                <p className="text-2xl font-bold text-blue-800">45</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">平均响应</p>
                <p className="text-2xl font-bold text-purple-800">1.8s</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 链接检测结果 */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">链接检测结果</h3>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>全部状态</option>
                <option>正常</option>
                <option>失效</option>
                <option>检测中</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>全部平台</option>
                <option>夸克网盘</option>
                <option>百度网盘</option>
                <option>阿里云盘</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  资源信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  平台
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  响应时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最后检测
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {linkChecks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{link.movieTitle}</div>
                      <div className="text-sm text-gray-500">{link.url.replace(/(.{20}).*/, '$1...')}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {link.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LinkStatusBadge status={link.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.responseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{link.lastCheck}</div>
                    {link.failCount > 0 && (
                      <div className="text-xs text-red-600">失败 {link.failCount} 次</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="重新检测">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="访问链接">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="删除链接">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'movies':
        return <MoviesTab />;
      case 'links':
        return <LinksTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">管</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  资源搜管理后台
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                最后登录: 2024-12-15 16:00
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">管</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主布局 */}
      <div className="flex">
        {/* 侧边栏 */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* 主内容区域 */}
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default WeekTwoAdminDashboard;