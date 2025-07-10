const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建种子数据...')

  try {
    // 创建测试电影
    const movies = [
      {
        title: "流浪地球2",
        originalTitle: "The Wandering Earth II",
        year: 2023,
        rating: 8.3,
        duration: 173,
        genre: "科幻,灾难",
        director: "郭帆",
        actors: "刘德华, 吴京, 李雪健",
        plot: "面对太阳即将毁灭的大灾难，人类开启了延续生存的流浪地球计划。",
        slug: "wandering-earth-2-2023",
        status: "APPROVED"
      },
      {
        title: "无间道",
        originalTitle: "Infernal Affairs",
        year: 2002,
        rating: 9.3,
        duration: 101,
        genre: "犯罪,悬疑,港片",
        director: "刘伟强",
        actors: "刘德华, 梁朝伟, 黄秋生",
        plot: "警方卧底陈永仁和黑社会卧底刘建明，分别渗透在对方的组织内部。",
        slug: "infernal-affairs-2002",
        status: "APPROVED"
      },
      {
        title: "肖申克的救赎",
        originalTitle: "The Shawshank Redemption",
        year: 1994,
        rating: 9.7,
        duration: 142,
        genre: "剧情,犯罪",
        director: "弗兰克·德拉邦特",
        actors: "蒂姆·罗宾斯, 摩根·弗里曼",
        plot: "银行家安迪因为妻子和她的情人被杀而被判无期徒刑。",
        slug: "shawshank-redemption-1994",
        status: "APPROVED"
      }
    ]

    for (const movieData of movies) {
      const movie = await prisma.movie.create({
        data: movieData
      })
      console.log(`创建电影: ${movie.title}`)

      // 添加下载链接
      await prisma.downloadLink.create({
        data: {
          movieId: movie.id,
          platform: "QUARK",
          linkType: "CLOUD_DRIVE",
          url: `https://pan.quark.cn/s/${movie.slug}`,
          password: "1234",
          quality: "HD",
          size: "4.2GB",
          format: "MP4",
          isActive: true
        }
      })

      await prisma.downloadLink.create({
        data: {
          movieId: movie.id,
          platform: "BAIDU",
          linkType: "CLOUD_DRIVE", 
          url: `https://pan.baidu.com/s/${movie.slug}`,
          password: "abcd",
          quality: "BD",
          size: "6.8GB",
          format: "MKV",
          isActive: true
        }
      })

      console.log(`  添加了 2 个下载链接`)
    }

    const movieCount = await prisma.movie.count()
    const linkCount = await prisma.downloadLink.count()
    
    console.log(`✅ 种子数据创建完成! 总计: ${movieCount} 部电影, ${linkCount} 个下载链接`)

  } catch (error) {
    console.error('❌ 创建种子数据时出错:', error)
  }
}

main()
  .then(() => {
    console.log('🎉 数据库种子数据执行完成')
    process.exit(0)
  })
  .catch((e) => {
    console.error('💥 种子脚本执行失败:', e)
    process.exit(1)
  })