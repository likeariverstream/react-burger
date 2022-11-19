export type TsetCookie = {
  name: string,
  value: string,
  props: { [key: string]: any }
} & { expires?: string | number | Date }

export type Tingredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  id?: string
}
