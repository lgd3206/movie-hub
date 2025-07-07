export interface Movie {
  id: string
  title: string
  originalTitle?: string
  year: number
  rating?: number
  duration?: number
  genre: string[]
  director?: string
  actors?: string
  plot?: string
  posterUrl?: string
  slug: string
  viewCount: number
  downloadCount: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED'
  downloadLinks: DownloadLink[]
  createdAt: Date
  updatedAt: Date
}

export interface DownloadLink {
  id: string
  platform: 'QUARK' | 'BAIDU' | 'ALIYUN' | 'THUNDER' | 'OTHER'
  linkType: 'DIRECT' | 'CLOUD_DRIVE' | 'MAGNET'
  url: string
  password?: string
  quality: 'CAM' | 'TS' | 'TC' | 'DVD' | 'HD' | 'BD' | 'UHD_4K'
  size?: string
  format?: string
  isActive: boolean
  lastChecked?: Date
  checkCount: number
  failCount: number
  sourceUrl?: string
  sourceName?: string
  createdAt: Date
}