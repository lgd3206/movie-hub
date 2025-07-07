export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎬 影视资源搜索
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              覆盖最新电影、热播剧集、经典动漫
            </p>
          </div>

          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索电影、电视剧、导演、演员..."
                className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 text-lg text-gray-800"
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                搜索
              </button>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">1,000+</div>
              <div className="text-slate-400">影视资源</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-slate-400">今日更新</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99%</div>
              <div className="text-slate-400">链接可用</div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能展示 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          主要功能
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">智能搜索</h3>
            <p className="text-gray-600">
              支持中英文搜索，快速找到您想要的影视资源
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-xl font-bold mb-2">多平台支持</h3>
            <p className="text-gray-600">
              支持夸克、百度、阿里云盘等主流网盘平台
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">实时更新</h3>
            <p className="text-gray-600">
              每日更新最新资源，确保链接有效性
            </p>
          </div>
        </div>
      </section>

      {/* 示例内容 */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            热门资源
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 示例电影卡片 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex space-x-4">
                <div className="w-20 h-28 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  🎬
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">流浪地球2</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    The Wandering Earth II (2023)
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ 8.3</span>
                    <span>•</span>
                    <span>173分钟</span>
                  </div>
                  <div className="mt-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      4K
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-1">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex space-x-4">
                <div className="w-20 h-28 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  🎨
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">长安三万里</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Chang An (2023)
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ 8.1</span>
                    <span>•</span>
                    <span>168分钟</span>
                  </div>
                  <div className="mt-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex space-x-4">
                <div className="w-20 h-28 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  📺
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">更多资源</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    即将添加更多精彩内容
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>🔄 持续更新中</span>
                  </div>
                  <div className="mt-3">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      敬请期待
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">影视资源搜索平台</h3>
            <p className="text-gray-400">
              提供最新最全的影视资源搜索服务
            </p>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 Movie Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}