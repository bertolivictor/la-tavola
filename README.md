# Pizzaria La Tavola

Site de portfólio — pizzaria napolitana fictícia. React + Vite, tema escuro, multi-página (Home · Cardápio · Sobre · Contato). Projeto demonstrativo, sem endereço ou pedidos reais.

## Rodar localmente
```bash
npm install
npm run dev
```
Abra o endereço que aparecer (geralmente http://localhost:5173).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e suba este projeto.
2. Em `vite.config.js`, ajuste o `base` para o nome **exato** do repositório:
   ```js
   base: '/nome-do-repo/',
   ```
3. Publique:
   ```bash
   npm run deploy
   ```
4. No GitHub: **Settings → Pages → Source: Deploy from a branch → branch `gh-pages` (/root)**.

Em ~1 min o site fica em `https://SEU-USUARIO.github.io/nome-do-repo/`.

> ⚠️ Se o `base` não bater com o nome do repositório, a página abre em branco — é o erro mais comum.

## Estrutura
- `src/App.jsx` — o site inteiro (componente React).
- `src/assets/` — fotos das pizzas e logo (webp otimizado).
- `src/index.css` — reset de estilos.
