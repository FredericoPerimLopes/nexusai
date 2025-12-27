# Nexus.ai Landing Page

Uma landing page minimalista e futurista para a comunidade Nexus.ai.

## Tecnologias
- HTML5
- CSS3 (Variáveis, Flexbox, Grid, Animações)
- Vanilla JavaScript
- Vercel para hospedagem

## Como configurar o Mailchimp

Para que o formulário de inscrição funcione, siga estes passos:

1. Faça login na sua conta do Mailchimp.
2. Vá em **Audience** > **Signup forms**.
3. Escolha **Embedded forms**.
4. Copie o URL do `action` do formulário gerado.
5. No arquivo `index.html`, substitua o valor do atributo `action` na tag `<form>` pelo URL que você copiou.
6. Localize o campo `input` escondido (bot protection) e substitua o atributo `name` (que começa com `b_`) pelo valor correspondente no código fornecido pelo Mailchimp.

## Deploy no Vercel

Este projeto está pronto para ser implantado no Vercel.

1. Instale a CLI do Vercel ou conecte seu repositório GitHub ao Vercel dashboard.
2. Execute `vercel` na raiz do projeto.

---
Criado para a comunidade Nexus.ai
