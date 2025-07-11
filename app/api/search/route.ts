import { NextRequest, NextResponse } from 'next/server';

// 模拟电影数据
const mockMovies = [
  {
    Title: "复仇者联盟：终局之战",
    Year: "2019",
    imdbID: "tt4154796",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
    Plot: "在灭霸打响指消灭宇宙一半生命后，剩余的复仇者们必须团结起来，撤销无限手套造成的破坏。",
    imdbRating: "8.4",
    Director: "Anthony Russo, Joe Russo",
    Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    Runtime: "181 min",
    Genre: "Action, Adventure, Drama"
  },
  {
    Title: "阿凡达",
    Year: "2009", 
    imdbID: "tt0499549",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    Plot: "一个瘫痪的前海军陆战队员被派往潘多拉星球执行一项独特的任务，他发现自己在一个史诗般的战争中陷入了两难境地。",
    imdbRating: "7.9",
    Director: "James Cameron",
    Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy"
  },
  {
    Title: "泰坦尼克号",
    Year: "1997",
    imdbID: "tt0120338", 
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop",
    Plot: "一个十七岁的贵族爱上了一个好心的但贫穷的艺术家，他们在1912年4月泰坦尼克号的首航中相遇。",
    imdbRating: "7.9",
    Director: "James Cameron", 
    Actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane",
    Runtime: "194 min",
    Genre: "Drama, Romance"
  },
  {
    Title: "星际穿越",
    Year: "2014",
    imdbID: "tt0816692",
    Type: "movie", 
    Poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
    Plot: "一队探险家利用他们新发现的虫洞超越人类太空旅行的极限，在浩瀚宇宙中征服距离。",
    imdbRating: "8.6",
    Director: "Christopher Nolan",
    Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain", 
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi"
  },
  {
    Title: "盗梦空间",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1489599312549-f45704fec887?w=300&h=450&fit=crop", 
    Plot: "一个熟练的盗贼是企业间谍活动中的绝对高手，他被给予了一个最后的机会救赎，但这次他必须完成看似不可能的任务：植入意念。",
    imdbRating: "8.8",
    Director: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Marion Cotillard, Tom Hardy",
    Runtime: "148 min", 
    Genre: "Action, Adventure, Sci-Fi"
  },
  {
    Title: "哈利·波特与魔法石",
    Year: "2001",
    imdbID: "tt0241527",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    Plot: "一个被忽视的孤儿在11岁时发现自己是一个巫师，并被霍格沃茨魔法学校录取。",
    imdbRating: "7.6", 
    Director: "Chris Columbus",
    Actors: "Daniel Radcliffe, Rupert Grint, Emma Watson",
    Runtime: "152 min",
    Genre: "Adventure, Family, Fantasy"
  },
  {
    Title: "黑客帝国",
    Year: "1999",
    imdbID: "tt0133093",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop",
    Plot: "一个电脑程序员被神秘的反叛者带领，他们向他揭示了他所知道的现实的令人震惊的真相。",
    imdbRating: "8.7",
    Director: "Lana Wachowski, Lilly Wachowski", 
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    Runtime: "136 min",
    Genre: "Action, Sci-Fi"
  },
  {
    Title: "教父",
    Year: "1972", 
    imdbID: "tt0068646",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1489599312549-f45704fec887?w=300&h=450&fit=crop",
    Plot: "一个有组织犯罪王朝的老龄家长将他的秘密帝国的控制权转移给他不情愿的儿子。",
    imdbRating: "9.2",
    Director: "Francis Ford Coppola",
    Actors: "Marlon Brando, Al Pacino, James Caan", 
    Runtime: "175 min",
    Genre: "Crime, Drama"
  }
];

// OMDB API 搜索函数
async function searchOMDB(query: string) {
  const apiKey = process.env.OMDB_API_KEY;
  
  if (!apiKey) {
    throw new Error('OMDB API key not configured');
  }
  
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`
  );
  
  if (!response.ok) {
    throw new Error('OMDB API request failed');
  }
  
  const data = await response.json();
  
  // 如果找到结果，获取详细信息
  if (data.Response === 'True' && data.Search) {
    const detailedMovies = await Promise.all(
      data.Search.slice(0, 8).map(async (movie: any) => {
        try {
          const detailResponse = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`
          );
          const detailData = await detailResponse.json();
          return detailData.Response === 'True' ? detailData : movie;
        } catch {
          return movie;
        }
      })
    );
    
    return {
      Response: 'True',
      Search: detailedMovies,
      dataSource: 'OMDB API (实时数据)'
    };
  }
  
  return data;
}

// 本地数据搜索函数  
function searchLocalData(query: string) {
  const searchTerm = query.toLowerCase();
  const results = mockMovies.filter(movie => 
    movie.Title.toLowerCase().includes(searchTerm) ||
    movie.Director.toLowerCase().includes(searchTerm) ||
    movie.Actors.toLowerCase().includes(searchTerm) ||
    movie.Genre.toLowerCase().includes(searchTerm)
  );
  
  return {
    Response: results.length > 0 ? 'True' : 'False',
    Search: results,
    dataSource: '本地演示数据',
    Error: results.length === 0 ? '未找到匹配的电影' : undefined
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({
      Response: 'False',
      Error: '请提供搜索关键词'
    });
  }
  
  try {
    // 首先尝试使用 OMDB API
    try {
      const omdbResult = await searchOMDB(query);
      return NextResponse.json(omdbResult);
    } catch (omdbError) {
      console.log('OMDB API 不可用，使用本地数据:', omdbError);
      
      // 如果 OMDB API 失败，使用本地数据
      const localResult = searchLocalData(query);
      return NextResponse.json(localResult);
    }
  } catch (error) {
    console.error('搜索错误:', error);
    return NextResponse.json({
      Response: 'False', 
      Error: '搜索服务暂时不可用，请稍后重试'
    });
  }
}