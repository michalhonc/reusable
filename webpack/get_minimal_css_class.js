const incstr = require('incstr');

// Abeceda ze ktere se generuje string
const alphabet = 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ';

// Inkrementalne generuj unikatni string
const createUniqueStrGenerator = () => {
    const uniqIds = {};
    const generateNextId = incstr.idGenerator({ alphabet });
    return (name) => {
        if (!uniqIds[name]) {
            uniqIds[name] = generateNextId();
        }
        return uniqIds[name];
    };
};

// Vytvorime dve instance generovanych stringu nezavislych na sobe
const localNameClassGenerator = createUniqueStrGenerator();
const componentNameClassGenerator = createUniqueStrGenerator();

// Pro kazde zavolani vytvorime novy string a novy className
module.exports = (localName, resourcePath) => {
    /*
     * Bereme nazev adresare nad less souborem
     * /home/user/szn/renderer/src/components/results/Horoscope/horoscope.less => Horoscope
     */
    const componentName = resourcePath.split('/').slice(-2, -1)[0];
    const localClass = localNameClassGenerator(localName);
    const componentClass = componentNameClassGenerator(componentName);
    return `${componentClass}_${localClass}`;
};

/**
 {
   test: /\.less$/,
   include: path.resolve('./src/components'),
   exclude: path.resolve('./src/less'),
   use: [
                        'isomorphic-style-loader',
                        {
                            ...cssLoaderConfig,
                            options: {
                                modules: true,
                                importLoaders: 2,
                                // localIdentName: isProduction ? '[sha512:hash:base64:4]' : '[local]-[hash:10],
                                ...(isProduction && {
                                    getLocalIdent: (context, localIdentName, localName) => {
                                        return getUniqueClassName(localName, context.resourcePath);
                                    },
                                }),
                                ...(!isProduction && {
                                    localIdentName: '[local]',
                                }),
                            },
                        },
                        postCssLoaderConfig,
                        {
                            ...lessLoaderConfig,
                            options: {
                                ...lessLoaderConfig.options,
                                modules: true,
                            },
                        },
                    ],
                },
 */
