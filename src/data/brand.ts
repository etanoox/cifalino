/** Typed references to the exact CSS palette; edit base values in src/styles.css. */
export const brandTokens = {
  primary: 'var(--brand-primary)', secondary: 'var(--brand-secondary)', text: 'var(--brand-text)',
  accent: 'var(--brand-accent)', bellevuePrimary: 'var(--brand-bellevue-primary)',
  bellevueAccent: 'var(--brand-bellevue-accent)', bellevueDark: 'var(--brand-bellevue-dark)',
  bellevueShadow: 'var(--brand-bellevue-shadow)', bellevueMidtone: 'var(--brand-bellevue-midtone)',
  bellevueHighlight: 'var(--brand-bellevue-highlight)', light: 'var(--brand-light)',
} as const;
export type BrandToken = keyof typeof brandTokens;
