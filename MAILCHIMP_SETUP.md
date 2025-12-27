# Configuração do Mailchimp - Guia Completo

Este guia explica como conectar o formulário de inscrição da landing page ao Mailchimp.

## 📋 Pré-requisitos

1. Conta no Mailchimp (gratuita até 500 contatos): https://mailchimp.com
2. Acesso ao painel de administração do Mailchimp

## 🔧 Passo a passo detalhado

### 1. Criar uma Audience (Lista de E-mails)

Se você ainda não tem uma audience:

1. Faça login no Mailchimp
2. Clique em **Audience** no menu principal
3. Clique em **Create Audience**
4. Preencha as informações básicas:
   - **Audience name**: "Nexus.ai Newsletter" (ou o nome que preferir)
   - **Default from email**: seu e-mail
   - **Default from name**: "Nexus.ai"
5. Clique em **Save**

### 2. Acessar o Formulário Embarcado

1. No painel do Mailchimp, vá em **Audience** → **All contacts**
2. Clique em **Manage Audience** (dropdown) → **Signup forms**
3. Selecione **Embedded forms**

### 3. Encontrar a URL do Formulário

Na página de formulários embarcados, você verá um código HTML. Procure por uma linha similar a esta:

```html
<form action="https://SEUDOMAIN.us6.list-manage.com/subscribe/post?u=abc123def456&amp;id=xyz789" method="post">
```

**Copie a URL completa** do atributo `action`, que tem este formato:
```
https://SEUDOMAIN.usX.list-manage.com/subscribe/post?u=XXXXX&id=YYYYY
```

Onde:
- `SEUDOMAIN` é seu domínio no Mailchimp
- `usX` é o data center (us1, us6, etc.)
- `u=XXXXX` é seu ID de usuário
- `id=YYYYY` é o ID da sua audience

### 4. Configurar no Projeto

Abra o arquivo `index.html` e procure por esta linha (por volta da linha 149):

```html
data-mailchimp-url="https://SEU_DC.list-manage.com/subscribe/post-json?u=SEU_U&id=SEU_ID"
```

Substitua pela URL que você copiou. **Importante**: você pode colar a URL com `/post?` - o script automaticamente converterá para `/post-json?`.

#### Exemplo antes:
```html
<form
  id="mc-embedded-subscribe-form"
  class="subscription-form"
  novalidate
  data-mailchimp-url="https://SEU_DC.list-manage.com/subscribe/post-json?u=SEU_U&id=SEU_ID"
>
```

#### Exemplo depois:
```html
<form
  id="mc-embedded-subscribe-form"
  class="subscription-form"
  novalidate
  data-mailchimp-url="https://exemplo.us6.list-manage.com/subscribe/post?u=abc123def456&id=xyz789"
>
```

### 5. Testar a Integração

1. Faça o deploy da landing page ou teste localmente
2. Preencha o formulário com um e-mail de teste
3. Verifique se recebe a confirmação na tela
4. Acesse o painel do Mailchimp → Audience → All contacts
5. Verifique se o e-mail aparece na lista (pode levar alguns segundos)

## 🎨 Personalização do E-mail de Confirmação

O Mailchimp envia e-mails de confirmação por padrão (double opt-in). Para personalizar:

1. Vá em **Audience** → **Signup forms** → **Form builder**
2. Configure os textos de confirmação
3. Personalize o design do e-mail de boas-vindas

## 🐛 Problemas Comuns

### Erro: "Configuração pendente"

**Causa**: A URL do Mailchimp ainda não foi configurada no HTML.

**Solução**: Verifique se você substituiu a URL placeholder pela URL real do Mailchimp.

### Erro: "Tempo esgotado ao conectar com o Mailchimp"

**Causa**: Problemas de conectividade ou URL incorreta.

**Soluções**:
1. Verifique se a URL está correta
2. Teste sua conexão de internet
3. Verifique se o Mailchimp não está em manutenção

### Mensagem: "Este e-mail já está inscrito"

**Causa**: O e-mail já foi adicionado à lista anteriormente.

**Solução**: Isso é esperado! O Mailchimp impede inscrições duplicadas automaticamente.

### CORS / Cross-Origin Error

**Causa**: Tentativa de usar `POST` comum ao invés de JSONP.

**Solução**: O script já está configurado para usar JSONP (via `post-json`), que não tem problemas de CORS. Não é necessário fazer nada.

## 🔒 Segurança

- A URL do Mailchimp pode ser pública - ela não expõe dados sensíveis
- O Mailchimp valida todas as inscrições do lado servidor
- O double opt-in (confirmação por e-mail) previne spam

## 📊 Monitoramento

Para ver estatísticas de inscrições:

1. Acesse **Audience** → **Manage Audience** → **Settings**
2. Veja **Signup forms** → **Form settings**
3. Acompanhe relatórios em **Reports** no menu principal

## 🌐 Conformidade GDPR/LGPD

O Mailchimp é compliant com GDPR e LGPD. Para adicionar consentimentos:

1. Vá em **Audience** → **Signup forms** → **Form builder**
2. Adicione campos de consentimento conforme necessário
3. Configure em **Settings** → **Audience fields and *|MERGE|* tags**

## 📞 Suporte

- Documentação oficial do Mailchimp: https://mailchimp.com/help/
- Suporte: https://mailchimp.com/contact/

---

**Pronto!** Sua integração com Mailchimp está configurada. 🎉
