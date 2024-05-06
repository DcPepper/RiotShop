const convertDescription = description => {

    return description.replace(/<([^/]+?)>(.*?)<\/\1>/g, function (match, p1, p2) {
        if (p1 === "mainText" || p1 === "stats") {
            return `<div class="${p1}">${convertDescription(p2)}</div>`;
        } if (p1 === "passive") {
            return `<h3 class="${p1}">${convertDescription(p2)}</h3>`;
        } else {
            return `<span class="${p1}">${convertDescription(p2)}</span>`;
        }
    })
}

export default function Description({ description }) {
    description = convertDescription(description)
    return (
        /*
        <div>
            <ul className="ulStats">
                {stats.split('<br>').map(stat => {
                    return <li className="liStats" dangerouslySetInnerHTML={{ __html: stat }}></li>
                })}
            </ul>
            <div className="passive" dangerouslySetInnerHTML={{ __html: passive }}></div>
        </div>
        */
        <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
    )
}