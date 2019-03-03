# WebExtension Build Utils

Webpack build utilities for [webextension-toolbox](https://github.com/webextension-toolbox/webextension-toolbox).

## Install

```shell
$ npm install -S @spadin/webextension-build-utils
```

## Usage

Create an extension using webextension-toolbox, then create a `webextension-toolbox-config.js` file. Use the following functions to configure Webpack:

```javascript
const {
    dedupeModules,
    fixZipPackage,
    useCss,
    useExternal,
    useSourceMap,
    useTypescript,
} = require('@spadin/webextension-build-utils');

module.exports = {
    webpack: (config, { dev }) => {
        // Set up source maps to work nicely with the Chrome debugger.
        useSourceMap(config, dev);

        // Build TypeScript files and allow them as entry points.
        useTypescript(config);

        // Bundle CSS files and any resources referenced by them.
        useCss(config, {
            optimizeImages: !dev,
        });

        // Don't bundle certain large modules to speed up build times and allow
        // the browser to cache them between builds.
        const mode = dev ? 'development' : 'production.min';

        useExternal(config, {
            module: 'react',
            global: 'React',
            from: `../node_modules/react/umd/react.${mode}.js`,
            to: 'scripts/react/react.js',
        });

        // Fix for duplicate modules in bundles when some of our dependencies
        // are installed via npm link.
        dedupeModules(config, [
            'webextension-polyfill',
            'webextension-polyfill-ts',
            '@spadin/webextension-storage',
        ]);

        // Workaround for issue in webextension-toolbox v3.0.0:
        // The ZipPlugin added by webextension-toolbox will get run before the
        // copy done in useExternal(), so the external libraries won't be
        // included in the output package unless we move ZipPlugin to the end of
        // the plugins list.
        fixZipPackage(config);

        return config;
    },
    copyIgnore: [
        '**/*.js',
        '**/*.json',
        '**/*.ts',
        '**/*.tsx',
    ]
};
```