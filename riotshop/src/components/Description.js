const convertDescription = description => {

    description = description.replaceAll('(0s)', '')
    description = description.replaceAll('<li>', '')

    description = description.replace(/<br><(?!br\s*\/?)([a-zA-Z]+)>/g, function (match, p1) {
        if (p1 === "mainText" || p1 === "stats") {
            return "<div class='" + p1 + "'>";
        } if (p1 === "passive") {
            return "<h3 class='" + p1 + "'>";
        } if (p1 === "attention") {
            return `<br><${p1}>`;
        } else {
            return "<span class='" + p1 + "'>";
        }
    })

    description = description.replace(/<(?!br\s*\/?)([a-zA-Z]+)>/g, function (match, p1) {
        if (p1 === "mainText" || p1 === "stats") {
            return "<div class='" + p1 + "'>";
        } if (p1 === "passive") {
            return "<span class='" + p1 + "'>";
        } else {
            return "<span class='" + p1 + "'>";
        }
    })

    description = description.replace('<br><br>', '')

    return description.replace(/<\/([^>]+)>/g, function (match, p1) {
        if (p1 === "mainText" || p1 === "stats") {
            return "</div>";
        } else if (p1 === "passive") {
            return "</h3>";
        } else {
            return "</span>";
        }
    });
}

export default function Description({ description }) {
    console.log(description)
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