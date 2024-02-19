module.exports = {
    module: {
        resolve: {
            // ...
            fallback: {
                // 👇️👇️👇️ add this 👇️👇️👇️
                "fs": false,
                "os": false,
                "path": false,
            }
        },
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
};