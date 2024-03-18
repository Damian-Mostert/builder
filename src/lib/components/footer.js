

export function Footer({ variant="default" ,links,medialinks}) {
    return <footer className={`footer footer-${variant}`}>
        <div className="footer-body">
            <div className="footer-links">
            {links.map((data,index)=>{
                return <div className="footer-link" key={index}>
                    {data.label}
                </div>
            })}
            </div>
            <div className="footer-logos">
                <img className="footer-app-logo" src="/TelJoy_Logo.svg"/> 
            </div>
        </div>
    </footer>
}