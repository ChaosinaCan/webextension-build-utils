
// TODO: replace with https://github.com/DefinitelyTyped/DefinitelyTyped/pull/33554
declare module 'webpack-watched-glob-entries-plugin' {
    import { EntryFunc, Plugin } from 'webpack';

    // https://github.com/isaacs/node-glob#options
    export interface GlobOptions {
        cwd?: string;
        root?: string;
        dot?: boolean;
        nomount?: boolean;
        mark?: boolean;
        nosort?: boolean;
        stat?: boolean;
        silent?: boolean;
        strict?: boolean;
        cache?: any;
        statCache?: any;
        symlinks?: any;
        nounique?: boolean;
        nonull?: boolean;
        debug?: boolean;
        nobrace?: boolean;
        noglobstar?: boolean;
        noext?: boolean;
        nocase?: boolean;
        matchBase?: boolean;
        nodir?: boolean;
        ignore?: string;
        follow?: boolean;
        realpath?: boolean;
        absolute?: boolean;
    }

    export interface PluginOptions {
        basename_as_entry_name?: boolean;
    }

    export default class WebpackWatchedGlobEntries extends Plugin {
        static getEntries(globs: string[], globOptions?: GlobOptions, pluginOptions?: PluginOptions): EntryFunc;
        static getFiles(globString: string, globOptions?: GlobOptions, basename_as_entry_name?: boolean): Record<string, string>;
    }
}