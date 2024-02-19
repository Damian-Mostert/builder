import Components from "@components";


export function BuildBody(body, config) {
    if (Array.isArray(body)) {
        return <>
            {body.map((item, index) => {
                return <div key={index} className="inherit">
                    <BuildBody {...item} />
                </div>
            })}
        </>;
    }
    return <>
        {Object.keys(body).map((Component, index) => {
            const COMPONENT = Components[Component];
            let style = body[Component].style;
            const styleArray = (style ? style.split(";").map((item) => {
                return item.split(":");
            }) : []);
            let styles = {

            };
            styleArray.forEach(item => {
                styles[item[0].split("-").map((item, index) => {
                    if (index) {
                        return item.charAt(0).toUpperCase() + item.slice(1);
                    }
                    return item;
                }).join("")] = item[1]
            });
            console.log(styles)
            return <div key={index} className="inherit">
                <COMPONENT  {...body[Component]} style={styles} />
            </div>
        })
        }
    </>
}