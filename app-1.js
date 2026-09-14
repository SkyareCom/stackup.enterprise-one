
    (function() {
      var home = document.getElementById('home-screen');
      var moduleScreen = document.getElementById('module-screen');
      var moduleTitle = document.getElementById('module-title');

      window.openModule = function(title) {
        if (!home || !moduleScreen || !moduleTitle) return;

        window.__currentModuleKey = title;
        moduleTitle.textContent = window.i18n ? window.i18n.moduleTitle(title) : title;

        /* Conteúdo específico da segunda camada.
           Sempre limpa os 6 cards antes de configurar o módulo aberto. */
        var secondCards = moduleScreen.querySelectorAll('.module-grid .home-card');

        function setCardSector(card, ariaLabel, labelHtml, iconSvg) {
          if (!card) return;

          card.setAttribute('aria-label', ariaLabel || '');

          var iconWrap = card.querySelector('.icon-wrap');
          if (iconWrap) {
            iconWrap.innerHTML = iconSvg || '';
          }

          var label = card.querySelector('.card-label');
          if (label) {
            label.innerHTML = labelHtml || '&nbsp;';
            if (labelHtml) {
              label.classList.remove('blank-label');
              label.setAttribute('aria-hidden', 'false');
            } else {
              label.classList.add('blank-label');
              label.setAttribute('aria-hidden', 'true');
            }
          }
        }

        secondCards.forEach(function(card) {
          setCardSector(card, '', '', '');
        });

        /* CONFIGURAÇÕES BÁSICAS — CARD 1
           Regra adotada: sempre que um card receber nome,
           ele também recebe um ícone do setor dentro do círculo,
           seguindo o padrão do app e evitando repetição quando possível. */
        if (title === 'CONFIGURAÇÕES BÁSICAS' && secondCards[0]) {
          var idiomaIcon =
            '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path d="M4 6.5h8"/>' +
              '<path d="M8 4v2.5c0 3-1.6 5.5-4 7"/>' +
              '<path d="M5.5 10.5c1.2 1.6 3 3 5 4"/>' +
              '<path d="M14 8h6"/>' +
              '<path d="M17 5v3"/>' +
              '<path d="M14.5 17.5 17 11l2.5 6.5"/>' +
              '<path d="M15.3 15.4h3.4"/>' +
            '</svg>';

          setCardSector(
            secondCards[0],
            window.i18n ? window.i18n.t('language.primary') : 'IDIOMA PRINCIPAL',
            window.i18n ? window.i18n.cardHtml('language.primary') : 'IDIOMA<br>PRINCIPAL',
            idiomaIcon
          );

          var transactionIcon =
            '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path d="M5 4.5h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z"/>' +
              '<path d="M7 8h6"/>' +
              '<path d="M7 12h4"/>' +
              '<path d="M15.5 11.5 19 15l-3.5 3.5"/>' +
              '<path d="M18.5 15H12"/>' +
            '</svg>';

          var blindsIcon =
            '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
              '<circle cx="12" cy="12" r="7"/>' +
              '<path d="M12 8v4l3 2"/>' +
              '<path d="M5 5 3.5 3.5"/>' +
              '<path d="M19 5l1.5-1.5"/>' +
              '<path d="M8 19.5h8"/>' +
            '</svg>';

          var payoutIcon =
            '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
              '<path d="M6 18h12"/>' +
              '<path d="M8 18v-5h3v5"/>' +
              '<path d="M13 18V9h3v9"/>' +
              '<path d="M10.5 6.5 12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8Z"/>' +
            '</svg>';

          setCardSector(
            secondCards[1],
            window.i18n ? window.i18n.t('settings.transactionValues') : 'VALORES DE TRANSAÇÕES',
            window.i18n ? window.i18n.cardHtml('settings.transactionValues') : 'VALORES DE<br>TRANSAÇÕES',
            transactionIcon
          );

          setCardSector(
            secondCards[2],
            window.i18n ? window.i18n.t('settings.blindStructure') : 'ESTRUTURA DE BLINDS',
            window.i18n ? window.i18n.cardHtml('settings.blindStructure') : 'ESTRUTURA DE<br>BLINDS',
            blindsIcon
          );

          setCardSector(
            secondCards[3],
            window.i18n ? window.i18n.t('settings.payoutStructure') : 'ESTRUTURA DE PREMIAÇÕES',
            window.i18n ? window.i18n.cardHtml('settings.payoutStructure') : 'ESTRUTURA DE<br>PREMIAÇÕES',
            payoutIcon
          );
        }

        home.style.display = 'none';
        moduleScreen.style.display = 'block';
        moduleScreen.setAttribute('aria-hidden', 'false');
        window.scrollTo(0, 0);
      };

      window.showHome = function() {
        if (!home || !moduleScreen) return;
        moduleScreen.style.display = 'none';
        moduleScreen.setAttribute('aria-hidden', 'true');
        home.style.display = 'block';
        window.scrollTo(0, 0);
      };
    })();
  