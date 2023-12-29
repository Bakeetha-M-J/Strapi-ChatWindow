export interface Products {
  id: number
  attributes: Products
}

export interface Products {
  name: string
  price: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  category: Category
  image: Image
}

export interface Category {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  name: string
  createdAt: string
  updatedAt: string
}

export interface Image {
  data: any
}
