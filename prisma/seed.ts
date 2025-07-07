import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建种子数据...')

  try {
    // 清理现有数据
    await prisma.downloadLink.deleteMany()
    await prisma.submission.deleteMany()
    await prisma.movie.deleteMany()

    console.log('已清理现有数据')

    // 创建测试电影数据
    const movie1 = await prisma.movie.create({
      data: {
        title: "流浪地球2",
        originalTitle: "The Wandering Earth II",
        year: 2023,
        rating: 8.3,
        duration: 173,
        genre: ["科幻", "灾难"],
        director: "郭帆",
        actors: "刘德华, 吴京, 李雪健",
        plot: "面对太阳即将毁灭的大灾难，人类开启了延续生存的「流浪地球」计划，推动地球离开太阳系寻找新家园的故事。",
        slug: "wandering-earth-2-2023",
        status: "APPROVED",
      }
    })

    console.log(`创建电影: ${movie1.title}`)

    // 为电影添加下载链接
    await prisma.downloadLink.create({
      data: {
        movieId: movie1.id,
        platform: "QUARK",
        linkType: "CLOUD_DRIVE",
        url: "https://pan.quark.cn/s/example1",
        password: "1234",
        quality: "UHD_4K",
        size: "8.5GB",
        format: "MKV",
        isActive: true
      }
    })

    await prisma.downloadLink.create({
      data: {
        movieId: movie1.id,
        platform: "BAIDU",
        linkType: "CLOUD_DRIVE",
        url: "https://pan.baidu.com/s/example1",
        password: "abcd",
        quality: "HD",
        size: "3.2GB",
        format: "MP4",
        isActive: true
      }
    })

    console.log('添加下载链接完成')

    // 创建第二部电影
    const movie2 = await prisma.movie.create({
      data: {
        title: "长安三万里",
        originalTitle: "Chang An",
        year: 2023,
        rating: 8.1,
        duration: 168,
        genre: ["动画", "历史"],
        director: "谢君伟",
        actors: "杨天翔, 凌振赫",
        plot: "大唐盛世，诗人高适携手李白等挚友，共创传世诗篇的动人故事。",
        slug: "chang-an-2023",
        status: "APPROVED",
      }
    })

    console.log(`创建电影: ${movie2.title}`)

    await prisma.downloadLink.create({
      data: {
        movieId: movie2.id,
        platform: "QUARK",
        linkType: "CLOUD_DRIVE",
        url: "https://pan.quark.cn/s/example2",
        password: "5678",
        quality: "HD",
        size: "4.1GB",
        format: "MP4",
        isActive: true
      }
    })

    console.log('种子数据创建完成!')

    // 显示统计信息
    const movieCount = await prisma.movie.count()
    const linkCount = await prisma.downloadLink.count()
    
    console.log(`总计: ${movieCount} 部电影, ${linkCount} 个下载链接`)

  } catch (error) {
    console.error('创建种子数据时出错:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('数据库连接已关闭')
  })
  .catch(async (e) => {
    console.error('种子脚本执行失败:', e)
    await prisma.$disconnect()
    process.exit(1)
  })