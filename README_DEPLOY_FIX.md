# Deploy na Vercel — Fix Exit 126

Este pacote inclui:
- `package.json` com scripts `build` e `vercel-build` = `vite build`
- `engines.node = 20.x`
- `vercel.json` para static-build
- `.gitignore` (sem `node_modules` no repo)

## Passos para atualizar o repositório

1) Substitua os arquivos do seu repo por este pacote.
2) Garanta que o repo **não** tem `node_modules`, `dist`, `.vercel` commitados:
   ```bash
   git rm -r --cached node_modules dist .vercel 2>NUL || true
   ```
3) Commit e push:
   ```bash
   git add .
   git commit -m "fix: vercel build (scripts e node 20)"
   git push
   ```
4) Na Vercel:
   - Settings → General → **Node.js Version** = **20.x**
   - Build & Output:
     - **Build Command**: `npm run build` (ou `npm run vercel-build`)
     - **Output Directory**: `dist`
   - Deployments → **Redeploy** → marque **Clear build cache**.

Se ainda falhar, verifique os logs de build (procure por `vite` não encontrado ou erro de permissões).

## Nota
Este pacote usa `node ./node_modules/vite/bin/vite.js build` para evitar o erro de permissão no `/node_modules/.bin/vite`.
