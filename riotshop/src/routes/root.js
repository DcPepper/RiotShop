import { useEffect, useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

export async function loader(search = "", tag = "") {
    let url= ""
    if (search){
        url =`http://localhost:8000/api/items?s=${search}`;
        if (tag){
            url += `&tag=${tag}`
        }
    } else {
        if (tag) {
            url = `http://localhost:8000/api/items?tag=${tag}`
        } else {
            url = 'http://localhost:8000/api/items'
        }
        
    }
    const items = await fetch(url).then(rep => rep.json());
    return { items }
}


export default function Root() {
    const [images, setImages] = useState({});
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(
                    items.map(async (item) => {
                        return await import(`/app/images/${item.pk}.png`).then(image => image.default)
                    })
                )
                let dictImages = {}
                dictImages = imagesData.reduce((imagesVar, image, idx) => (imagesVar[items[idx].pk] = image, imagesVar), {})
                setImages(dictImages)
            } catch (err) {
                console.error(err)
            }
        }

        fetchImages();
    }, [items])

    useEffect(() => {
        if (Object.keys(images).length) setLoading(false)
    }, [images])

    useEffect(() => {
        const fetchData = async () => {
            const { items } = await loader(search, tags.join("-"));
            setItems(items);
        };

        fetchData();
    }, [search, tags])
    
    const handleSearch = (search) => {
        setSearch(search)
    }

    const handleTag = (tag) => {
        setTags(tag)
    }

    return (
        <>
            {loading ? (
                <div id="core">
                    <CircularProgress />
                </div>
            ) : 
                <div id="core">
                    <div id="sidebar">
                        <div>
                            <SearchBar handleSearch={handleSearch}/>
                            <FilterBar handleTag={handleTag} />
                        </div>
                        <Sidebar items={items} images={images} />
                    </div>
                    <div id="detail">
                        <Outlet />
                    </div>
                </div>
            }
            
        </>
    );
}