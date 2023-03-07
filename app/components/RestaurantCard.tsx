import Link from "next/link"
import { RestaurantCardType } from "../page"
import Price from "./Price"
import Stars from "./Stars"

interface Props {
  restaurant: RestaurantCardType
}
export default function Card({ restaurant }: Props) {
  return (
    <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img className='w-full h-36' src={restaurant.main_image} alt='' />
        <div className='p-1'>
          <h3 className='font-bold text-2xl mb-2 text-black'>
            {restaurant.name}</h3>
          <div className='flex items-start'>
            <div className='flex mb-2 text-black'>
              <Stars reviews={restaurant.reviews}/>
            </div>
            <p className='ml-2 text-black'>{restaurant.reviews.length} review{restaurant.reviews.length==1?"":"s"}</p>
          </div>
          <div className='flex text-reg font-light text-black capitalize'>
            <p className='mr-3'>{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className='text-reg mt-1 font-bold'>Booked 2 times today</p>
        </div>
      </Link>
    </div>
  )
}