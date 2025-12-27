document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  const form = document.getElementById('mc-embedded-subscribe-form');
  const emailInput = document.getElementById('email-input');
  const submitButton = document.getElementById('submit-button');
  const formMessage = document.getElementById('form-message');

  if (!form || !emailInput || !submitButton || !formMessage) return;

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const setLoading = isLoading => {
    submitButton.disabled = isLoading;
    submitButton.querySelector('.button-text').textContent = isLoading ? 'Enviando…' : 'Inscrever-se';
  };

  const showMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  };

  const cleanupCallback = (callbackName, scriptEl) => {
    try {
      delete window[callbackName];
    } catch {
      window[callbackName] = undefined;
    }

    if (scriptEl && scriptEl.parentNode) {
      scriptEl.parentNode.removeChild(scriptEl);
    }
  };

  const normalizeMailchimpUrl = rawUrl => {
    if (!rawUrl) return '';

    const url = rawUrl.trim();

    if (url.includes('subscribe/post?')) {
      return url.replace('subscribe/post?', 'subscribe/post-json?');
    }

    return url;
  };

  const mailchimpSubscribe = email => {
    const rawUrl = form.dataset.mailchimpUrl;
    const baseUrl = normalizeMailchimpUrl(rawUrl);

    if (!baseUrl || baseUrl.includes('SEU_DC') || baseUrl.includes('SEU_U') || baseUrl.includes('SEU_ID')) {
      return Promise.reject(
        new Error('Configuração pendente: defina data-mailchimp-url no formulário com a URL correta do Mailchimp.')
      );
    }

    return new Promise((resolve, reject) => {
      const callbackName = `mc_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const scriptEl = document.createElement('script');
      const separator = baseUrl.includes('?') ? '&' : '?';
      const url = `${baseUrl}${separator}c=${callbackName}&EMAIL=${encodeURIComponent(email)}`;

      const timeoutId = window.setTimeout(() => {
        cleanupCallback(callbackName, scriptEl);
        reject(new Error('Tempo esgotado ao conectar com o Mailchimp.'));
      }, 8000);

      const cleanMailchimpMessage = msg => {
        const withoutHtml = String(msg)
          .replace(/<[^>]*>/g, '')
          .replace(/&amp;/g, '&')
          .trim();

        const parts = withoutHtml.split(' - ');
        return (parts.length > 1 ? parts.slice(1).join(' - ') : withoutHtml).trim();
      };

      window[callbackName] = data => {
        window.clearTimeout(timeoutId);
        cleanupCallback(callbackName, scriptEl);

        if (data && data.result === 'success') {
          resolve(data);
          return;
        }

        const msg = data && typeof data.msg === 'string' ? cleanMailchimpMessage(data.msg) : 'Não foi possível concluir sua inscrição.';
        reject(new Error(msg));
      };

      scriptEl.src = url;
      scriptEl.async = true;
      scriptEl.onerror = () => {
        window.clearTimeout(timeoutId);
        cleanupCallback(callbackName, scriptEl);
        reject(new Error('Falha ao carregar a requisição para o Mailchimp.'));
      };

      document.body.appendChild(scriptEl);
    });
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showMessage('Por favor, insira seu e-mail.', 'error');
      emailInput.focus();
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Por favor, insira um e-mail válido.', 'error');
      emailInput.focus();
      return;
    }

    setLoading(true);
    showMessage('', '');

    try {
      await mailchimpSubscribe(email);
      showMessage('Inscrição confirmada. Verifique seu e-mail para concluir (se necessário).', 'success');
      emailInput.value = '';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado.';

      if (String(message).toLowerCase().includes('already subscribed')) {
        showMessage('Este e-mail já está inscrito.', 'success');
      } else {
        showMessage(message, 'error');
      }
    } finally {
      setLoading(false);
    }
  });

  const observerOptions = {
    threshold: 0.15,
  };

  const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      fadeInObserver.unobserve(entry.target);
    });
  }, observerOptions);

  document.querySelectorAll('.about-card').forEach(card => {
    fadeInObserver.observe(card);
  });
});
