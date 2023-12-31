//vite-env.d.ts

/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DEPLOY_SERVER_URL: string;
    readonly VITE_LOCAL_SERVER_URL: string;
    readonly VITE_OAuth_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}