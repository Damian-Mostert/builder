import Components from "@components";

export function BuildBody(body) {

    if (Array.isArray(body)) {
        return (
            <>
                {body.map((item, index) => {
                    return (
                        <div key={index} className="inherit">
                            <BuildBody {...item} />
                        </div>
                    );
                })}
            </>
        );
    }
    if (body) {
        const COMPONENT = Components[body.__component];
        return (
            <>
                <div className="inherit">
                    <COMPONENT {...body.__props} children={BuildBody(body.children)} />
                </div>
            </>
        );

    }
}
