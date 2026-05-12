/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY: string; // KEYL에서 L을 빼신 건가요? 변수명도 확인해 보세요!
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}