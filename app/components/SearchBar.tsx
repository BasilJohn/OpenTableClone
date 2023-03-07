'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    
    return (
        <div className='text-left text-lg py-3 m-auto flex justify-center'>
            <input value={location} onChange={(e) => setLocation(e.target.value)}
                type="text" placeholder='State,City or town' className='rounded text-lg mr-3 w-74 p-2 w-[450px] bg-white text-black' />
            <button onClick={() => {
                if (location === "") return;
                router.push(`/search?city=${location}`)
                setLocation("");
            }}
            className='rounded bg-red-600 px-9 py-3 text-white'>Let's Go</button>
        </div>
    )
}
