"use client";

import * as tailwindConfig from 'tailwind.config';

import { useState, useEffect } from 'react';

export default function Device() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        md: false,
        lg: false,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {

                let lg, md;
                lg = md = false;

                let width = window.innerWidth;

                if (width >= Number(tailwindConfig.theme.extend.screens.lg.min.substring(0, tailwindConfig.theme.extend.screens.lg.min.length - 2))) {
                    lg = true
                }
                if (!lg) {
                    md = true
                }

                setWindowSize({
                    width,
                    height: window.innerHeight,
                    lg,
                    md,
                });
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    return windowSize;
}
