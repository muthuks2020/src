import i18n from 'i18n-js';

import en from '../translations/en.json';
import es from '../translations/es.json';

i18n.fallbacks = true;
i18n.translations = { en, es };
i18n.missingTranslation = function () { return undefined; };
export default i18n;

