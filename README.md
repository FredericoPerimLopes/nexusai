# Nexus.ai - Landing Page

Landing page minimalista e futurística para a comunidade **Nexus.ai**, focada em tendências de Inteligência Artificial.

## ✨ Características

- **Totalmente responsivo**: Mobile-first, otimizado para todos os dispositivos
- **Performance máxima**: HTML/CSS/JS puro, sem dependências externas
- **Design futurista**: Animações CSS, gradientes cyan/violeta, efeitos SVG
- **Integração Mailchimp**: Newsletter via JSONP (sem CORS)
- **Deploy instantâneo**: Pronto para Vercel, Netlify ou GitHub Pages
- **Acessível**: WCAG AA, suporte a leitores de tela e `prefers-reduced-motion`

## 📦 Estrutura

```
nexus-landing/
├── index.html          # Estrutura HTML semântica
├── styles.css          # Estilos e animações CSS
├── script.js           # Lógica JS + integração Mailchimp
├── assets/
│   └── favicon.svg     # Ícone animado do site
├── vercel.json         # Configuração Vercel (cache, headers)
├── .gitignore          # Exclusões do Git
└── README.md           # Este arquivo
```

## 🔧 Configuração do Mailchimp

### Passo a passo:

1. **Crie uma conta no Mailchimp** (gratuita até 500 contatos): https://mailchimp.com
2. **Crie uma Audience** (lista de e-mails) se ainda não tiver
3. **Acesse o formulário embarcado**:
   - Vá em: `Audience` → `Signup forms` → `Embedded forms`
4. **Localize o atributo `action` do formulário**:
   - No código HTML gerado, procure por algo assim:
   ```html
   <form action="https://SEUDOMAIN.us1.list-manage.com/subscribe/post?u=XXXXX&id=YYYYY">
   ```
5. **Copie a URL completa** (a partir de `https://` até o `id=YYYYY`)

6. **Edite o arquivo `index.html`**:
   - Encontre a linha (~149):
   ```html
   data-mailchimp-url="https://SEU_DC.list-manage.com/subscribe/post-json?u=SEU_U&id=SEU_ID"
   ```
   - Substitua pela URL que você copiou (o script irá converter automaticamente `post` → `post-json`)

### Exemplo final:

```html
<form
  id="mc-embedded-subscribe-form"
  class="subscription-form"
  novalidate
  data-mailchimp-url="https://exemplo.us6.list-manage.com/subscribe/post?u=abc123def456&id=xyz789"
>
```

**Pronto!** O formulário já funcionará.

## 🚀 Deploy

### Vercel (recomendado)

#### Via CLI:

```bash
npm install -g vercel
vercel login
vercel
```

#### Via GitHub:

1. Faça push do código para um repo no GitHub
2. Acesse https://vercel.com/new
3. Importe o repositório
4. Clique em **Deploy** (configuração automática)

### Netlify

1. Arraste a pasta do projeto para https://app.netlify.com/drop
2. Ou conecte via GitHub/GitLab

### GitHub Pages

```bash
# Configure o repo para publicar a branch main na pasta raiz
# Settings → Pages → Source: Deploy from a branch → main / (root)
```

## 🖥️ Desenvolvimento local

Qualquer servidor HTTP estático funciona:

### Python 3:

```bash
python -m http.server 8000
```

### Node.js (npx):

```bash
npx serve .
```

### VS Code:

Instale a extensão **Live Server** e clique com o botão direito em `index.html` → `Open with Live Server`.

Acesse: **http://localhost:8000**

## 🎨 Customização

### Cores (CSS variables em `styles.css`):

```css
:root {
  --cyan: #00d4ff;
  --violet: #7b2ff7;
  --bg: #050712;
  --text: rgba(255, 255, 255, 0.9);
}
```

### Conteúdo:

Edite diretamente o `index.html`:
- **Hero**: Linha ~69 (título e subtítulo)
- **Cards**: Linhas ~94–125 (ícones, títulos, descrições)
- **CTA**: Linha ~139 (call-to-action)

## 📱 Responsividade

Breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px – 900px
- **Desktop**: > 900px

## ♿ Acessibilidade

- ✅ HTML semântico (`<main>`, `<section>`, `<footer>`)
- ✅ Skip link para navegação por teclado
- ✅ Labels ocultos visualmente mas presentes para screen readers
- ✅ `aria-live` para feedback de formulários
- ✅ `prefers-reduced-motion` desabilita animações se solicitado
- ✅ Contraste WCAG AA

## 🔒 Privacidade

- Nenhum dado é enviado sem consentimento explícito do usuário
- Mailchimp é GDPR-compliant
- Não há cookies ou trackers de terceiros

## 📄 Licença

Este projeto é parte da comunidade **Nexus.ai**.

---

Feito com 💙 para a comunidade de IA
