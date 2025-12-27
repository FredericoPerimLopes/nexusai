# Nexus.ai Landing Page

Uma landing page minimalista e futurista para a comunidade Nexus.ai.

## Tecnologias
- HTML5
- CSS3 (Variáveis, Grid, Flexbox)
- JavaScript puro (Canvas API para animações)
- Vercel para deploy

## Como configurar o Mailchimp

Para ativar a integração real com o Mailchimp:

1. Vá para sua conta no Mailchimp.
2. Crie um formulário de inscrição (Embedded Form).
3. Localize o `action` do formulário. Ele será algo como: `https://seu-dominio.us1.list-manage.com/subscribe/post?u=xxxx&id=yyyy`.
4. No arquivo `index.html`, substitua o `action="#"` pelo seu URL do Mailchimp.
5. Para evitar o redirecionamento da página e usar as mensagens de sucesso/erro customizadas, o `script.js` já possui uma lógica baseada em AJAX/JSONP. Basta garantir que o URL termine em `post-json` em vez de `post`.

## Deploy no Vercel

Este projeto está pronto para ser implantado no Vercel. Basta conectar seu repositório ou usar a CLI:

```bash
vercel
```
