import { useParams, useLoaderData } from 'react-router';
import { useEffect, useState } from 'react';

export default function Item() {
    const { itemId: id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/items/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item data');
                  }
                const data = await response.json();
                setItem(data);
            } catch (err){
                console.error(err)
            }
            
        };
        fetchData();
    }, [id])
    
    return (
        <>
        { item ?
        <div id="item">
            "id": {id},
            "name": {item.name},
            "description_short": {item.description_short},
            "description": {item.description},
            "gold": {item.gold},
            "tags": {item.tags}
        </div> : <p>loading</p>}
        </>
    )
}