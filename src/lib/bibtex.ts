// Minimal BibTeX parser: enough for a curated personal publications.bib.
import fs from 'node:fs';

export interface Publication {
  key: string;
  type: string;
  title: string;
  authors: { name: string; me: boolean }[];
  year: number;
  venue: string;
  details: string;
  links: { label: string; url: string }[];
  url?: string;
  note?: string;
}

const ME = 'Pasin';

function readValue(src: string, i: number): [string, number] {
  if (src[i] === '{') {
    let depth = 0, start = i + 1;
    for (; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}' && --depth === 0) return [src.slice(start, i), i + 1];
    }
  }
  if (src[i] === '"') {
    const end = src.indexOf('"', i + 1);
    return [src.slice(i + 1, end), end + 1];
  }
  const m = /^[^,}\s]+/.exec(src.slice(i));
  return [m ? m[0] : '', i + (m ? m[0].length : 0)];
}

function clean(s: string) {
  return s.replace(/[{}]/g, '').replace(/\\&/g, '&').replace(/--/g, '–').replace(/\s+/g, ' ').trim();
}

function formatAuthor(raw: string) {
  const a = clean(raw);
  if (a === 'others') return { name: 'et al.', me: false };
  let last: string, first: string;
  if (a.includes(',')) [last, first] = a.split(',').map((s) => s.trim());
  else { const p = a.split(' '); last = p.pop()!; first = p.join(' '); }
  const initials = first.split(/[\s-]+/).filter(Boolean).map((n) => n[0] + '.').join(' ');
  return { name: initials ? `${last}, ${initials}` : last, me: last === ME };
}

export function parseBib(src: string): Publication[] {
  const out: Publication[] = [];
  const entryRe = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(src))) {
    const type = m[1].toLowerCase();
    if (type === 'comment' || type === 'string') continue;
    const f: Record<string, string> = {};
    let i = entryRe.lastIndex;
    while (i < src.length) {
      while (/[\s,]/.test(src[i])) i++;
      if (src[i] === '}') break;
      const nm = /^(\w+)\s*=\s*/.exec(src.slice(i));
      if (!nm) break;
      i += nm[0].length;
      const [v, next] = readValue(src, i);
      f[nm[1].toLowerCase()] = v;
      i = next;
    }
    entryRe.lastIndex = i;

    const venue = clean(f.journal || f.booktitle || f.publisher || f.institution || '');
    const vol = f.volume ? `${f.volume}${f.number ? `(${f.number})` : ''}` : '';
    const details = [vol, f.pages ? clean(f.pages) : ''].filter(Boolean).join(', ');
    const links: Publication['links'] = [];
    const url = f.doi ? `https://doi.org/${f.doi}` : f.url || undefined;
    if (f.pdf) links.push({ label: 'PDF', url: f.pdf });
    if (f.preprint) links.push({ label: 'Preprint', url: f.preprint });
    if (f.data) links.push({ label: 'Data', url: f.data });
    if (f.code) links.push({ label: 'Code', url: f.code });

    out.push({
      key: m[2], type, url,
      title: clean(f.title || ''),
      authors: (f.author || '').split(/\s+and\s+/).map(formatAuthor),
      year: Number(f.year) || 0,
      venue, details, links,
      note: f.note ? clean(f.note) : undefined,
    });
  }
  return out;
}

export function loadPublications(path = 'src/data/publications.bib') {
  return parseBib(fs.readFileSync(path, 'utf-8')).sort((a, b) => b.year - a.year);
}
