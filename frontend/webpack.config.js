const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', // Chemin vers votre fichier d'entrée
    output: {
        path: path.resolve(__dirname, 'dist'), // Dossier de sortie
        filename: 'bundle.js', // Nom du fichier de sortie
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Pour tous les fichiers JavaScript
                exclude: /node_modules/, // Exclure le dossier node_modules
                use: {
                    loader: 'babel-loader', // Utiliser Babel pour transpiler le JavaScript
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Préréglages pour ES6 et React
                    },
                },
            },
            {
                test: /\.css$/, // Pour tous les fichiers CSS
                use: ['style-loader', 'css-loader'], // Utiliser ces loaders
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Extensions à résoudre
        fallback: {
            "path": require.resolve("path-browserify"), // Polyfill pour 'path'
            "fs": false, // Désactiver 'fs' si non nécessaire
            "os": false, // Désactiver 'os' si non nécessaire
            "crypto": require.resolve("crypto-browserify"), // Polyfill pour 'crypto'
        },
    },
    plugins: [
        new Dotenv({
            path: './environment.env', // Spécifiez le chemin de votre fichier .env
        }) // Ajout de dotenv-webpack
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Dossier à servir
        },
        compress: true,
        port: 9000, // Port du serveur de développement
        open: true, // Ouvrir le navigateur automatiquement
    },
    mode: 'development', // Mode de développement
};