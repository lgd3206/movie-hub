import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  console.log('=== 开始搜索API ===');
  console.log('搜索关键词:', query);

  if (!query) {
    console.log('错误: 没有提供搜索关键词');
    return NextResponse.json({ error: '请提供搜索关键词' }, { status: 400 });
  }

  try {
    // 构建API URL
    const apiUrl = `https://api.dyj9.cc/api.php?name=${encodeURIComponent(query)}`;
    console.log('API URL:', apiUrl);

    // 发送请求
    const response = await fetch(apiUrl);
    console.log('API响应状态:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取响应数据
    const data = await response.json();
    console.log('=== API返回的原始数据 ===');
    console.log('数据类型:', typeof data);
    console.log('数据内容:', JSON.stringify(data, null, 2));

    // 检查响应格式
    if (!data || typeof data !== 'object') {
      console.log('错误: API返回数据格式不正确');
      return NextResponse.json({ error: 'API返回数据格式错误', data }, { status: 500 });
    }

    // 处理数据 - 直接返回原始数据，让前端处理
    console.log('=== 成功获取数据 ===');
    console.log('返回给前端的数据:', JSON.stringify(data, null, 2));

    return NextResponse.json(data);

  } catch (error) {
    console.log('=== 搜索API错误 ===');
    
    // 类型守卫：检查error是否是Error的实例
    if (error instanceof Error) {
      console.log('错误类型:', error.constructor.name);
      console.log('错误消息:', error.message);
      console.log('错误堆栈:', error.stack);
    } else {
      console.log('未知错误:', error);
    }

    return NextResponse.json(
      { 
        error: '搜索失败', 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}