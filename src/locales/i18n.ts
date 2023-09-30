// import * as i18next from 'i18next';

// console.log(`process env ${process.env.LANG}`);

// // i18nextの初期化
// i18next.init({
//   lng: process.env.LANG || 'en', // デフォルト言語。環境変数LANGがあればそれを使用
//   fallbackLng: 'en', // 言語リソースが見つからない場合のフォールバック言語
//   resources: {
//     en: {
//       translation: {
//         description: 'Description in English',
//         flowChart: 'Flow Chart in English',
//         exampleCode: 'Example Code in English',
//       },
//     },
//     ja: {
//       translation: {
//         description: '日本語での説明',
//         flowChart: '日本語でのフローチャート',
//         exampleCode: '日本語での例コード',
//       },
//     },
//   },
// });

// // 言語リソースの利用
// console.log(i18next.t('description'));
// console.log(i18next.t('flowChart'));
// console.log(i18next.t('exampleCode'));

import * as i18next from 'i18next';
import * as enLocale from './en/locale.json';
import * as jaLocale from './ja/locale.json';

export const defaultNS = 'enLocale';

i18next.init({
  debug: true,
  lng: process.env.LANG || 'en', // デフォルト言語。環境変数LANGがあればそれを使用
  fallbackLng: 'en',
  defaultNS,
  resources: {
    en: {
      ...enLocale,
    },
    ja: {
      ...jaLocale,
    },
  },
});

console.log(i18next.t('main.message'));

export default i18next;
