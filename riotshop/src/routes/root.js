import { useEffect, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";

export async function loader(){
    const items = await fetch('http://localhost:8000/api/items').then(rep => rep.json())
    return { items }
}


export default function Root() {
    const [images, setImages] = useState([]);
    const { items } = useLoaderData();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(
                    items.map(async (item) => {
                        return await import(`../../../images/${item.pk}.png`).then(image => image.default)
                    })
                )
                console.log(imagesData)
                setImages(imagesData)
            } catch (err){
                console.error(err)
            }
        }

        fetchImages();
        
    }, [items])
    
        

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <nav>
              {items.length ? (
                <ul>
                {items.map((item, i) => {
                        return <li key={`item-${i}`}><Link to={`items/${item.pk}`}><img src={images[i]} alt={item.name}/></Link></li>
                })}
                </ul> 
                
              ): <p>No items</p>}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }