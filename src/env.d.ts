/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL the lead + playbook forms POST JSON to (AWS Lambda → GoHighLevel). */
  readonly PUBLIC_LEAD_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
