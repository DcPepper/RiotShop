import { useEffect, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

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
                <SearchBar />
                <Sidebar items={items} images={images} />
            </div>}
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}