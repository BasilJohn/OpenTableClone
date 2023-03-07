import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({ menu }: { menu: Item[] }) {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-5 pb-1 bm-1">
                    <h1 className="font-bold text-4xl">
                        Menu
                    </h1>
                </div>
                {menu.length > 0 && <div className="flex flex-wrap justify-between">
                    {menu.map(menu => (
                        <MenuCard menu={menu} />
                    ))}
                </div>}
                {menu.length === 0 && <div className="flex flex-wrap justify-between">
                    <p>THis restaurant does not have a menu</p>
                </div>}
            </div>
        </main>
    )
}
