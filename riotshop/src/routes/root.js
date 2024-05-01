import { Outlet, Link, useLoaderData } from "react-router-dom";

export async function loader(){
    const items = await fetch('http://localhost:8000/api/items').then(rep => rep.json())
    return { items }
}


export default function Root() {
    const { items } = useLoaderData();
    console.log(items.length)
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <nav>
              {items.length ? (
                <ul>
                {items.map((item, i) => {
                        return <li key={`item-${i}`}><Link to={`items/${item.pk}`}>{item.name}</Link></li>
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