import { Link } from "react-router-dom";

export default function Sidebar({items, images}){
    return (
    <nav>
        {items.length ? (
            <ul className="sidebarUl">
                {items.map((item, i) => {
                    return <li className="sidebarLi" title={item.name} key={`item-${i}`}><Link to={`items/${item.pk}`}><img src={images[i]} alt={item.name} /></Link>{item.gold}</li>
                })}
            </ul>

        ) : <p>No items</p>}
    </nav>
    )
}