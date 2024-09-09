const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js', // Chemin vers votre fichier d'entrée
    output: {
        path: path.resolve(__dirname, 'dist'), // Dossier de sortie
        filename: 'bundle.js', // Nom du fichier de sortie
        clean: true, // Nettoyer le dossier de sortie avant chaque build
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
        new HtmlWebpackPlugin({
            template: './public/index.html', // Chemin vers votre template HTML
            filename: 'index.html', // Nom du fichier de sortie
        }),
        new Dotenv({
            path: './environment.env', // Spécifiez le chemin de votre fichier .env
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all', // Activer le code splitting pour tous les chunks
        },
        runtimeChunk: 'single', // Créer un chunk runtime séparé
    },
    stats: {
        children: true, // Activer les détails des compilations enfants
    },
    mode: 'production', // Changez le mode à production pour le déploiement
};