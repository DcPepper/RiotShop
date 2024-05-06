import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function TransformInto({id}) {

    const [items, setItems] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await Promise.all(
                    items.map(async (item) => {
                        return await import(`/app/images/${item['into_field']}.png`).then(image => image.default)
                    })
                )
                let dictImages = {}
                console.log(items)
                dictImages = imagesData.reduce((imagesVar, image, idx) => (imagesVar[items[idx]['into_field']] = image, imagesVar), {})
                setImages(dictImages)
            } catch (err) {
                console.error(err)
            }
        }

        fetchImages();
    }, [items])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/relations?item=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item data');
                }
                const data = await response.json();
                setItems(data);
            } catch (err) {
                console.error(err)
            }

        };
        fetchData();
    }, [id])

    return (
        <ul className="transformInto">
            {items.filter(item => String(item['from_field']) === id).map((item, i) => {
                return <li className="transformLi" title={item.name} key={`transform-${i}`}><Link to={`/items/${item['into_field']}`}><img src={images[item['into_field']]} alt={'nofound'} /></Link></li>
            })}
        </ul>
    )
}