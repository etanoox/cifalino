import { useEffect, type RefObject } from 'react';

// The body-level portal is outside #root; inert prevents interaction with the page.
export function useModal(ref: RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.getElementById('root');
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    document.body.classList.add('modal-open');
    if (root) root.inert = true;
    const focusable = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]') ?? []).filter(element => element.getClientRects().length > 0);
    (focusable()[0] ?? ref.current)?.focus({ preventScroll: true });
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const elements = focusable(); const first = elements[0]; const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); ref.current?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === ref.current)) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (root) root.inert = false;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.body.classList.remove('modal-open');
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [ref, close]);
}
