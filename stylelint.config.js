/** @type {import('stylelint').Config} */

const genericOnlyClassRule = [
  0,
  { message: 'BEM: Only use a single class to avoid specificity issues' },
];

const BEM_NAMES = '[a-z][a-z0-9]*(-[a-z0-9]+)*';
const blockName = `${BEM_NAMES}`;
const elemName = `__${BEM_NAMES}`;
const modifierName = `--${BEM_NAMES}`;
const modifierValue = `--${BEM_NAMES}`;
const classPattern = `^${blockName}(${elemName})?(${modifierName})?(${modifierValue})?$`;

const bemRules = {
  'selector-max-combinators': [
    0,
    {
      message: 'BEM: Combinators increase specificity',
    },
  ],
  'selector-max-class': [
    1,
    { message: 'BEM: Use a single class for flat specificity' },
  ],
  'selector-max-attribute': genericOnlyClassRule,
  'selector-max-id': genericOnlyClassRule,
  'selector-max-type': genericOnlyClassRule,
  'selector-max-universal': genericOnlyClassRule,
};

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-concentric-order'],
  ignoreFiles: ['**/*', '!src/**/*.css'],
  rules: {
    'declaration-no-important': true,
    'selector-class-pattern': [
      classPattern,
      {
        message: (selector) =>
          `Selector class ${selector} violates BEM Convention`,
        resolveNestedSelectors: true,
      },
    ],
    ...bemRules,
  },
};
