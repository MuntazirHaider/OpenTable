import Header from './component/Header'
import Card from './component/Card'
import { PrismaClient, Location, Region, PRICE, Review } from '@prisma/client'

export interface RestaurantCardType {
  id: number
  name: string
  reviews: Review[]
  main_img: string
  price: PRICE
  location: Location
  region: Region
  slug: string
}

const prisma = new PrismaClient();

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  let restaurant = await prisma.restaurant.findMany({
    select:{
      id: true,
      name: true,
      reviews: true,
      main_img: true,
      price: true,
      location: true,
      region: true,
      slug: true,
    }
  });
  return restaurant;
}

export default async function Home() {

  const restaurant = await fetchRestaurant();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurant.map((restaurant) => (
          <Card restaurant={restaurant}/>
        ))}
      </div>
    </main>
  )
}
