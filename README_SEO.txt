Como instalar o pacote de SEO (Vite/Hostinger/Vercel)

1) Copie a pasta 'public' deste pacote para a pasta 'public' do seu projeto.
   - Isso adiciona:
     public/robots.txt
     public/sitemap.xml
     public/site.webmanifest
     public/icons/icon-32.png
     public/icons/icon-192.png
     public/icons/icon-512.png
     public/icons/apple-touch-icon.png
     public/favicon.ico

2) Abra o arquivo 'index.html' do seu projeto e cole o conteúdo de 'index.head.snippet.html'
   dentro da tag <head> ... </head>. Não remova outras tags que você já tenha.

3) Onde trocar os PNGs do ícone
   - Substitua os arquivos dentro de public/icons/ por versões suas:
       public/icons/icon-32.png
       public/icons/icon-192.png
       public/icons/icon-512.png
       public/icons/apple-touch-icon.png
     (Mantenha os MESMOS nomes e tamanhos para evitar ajustes na configuração.)
   - Se preferir, também substitua public/favicon.ico (geralmente 32x32).

4) Se hospedar na Hostinger (public_html):
   - Envie 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'favicon.ico' e a pasta 'icons'
     para a raiz pública (public_html).
   - Atualize o <head> do 'index.html' que está em public_html para incluir o snippet.

5) Search Console:
   - Vá no Google Search Console, adicione a propriedade do domínio e envie o sitemap:
     https://www.jrmindustriais.com.br/sitemap.xml

6) Build/Deploy:
   - Local: npm run build → publica a pasta 'dist' (Vercel/Hostinger).
   - Vercel: só fazer git push. Hostinger: suba os arquivos para public_html.

Dica: após trocar os PNGs, limpe o cache do navegador (Ctrl+F5) para ver os ícones novos.
