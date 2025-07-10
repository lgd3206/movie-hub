// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    console.log('=== 搜索API被调用 ===');
    console.log('搜索查询:', query);

    if (!query) {
      return NextResponse.json({ movies: [] });
    }

    // 测试数据库连接
    console.log('测试数据库连接...');
    const totalCount = await prisma.movie.count();
    console.log('数据库中电影总数:', totalCount);

    // 执行搜索，包含磁力链接
    console.log('执行搜索...');
    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { genre: { contains: query } }
        ]
      },
      include: {
        magnetLinks: {
          orderBy: [
            { quality: 'desc' },  // 按质量排序（4K > 1080P > 720P）
            { seeders: 'desc' }   // 按做种人数排序
          ]
        }
      }
    });

    console.log('搜索结果:', movies);
    console.log(`找到 ${movies.length} 部电影，共 ${movies.reduce((sum, movie) => sum + movie.magnetLinks.length, 0)} 个磁力链接`);

    return NextResponse.json({ movies });
  } catch (error) {
    console.log('=== 搜索API错误 ===');
    console.log('错误类型:', error.constructor.name);
    console.log('错误消息:', error.message);
    console.log('错误堆栈:', error.stack);
    
    return NextResponse.json(
      { error: '搜索失败', details: error.message },
      { status: 500 }
    );
  }
}