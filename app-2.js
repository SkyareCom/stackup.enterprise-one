
    (function() {
      var secondScreen = document.getElementById('module-screen');
      var thirdScreen = document.getElementById('third-layer-screen');
      var secondTitle = document.getElementById('module-title');
      var thirdTitle = document.getElementById('third-layer-title');

      window.__thirdLayerCardIndex = null;

      window.openThirdLayer = function(cardIndex, cardElement) {
        window.__thirdLayerCardIndex = cardIndex;

        if (cardElement) {
          cardElement.classList.add('nav-press');
        }

        if (secondScreen) {
          secondScreen.classList.add('layer-leave');
        }

        window.setTimeout(function() {
          var thirdGrid = thirdScreen ? thirdScreen.querySelector('.module-grid') : null;
          var languageNote = thirdScreen ? thirdScreen.querySelector('#language-note') : null;
          var currentModule = window.__currentModuleKey || (secondTitle ? secondTitle.textContent.trim() : '');

          function languageIconBR() {
            return '' +
              '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M4 5.5h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-4 3v-3.5a3 3 0 0 1-1-2.2Z"/>' +
                '<path d="M7 9h7"/>' +
                '<path d="M7 12h5"/>' +
                '<path d="M17.5 16.5c1.5-.4 2.5-1.3 2.5-2.5"/>' +
              '</svg>';
          }

          function languageIconUS() {
            return '' +
              '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M5 6h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-5l-4 3v-3.5A3 3 0 0 1 3 13V9a3 3 0 0 1 2-3Z"/>' +
                '<path d="M8 10h6"/>' +
                '<path d="M8 13h4"/>' +
                '<path d="M18.5 5.5 19 7l1.5.5-1.5.5-.5 1.5L18 8l-1.5-.5L18 7Z"/>' +
              '</svg>';
          }

          function languageIconES() {
            return '' +
              '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M4.5 6h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9.5l-4 3v-3.4A3 3 0 0 1 2.5 13V9a3 3 0 0 1 2-3Z"/>' +
                '<path d="M7.5 9.5h6"/>' +
                '<path d="M7.5 12.5h4.5"/>' +
                '<path d="M18.2 7.2h3"/>' +
                '<path d="M19.7 5.7v3"/>' +
                '<path d="M18.65 6.15 20.75 8.25"/>' +
              '</svg>';
          }

          function languageIconIT() {
            return '' +
              '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
                '<path d="M5 6.2h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-5l-4 3v-3.5A3 3 0 0 1 3 13.2v-4a3 3 0 0 1 2-3Z"/>' +
                '<path d="M8 10h6"/>' +
                '<path d="M8 13h5"/>' +
                '<path d="M18.4 6.1h2.8"/>' +
                '<path d="M19.8 6.1v4.1"/>' +
              '</svg>';
          }

          function makeThirdCard(labelHtml, ariaLabel, iconSvg, onClickCode) {
            var clickAttr = onClickCode ? ' onclick="' + onClickCode + '"' : '';
            return '' +
              '<button class="home-card" type="button" aria-label="' + ariaLabel + '"' + clickAttr + '>' +
                '<span class="icon-wrap" aria-hidden="true">' + iconSvg + '</span>' +
                '<span class="card-label">' + labelHtml + '</span>' +
              '</button>';
          }

          if (currentModule === 'CONFIGURAÇÕES BÁSICAS' && cardIndex === 1) {
            if (thirdTitle) {
              thirdTitle.textContent = window.i18n ? window.i18n.t('language.primary') : 'IDIOMA PRINCIPAL';
            }

            if (thirdGrid) {
              thirdGrid.innerHTML =
                makeThirdCard(
                  window.i18n ? window.i18n.cardHtml('language.ptBR') : 'PORTUGUÊS',
                  window.i18n ? window.i18n.t('language.ptBR') : 'PORTUGUÊS',
                  languageIconBR(),
                  "window.i18n.setLanguage('pt-BR')"
                ) +
                makeThirdCard(
                  window.i18n ? window.i18n.cardHtml('language.enUS') : 'INGLÊS',
                  window.i18n ? window.i18n.t('language.enUS') : 'INGLÊS',
                  languageIconUS(),
                  "window.i18n.setLanguage('en-US')"
                ) +
                makeThirdCard(
                  window.i18n ? window.i18n.cardHtml('language.esES') : 'ESPANHOL',
                  window.i18n ? window.i18n.t('language.esES') : 'ESPANHOL',
                  languageIconES(),
                  "window.i18n.setLanguage('es-ES')"
                ) +
                makeThirdCard(
                  window.i18n ? window.i18n.cardHtml('language.itIT') : 'ITALIANO',
                  window.i18n ? window.i18n.t('language.itIT') : 'ITALIANO',
                  languageIconIT(),
                  "window.i18n.setLanguage('it-IT')"
                );
            }

            if (languageNote) {
              languageNote.style.display = 'block';
            }
          } else {
            if (languageNote) {
              languageNote.style.display = 'none';
            }

            if (thirdTitle) {
              if (currentModule === 'CONFIGURAÇÕES BÁSICAS' && cardIndex === 2) {
                thirdTitle.textContent = window.i18n ? window.i18n.t('settings.transactionValues') : 'VALORES DE TRANSAÇÕES';
              } else if (currentModule === 'CONFIGURAÇÕES BÁSICAS' && cardIndex === 3) {
                thirdTitle.textContent = window.i18n ? window.i18n.t('settings.blindStructure') : 'ESTRUTURA DE BLINDS';
              } else if (currentModule === 'CONFIGURAÇÕES BÁSICAS' && cardIndex === 4) {
                thirdTitle.textContent = window.i18n ? window.i18n.t('settings.payoutStructure') : 'ESTRUTURA DE PREMIAÇÕES';
              } else if (secondTitle) {
                thirdTitle.textContent = window.i18n
                  ? window.i18n.moduleTitle(window.__currentModuleKey || secondTitle.textContent)
                  : secondTitle.textContent;
              }
            }

            if (thirdGrid) {
              thirdGrid.innerHTML = '';
              for (var i = 0; i < 6; i++) {
                thirdGrid.innerHTML +=
                  '<button class="home-card" type="button" aria-label="">' +
                    '<span class="icon-wrap" aria-hidden="true"></span>' +
                    '<span class="card-label blank-label" aria-hidden="true">&nbsp;</span>' +
                  '</button>';
              }
            }
          }

          if (cardElement) {
            cardElement.classList.remove('nav-press');
          }

          if (secondScreen) {
            secondScreen.classList.remove('layer-leave');
            secondScreen.style.display = 'none';
            secondScreen.setAttribute('aria-hidden', 'true');
          }

          if (thirdScreen) {
            thirdScreen.style.display = 'block';
            thirdScreen.setAttribute('aria-hidden', 'false');
            thirdScreen.classList.remove('layer-enter');
            void thirdScreen.offsetWidth;
            thirdScreen.classList.add('layer-enter');
          }

          window.scrollTo(0, 0);
        }, 120);
      };

      window.backToSecondLayer = function() {
        if (thirdScreen) {
          thirdScreen.style.display = 'none';
          thirdScreen.setAttribute('aria-hidden', 'true');
          thirdScreen.classList.remove('layer-enter');
        }

        if (secondScreen) {
          secondScreen.style.display = 'block';
          secondScreen.setAttribute('aria-hidden', 'false');
          secondScreen.classList.remove('layer-enter');
          void secondScreen.offsetWidth;
          secondScreen.classList.add('layer-enter');
        }

        if (window.i18n && typeof window.i18n.refresh === 'function') {
          window.i18n.refresh();
        }

        window.scrollTo(0, 0);
      };

      window.showHomeFromThird = function() {
        if (thirdScreen) {
          thirdScreen.style.display = 'none';
          thirdScreen.setAttribute('aria-hidden', 'true');
        }

        if (typeof window.showHome === 'function') {
          window.showHome();
        }

        window.scrollTo(0, 0);
      };
    })();
  