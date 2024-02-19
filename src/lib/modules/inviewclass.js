import { useEffect } from "react";

export function useInViewClass() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(...entry.target.getAttribute("inviewclass") ? entry.target.getAttribute("inviewclass").split(" ") : [])
                }else{
                    entry.target.classList.remove(...entry.target.getAttribute("inviewclass") ? entry.target.getAttribute("inviewclass").split(" ") : [])

                }
            });
        });
        Array.from(document.querySelectorAll('*[inviewclass]')).map((element)=>{
            observer.observe(element);
        });
        return () => {
                Array.from(document.querySelectorAll('*[inviewclass]')).map((element) => {
                    observer.unobserve(element);
                });
        };
    }, []);
    return null;
}
