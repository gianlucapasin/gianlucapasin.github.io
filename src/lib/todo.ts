// Escapes text and highlights "[DA COMPLETARE…]" placeholders so they are easy to spot.
export function mark(s = ''): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\[DA COMPLETARE[^\]]*\]/g, (m) => `<span class="todo">${m}</span>`);
}

export const isTodo = (s?: string) => !s || s.includes('[DA COMPLETARE');
