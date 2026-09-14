(function() {
  if (window.__stackupFourthLayerInstalled) return;
  window.__stackupFourthLayerInstalled = true;

  var i18n = window.i18n;
  var thirdScreen = document.getElementById('third-layer-screen');

  if (!i18n || !thirdScreen) return;

  var extra = {
    'pt-BR': {
      'settings.investmentValues': 'VALORES DE INVESTIMENTO',
      'settings.investmentValues.card': 'VALORES DE<br>INVESTIMENTO',
      'fourth.navigation': 'Navegação da quarta camada',
      'fourth.page': 'Página da quarta camada'
    },
    'en-US': {
      'settings.investmentValues': 'INVESTMENT VALUES',
      'settings.investmentValues.card': 'INVESTMENT<br>VALUES',
      'fourth.navigation': 'Fourth-level navigation',
      'fourth.page': 'Fourth-level page'
    },
    'es-ES': {
      'settings.investmentValues': 'VALORES DE INVERSIÓN',
      'settings.investmentValues.card': 'VALORES DE<br>INVERSIÓN',
      'fourth.navigation': 'Navegación de cuarto nivel',
      'fourth.page': 'Página de cuarto nivel'
    },
    'it-IT': {
      'settings.investmentValues': 'VALORI DI INVESTIMENTO',
      'settings.investmentValues.card': 'VALORI DI<br>INVESTIMENTO',
      'fourth.navigation': 'Navigazione di quarto livello',
      'fourth.page': 'Pagina di quarto livello'
    }
  };

  function lang() {
    return i18n.getLanguage ? i18n.getLanguage() : 'pt-BR';
  }

  function extraT(key) {
    var table = extra[lang()] || extra['pt-BR'];
    return table[key] || null;
  }

  var baseT = i18n.t.bind(i18n);
  var baseCardHtml = i18n.cardHtml.bind(i18n);
  var baseSetLanguage = i18n.setLanguage.bind(i18n);

  i18n.t = function(key) {
    return extraT(key) || baseT(key);
  };

  i18n.cardHtml = function(key) {
    if (key === 'settings.investmentValues') {
      return extraT('settings.investmentValues.card') || extraT(key) || key;
    }
    return baseCardHtml(key);
  };

  function makeInvestmentIcon() {
    return '' +
      '<svg role="img" viewBox="0 0 24 24" aria-hidden="true">' +
        '<rect x="4" y="6" width="16" height="11" rx="2"/>' +
        '<path d="M7 9.5h4"/>' +
        '<path d="M7 13.5h2"/>' +
        '<circle cx="15.5" cy="11.5" r="2.5"/>' +
        '<path d="M6 19h12"/>' +
      '</svg>';
  }

  function blankThirdCard() {
    var button = document.createElement('button');
    button.className = 'home-card';
    button.type = 'button';
    button.setAttribute('aria-label', '');

    var icon = document.createElement('span');
    icon.className = 'icon-wrap';
    icon.setAttribute('aria-hidden', 'true');

    var label = document.createElement('span');
    label.className = 'card-label blank-label';
    label.setAttribute('aria-hidden', 'true');
    label.innerHTML = '&nbsp;';

    button.appendChild(icon);
    button.appendChild(label);
    return button;
  }

  function populateInvestmentValuesCard() {
    if (window.__currentModuleKey !== 'CONFIGURAÇÕES BÁSICAS' ||
        window.__thirdLayerCardIndex !== 2) return;

    var grid = thirdScreen.querySelector('.module-grid');
    if (!grid) return;

    grid.innerHTML = '';

    var button = document.createElement('button');
    button.className = 'home-card';
    button.type = 'button';
    button.setAttribute('aria-label', i18n.t('settings.investmentValues'));
    button.setAttribute('data-fourth-key', 'settings.investmentValues');

    var icon = document.createElement('span');
    icon.className = 'icon-wrap';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = makeInvestmentIcon();

    var label = document.createElement('span');
    label.className = 'card-label';
    label.innerHTML = i18n.cardHtml('settings.investmentValues');

    button.appendChild(icon);
    button.appendChild(label);
    button.addEventListener('click', function() {
      window.openFourthLayer('settings.investmentValues', button);
    });

    grid.appendChild(button);

    for (var i = 0; i < 5; i++) {
      grid.appendChild(blankThirdCard());
    }
  }

  var style = document.createElement('style');
  style.textContent =
    '#fourth-layer-screen{' +
      'display:none;width:min(100%,480px);min-height:100svh;margin:0 auto;' +
      'padding:calc(12px + env(safe-area-inset-top)) 14px calc(28px + env(safe-area-inset-bottom));' +
      'position:relative;isolation:isolate;' +
    '}' +
    '.fourth-layer-content{min-height:48vh;margin-top:28px;}' +
    '#fourth-layer-screen.layer-enter{animation:layerIn .18s ease both;}' +
    '#fourth-layer-screen.layer-leave{animation:layerOut .13s ease both;}' +
    '@media (prefers-reduced-motion:reduce){' +
      '#fourth-layer-screen.layer-enter,#fourth-layer-screen.layer-leave{animation-duration:.01ms !important;}' +
    '}';
  document.head.appendChild(style);

  var fourthScreen = document.getElementById('fourth-layer-screen');

  if (!fourthScreen) {
    fourthScreen = document.createElement('main');
    fourthScreen.id = 'fourth-layer-screen';
    fourthScreen.setAttribute('aria-hidden', 'true');

    var header = thirdScreen.querySelector('.module-header');
    if (header) fourthScreen.appendChild(header.cloneNode(true));

    var nav = document.createElement('nav');
    nav.className = 'module-nav';

    var backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.setAttribute('data-i18n', 'nav.previous');
    backButton.textContent = i18n.t('nav.previous');
    backButton.addEventListener('click', function() {
      window.backToThirdLayer();
    });

    var mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.setAttribute('data-i18n', 'nav.main');
    mainButton.textContent = i18n.t('nav.main');
    mainButton.addEventListener('click', function() {
      window.showHomeFromFourth();
    });

    nav.appendChild(backButton);
    nav.appendChild(mainButton);
    fourthScreen.appendChild(nav);

    var section = document.createElement('section');

    var title = document.createElement('h1');
    title.className = 'module-title';
    title.id = 'fourth-layer-title';

    var content = document.createElement('div');
    content.className = 'fourth-layer-content';
    content.setAttribute('aria-hidden', 'true');

    section.appendChild(title);
    section.appendChild(content);
    fourthScreen.appendChild(section);

    document.body.appendChild(fourthScreen);
  }

  var fourthTitle = document.getElementById('fourth-layer-title');

  function updateFourthTexts() {
    if (!fourthScreen) return;

    var nav = fourthScreen.querySelector('.module-nav');
    var section = fourthScreen.querySelector('section');
    var previous = fourthScreen.querySelector('[data-i18n="nav.previous"]');
    var main = fourthScreen.querySelector('[data-i18n="nav.main"]');

    if (nav) nav.setAttribute('aria-label', extraT('fourth.navigation') || i18n.t('aria.navigation'));
    if (section) section.setAttribute('aria-label', extraT('fourth.page') || i18n.t('aria.modulePage'));
    if (previous) previous.textContent = i18n.t('nav.previous');
    if (main) main.textContent = i18n.t('nav.main');

    if (fourthTitle && window.__fourthLayerTitleKey) {
      fourthTitle.textContent = i18n.t(window.__fourthLayerTitleKey);
    }
  }

  window.openFourthLayer = function(titleKey, cardElement) {
    if (!fourthScreen || !fourthTitle) return;

    window.__fourthLayerTitleKey = titleKey || '';

    if (cardElement) cardElement.classList.add('nav-press');
    thirdScreen.classList.add('layer-leave');

    window.setTimeout(function() {
      fourthTitle.textContent = titleKey ? i18n.t(titleKey) : '';
      updateFourthTexts();

      if (cardElement) cardElement.classList.remove('nav-press');

      thirdScreen.classList.remove('layer-leave');
      thirdScreen.style.display = 'none';
      thirdScreen.setAttribute('aria-hidden', 'true');

      fourthScreen.style.display = 'block';
      fourthScreen.setAttribute('aria-hidden', 'false');
      fourthScreen.classList.remove('layer-enter');
      void fourthScreen.offsetWidth;
      fourthScreen.classList.add('layer-enter');

      window.scrollTo(0, 0);
    }, 120);
  };

  window.backToThirdLayer = function() {
    if (!fourthScreen) return;

    fourthScreen.style.display = 'none';
    fourthScreen.setAttribute('aria-hidden', 'true');
    fourthScreen.classList.remove('layer-enter');

    thirdScreen.style.display = 'block';
    thirdScreen.setAttribute('aria-hidden', 'false');
    thirdScreen.classList.remove('layer-enter');
    void thirdScreen.offsetWidth;
    thirdScreen.classList.add('layer-enter');

    if (i18n.refresh) i18n.refresh();
    populateInvestmentValuesCard();
    window.scrollTo(0, 0);
  };

  window.showHomeFromFourth = function() {
    if (!fourthScreen) return;

    fourthScreen.style.display = 'none';
    fourthScreen.setAttribute('aria-hidden', 'true');

    if (typeof window.showHome === 'function') {
      window.showHome();
    }
    window.scrollTo(0, 0);
  };

  var baseOpenThirdLayer = window.openThirdLayer;
  window.openThirdLayer = function(cardIndex, cardElement) {
    baseOpenThirdLayer(cardIndex, cardElement);

    window.setTimeout(function() {
      populateInvestmentValuesCard();
    }, 160);
  };

  i18n.setLanguage = function(newLanguage) {
    baseSetLanguage(newLanguage);
    populateInvestmentValuesCard();
    updateFourthTexts();
  };

  updateFourthTexts();
})();