export default function Description({ description }) {
    const parts = description.split(/\<stats\>|\<\/stats\>/)
    const stats = parts[1]
    console.log(description)
    const passive = parts[2].replace('</mainText>', '')
    return (
        <div>
            <ul className="ulStats">
                {stats.split('<br>').map(stat => {
                    return <li className="liStats" dangerouslySetInnerHTML={{ __html: stat }}></li>
                })}
            </ul>
            <div className="passive" dangerouslySetInnerHTML={{ __html: passive }}></div>
        </div>
    )
}