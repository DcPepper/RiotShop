import { useParams, useLoaderData } from 'react-router';
import { useEffect, useState } from 'react';

const parseDescription = () => {
    
}

export default function Item() {
    const { itemId: id } = useParams();
    const [item, setItem] = useState(null);
    const [image, setImage] = useState(null);

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

    useEffect(() => {
        {item ? import(`../../../images/${item.pk}.png`).then(image => {
                setImage(image.default)
        }): setImage(null)}
    }, [item])
    
    return (
        <>
        { item ?
        <div id="item">
            "id": {id},<br/>
            "name": {item.name},<br/>
            "description_short": {item.description_short},<br/>
            "description": {item.description},<br/>
            "gold": {item.gold},<br/>
            "tags": {item.tags}<br/>
            {image ? <div className='image'><img src={image} alt={item.name}/></div>: ""}
        </div> : <p>loading</p>}
        </>
    )
}