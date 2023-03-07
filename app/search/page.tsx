import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
    city?: string | undefined;
    cuisine?: string | undefined;
    price?: PRICE | undefined;
}
const fetchRestaurantByLocation = (searchParams: SearchParams) => {

    const where: any = {};
    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location;
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine;
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price;
    }
    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews: true
    }
        
    return prisma.restaurant.findMany({ where,select });

}

const fetchRegions = async () => {
    return prisma.location.findMany();
}

const fetchCuisine = async () => {
    return prisma.cuisine.findMany();
}

export default async function Search({ searchParams }: { searchParams: SearchParams }) {

    const restaurants = await fetchRestaurantByLocation(searchParams);
    const locations = await fetchRegions();
    const cuisine = await fetchCuisine();

    return (
        <>
            <Header />
            {/* HEADER */}
            <div className="flex py-4 m-auto w-2/3 justify-between items-start" >
                <SearchSideBar searchParams={searchParams} locations={locations} cuisine={cuisine} />
                <div className='w-5/6'>
                    {restaurants.length > 0 &&
                        restaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))
                    }
                    {restaurants.length === 0 && <p>No restaurants found.</p>}
                </div>
            </div>
        </>
    )
}