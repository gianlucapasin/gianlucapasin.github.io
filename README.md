# gianlucapasin.github.io

Sito accademico personale (Astro), pubblicato su GitHub Pages a ogni push su `main`.

## Dove si aggiorna cosa

| Contenuto | File |
|---|---|
| Bio, affiliazione, link | `src/data/profile.yaml` |
| News (home, ultime 5) | `src/data/news.yaml` |
| Temi di ricerca | `src/data/research.yaml` |
| Pubblicazioni | `src/data/publications.bib` (campi extra: `pdf`, `preprint`, `data`, `code`) |
| Work in progress | `src/data/wip.yaml` |
| Progetti | un file `.md` per progetto in `src/data/projects/` |
| Insegnamento | `src/data/teaching.yaml` |
| Foto | `src/assets/photo.jpg` |

I segnaposto `[DA COMPLETARE]` sono evidenziati in giallo sul sito finché non li sostituisci.

## Anteprima in locale

Serve [Node.js](https://nodejs.org) 20 o superiore.

⚠️ Non eseguire `npm install` dentro Google Drive: il filesystem virtuale corrompe `node_modules`.
Lavora su un clone del repository in una cartella locale (es. `C:\dev\gianlucapasin.github.io`).

```
npm install
npm run dev
```

## Prima pubblicazione

1. Crea il repository `gianlucapasin.github.io` su GitHub.
2. In *Settings → Pages → Source* scegli **GitHub Actions**.
3. Fai il push di questa cartella sul branch `main`.
