import { categoryType } from './category'

export type bookType = {
  id: string
  name: string
  author: string
  release_date: string
  description: string
  quantity: number
  image: string
  category_id: string
  category: categoryType
  created_at: Date
  updated_at: Date
}
