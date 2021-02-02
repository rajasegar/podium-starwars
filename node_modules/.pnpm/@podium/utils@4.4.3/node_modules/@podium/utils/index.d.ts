import { IncomingMessage, ServerResponse } from 'http';

declare interface PodiumAsset {
    readonly value: string;
    prefix?: boolean;
    toHTML(): string;
}

export interface AssetCss extends PodiumAsset {
    as?: Pick<HTMLLinkElement, 'as'>;
    crossorigin?: Pick<HTMLLinkElement, 'crossOrigin'>;
    disabled?: Pick<HTMLLinkElement, 'disabled'>;
    hreflang?: Pick<HTMLLinkElement, 'hreflang'>;
    title?: Pick<HTMLLinkElement, 'title'>;
    media?: Pick<HTMLLinkElement, 'media'>;
    rel?: Pick<HTMLLinkElement, 'rel'>;
    type?: Pick<HTMLLinkElement, 'type'>;
}

export interface AssetJs extends PodiumAsset {
    referrerpolicy?: Pick<HTMLScriptElement, 'referrerPolicy'>;
    crossorigin?: Pick<HTMLScriptElement, 'crossOrigin'>;
    integrity?: Pick<HTMLScriptElement, 'integrity'>;
    nomodule?: Pick<HTMLScriptElement, 'noModule'>;
    async?: Pick<HTMLScriptElement, 'async'>;
    defer?: Pick<HTMLScriptElement, 'defer'>;
    type?: Pick<HTMLScriptElement, 'type'>;
    data?: DOMStringMap;
}

export class HttpIncoming<T = { [key: string]: unknown }> {
    constructor(request: IncomingMessage, response: ServerResponse, params: T);

    development: boolean;

    readonly response: ServerResponse;

    readonly request: IncomingMessage;

    context: any;

    readonly params: T;

    proxy: boolean;

    name: string;

    view: any;

    readonly url: URL;

    css: Array<AssetCss>;

    js: Array<AssetJs>;

    toJSON(): {
        development: boolean;
        context: any;
        params: T;
        proxy: boolean;
        name: string;
        url: URL;
        css: Array<AssetCss>;
        js: Array<AssetJs>;
    };
}
