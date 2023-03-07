export interface ProblemProps {
  id: string
  title: string
  unit_count: number
  unit_name: string
  unit_name_plural: string
  bounds: [[number, number], [number, number]]
}

export interface DistrictrMapProps {
  id?: number
  uuid: string
  name?: string
  description?: string
  problem: ProblemProps
  dateCreated?: Date
  dateModified?: Date
  live?: boolean
  publishedDate?: Date
  lastPublishedDate?: Date
  folder?: string
  image?: string
}
