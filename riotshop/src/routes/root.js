import { useEffect, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export async function loader() {
    const items = await fetch('http://localhost:8000/api/items').then(rep => rep.json())
    return { items }
}


export default function Root() {
    const [images, setImages] = useState([]);
    const { items } = useLoaderData();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(
                    items.map(async (item) => {
                        return await import(`/app/images/${item.pk}.png`).then(image => image.default)
                    })
                )
                setImages(imagesData)
            } catch (err) {
                console.error(err)
            }
        }

        fetchImages();
    }, [items])

    useEffect(() => {
        if (images.length) setLoading(false)
    }, [images])


    return (
        <>
            {loading ? (
                <div id="sidebar">
                    <CircularProgress />
                </div>
            ) : <div id="sidebar">
                <h1>League of Legends shop</h1>
                <nav>
                    {items.length ? (
                        <ul className="sidebarUl">
                            {items.map((item, i) => {
                                return <li className="sidebarLi" title={item.name} key={`item-${i}`}><Link to={`items/${item.pk}`}><img src={images[i]} alt={item.name} /></Link>{item.gold}</li>
                            })}
                        </ul>

                    ) : <p>No items</p>}
                </nav>
            </div>}
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}