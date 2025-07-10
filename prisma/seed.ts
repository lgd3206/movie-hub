// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎬 开始数据库初始化...');

  // 清空现有数据
  await prisma.magnetLink.deleteMany({});
  await prisma.movie.deleteMany({});
  
  console.log('📝 创建电影数据...');

  // 创建电影数据
  const movies = await Promise.all([
    prisma.movie.create({
      data: {
        title: '流浪地球',
        description: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。',
        genre: '科幻,动作,剧情',
        magnetLinks: {
          create: [
            {
              name: '流浪地球 - 4K超高清',
              magnet: 'magnet:?xt=urn:btih:1234567890abcdef&dn=流浪地球.4K.2019',
              size: '8.5GB',
              quality: '4K',
              seeders: 1250,
              leechers: 89
            },
            {
              name: '流浪地球 - 1080P高清',
              magnet: 'magnet:?xt=urn:btih:abcdef1234567890&dn=流浪地球.1080P.2019',
              size: '2.5GB',
              quality: '1080P',
              seeders: 2340,
              leechers: 156
            },
            {
              name: '流浪地球 - 720P标清',
              magnet: 'magnet:?xt=urn:btih:567890abcdef1234&dn=流浪地球.720P.2019',
              size: '1.2GB',
              quality: '720P',
              seeders: 890,
              leechers: 45
            }
          ]
        }
      }
    }),

    prisma.movie.create({
      data: {
        title: '流浪地球2',
        description: '面对太阳危机，人类开启了宏大的移山计划。',
        genre: '科幻,动作,剧情',
        magnetLinks: {
          create: [
            {
              name: '流浪地球2 - 4K超高清',
              magnet: 'magnet:?xt=urn:btih:2345678901bcdef&dn=流浪地球2.4K.2023',
              size: '9.2GB',
              quality: '4K',
              seeders: 1890,
              leechers: 234
            },
            {
              name: '流浪地球2 - 1080P高清',
              magnet: 'magnet:?xt=urn:btih:bcdef2345678901&dn=流浪地球2.1080P.2023',
              size: '3.1GB',
              quality: '1080P',
              seeders: 3456,
              leechers: 289
            }
          ]
        }
      }
    }),

    prisma.movie.create({
      data: {
        title: '复仇者联盟：终局之战',
        description: '超级英雄们为了拯救宇宙，集结起来对抗灭霸。',
        genre: '动作,科幻,奇幻',
        magnetLinks: {
          create: [
            {
              name: '复仇者联盟：终局之战 - 1080P高清',
              magnet: 'magnet:?xt=urn:btih:3456789012cdef&dn=复仇者联盟终局之战.1080P.2019',
              size: '4.2GB',
              quality: '1080P',
              seeders: 4567,
              leechers: 345
            },
            {
              name: '复仇者联盟：终局之战 - 720P标清',
              magnet: 'magnet:?xt=urn:btih:cdef3456789012&dn=复仇者联盟终局之战.720P.2019',
              size: '2.1GB',
              quality: '720P',
              seeders: 2345,
              leechers: 123
            }
          ]
        }
      }
    }),

    prisma.movie.create({
      data: {
        title: '肖申克的救赎',
        description: '一个银行家因为妻子和她的情人被杀而判无期徒刑，他在监狱中结识了囚犯瑞德。',
        genre: '剧情,犯罪',
        magnetLinks: {
          create: [
            {
              name: '肖申克的救赎 - 1080P高清修复版',
              magnet: 'magnet:?xt=urn:btih:4567890123def&dn=肖申克的救赎.1080P.1994',
              size: '2.8GB',
              quality: '1080P',
              seeders: 5678,
              leechers: 234
            }
          ]
        }
      }
    }),

    prisma.movie.create({
      data: {
        title: '千与千寻',
        description: '10岁的千寻和父母一起从都市搬家到了乡下，不料在搬家的途中进入了一个奇怪的隧道。',
        genre: '动画,奇幻,家庭',
        magnetLinks: {
          create: [
            {
              name: '千与千寻 - 1080P双语版',
              magnet: 'magnet:?xt=urn:btih:5678901234ef&dn=千与千寻.1080P.2001',
              size: '2.2GB',
              quality: '1080P',
              seeders: 3456,
              leechers: 178
            },
            {
              name: '千与千寻 - 720P国语版',
              magnet: 'magnet:?xt=urn:btih:def5678901234&dn=千与千寻.720P.2001',
              size: '1.1GB',
              quality: '720P',
              seeders: 1234,
              leechers: 67
            }
          ]
        }
      }
    })
  ]);

  console.log('✅ 数据库初始化完成！');
  console.log(`📊 已创建 ${movies.length} 部电影`);
  
  // 统计磁力链接数量
  const magnetCount = await prisma.magnetLink.count();
  console.log(`🔗 已创建 ${magnetCount} 个磁力链接`);
  
  console.log('\n🎯 测试数据概览：');
  for (const movie of movies) {
    const links = await prisma.magnetLink.count({
      where: { movieId: movie.id }
    });
    console.log(`   • ${movie.title}: ${links} 个磁力链接`);
  }
}

main()
  .catch((e) => {
    console.error('❌ 数据库初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });