// src/lib/movieApi.ts - 适配国内网络环境
export class MovieAPI {
  // 豆瓣API（国内稳定访问）
  static async searchDouban(query: string) {
    try {
      // 使用公开的豆瓣搜索接口
      const response = await fetch(`https://movie.douban.com/j/subject_suggest?q=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.warn('豆瓣API请求失败:', error);
      return null;
    }
  }

  // TMDB API备用方案（需要科学上网时使用）
  static async searchTMDB(query: string) {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!API_KEY) return null;
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=zh-CN`
      );
      return await response.json();
    } catch (error) {
      console.warn('TMDB API请求失败:', error);
      return null;
    }
  }

  // 综合搜索方法
  static async searchMovie(query: string) {
    // 优先使用豆瓣，失败后使用TMDB
    let result = await this.searchDouban(query);
    if (!result || result.length === 0) {
      result = await this.searchTMDB(query);
    }
    return result;
  }
}