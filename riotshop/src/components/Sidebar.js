import { Link } from "react-router-dom";

export default function Sidebar({items, images}){
    return (
    <nav>
        {items.length ? (
            <>
            <h1>Item de départ</h1>
            <ul className="sidebarUl">
                {items.filter(item => item.depth === null).map((item, i) => {
                    return <li className="sidebarLi" title={item.name} key={`item-${i}-start`}><Link to={`items/${item.pk}`}><img src={images[item.pk]} alt={item.name} /></Link>{item.gold}</li>
                })}
            </ul>
            <h1>Item épique</h1>
            <ul className="sidebarUl">
                {items.filter(item => item.depth === 2).map((item, i) => {
                    return <li className="sidebarLi" title={item.name} key={`item-${i}-epic`}><Link to={`items/${item.pk}`}><img src={images[item.pk]} alt={item.name} /></Link>{item.gold}</li>
                })}
            </ul>
            <h1>Item légendaire</h1>
            <ul className="sidebarUl">
                {items.filter(item => item.depth === 3).map((item, i) => {
                    return <li className="sidebarLi" title={item.name} key={`item-${i}-legend`}><Link to={`items/${item.pk}`}><img src={images[item.pk]} alt={item.name} /></Link>{item.gold}</li>
                })}
            </ul>
            </>
            

        ) : <p>No items</p>}
    </nav>
    )
}