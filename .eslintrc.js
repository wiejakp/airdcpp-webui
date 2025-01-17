/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2, { "SwitchCase": 1 }],
    "max-len": [
      "error",
      {
        "code": 120
      }
    ],
    "react/prop-types": "off",
    "no-extra-boolean-cast": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "args": "none", "ignoreRestSiblings": true }]
  },
  "plugins": [
    "eslint-plugin-react",
    "@typescript-eslint",
  ],
  /*"rules": {
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/indent": [
          "error",
          2,
          {
              "CallExpression": {
                  "arguments": "first"
              },
              "FunctionDeclaration": {
                  "parameters": "first"
              },
              "FunctionExpression": {
                  "parameters": "first"
              }
          }
      ],
      "@typescript-eslint/member-delimiter-style": [
          "error",
          {
              "multiline": {
                  "delimiter": "semi",
                  "requireLast": true
              },
              "singleline": {
                  "delimiter": "semi",
                  "requireLast": false
              }
          }
      ],
      "@typescript-eslint/member-ordering": "error",
      // "@typescript-eslint/naming-convention": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-shadow": [
          "error",
          {
              "hoist": "all"
          }
      ],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/quotes": [
          "error",
          "single"
      ],
      "@typescript-eslint/semi": [
          "error",
          "always"
      ],
      "@typescript-eslint/type-annotation-spacing": "error",
      "@typescript-eslint/typedef": [
          "error",
          {
              "propertyDeclaration": true
          }
      ],
      "brace-style": [
          "error",
          "1tbs"
      ],
      "comma-dangle": "off",
      "curly": "error",
      "default-case": "error",
      "dot-notation": "off",
      "eol-last": "off",
      "eqeqeq": [
          "error",
          "smart"
      ],
      "guard-for-in": "error",
      "id-denylist": [
          "error",
          "any",
          "Number",
          "number",
          "String",
          "string",
          "Boolean",
          "boolean",
          "Undefined",
          "undefined"
      ],
      "id-match": "error",
      "indent": "error",
      "jsdoc/check-alignment": "error",
      "jsdoc/check-indentation": "error",
      "jsdoc/newline-after-description": "error",
      "max-len": [
          "error",
          {
              "code": 120
          }
      ],
      "no-bitwise": "error",
      "no-caller": "error",
      "no-console": [
          "off",
          {
              "allow": [
                  "warn",
                  "dir",
                  "timeLog",
                  "assert",
                  "clear",
                  "count",
                  "countReset",
                  "group",
                  "groupEnd",
                  "table",
                  "dirxml",
                  "groupCollapsed",
                  "Console",
                  "profile",
                  "profileEnd",
                  "timeStamp",
                  "context"
              ]
          }
      ],
      "no-debugger": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-eval": "error",
      "no-fallthrough": "error",
      "no-multiple-empty-lines": "off",
      "no-new-wrappers": "error",
      "no-redeclare": "error",
      "no-shadow": "error",
      "no-trailing-spaces": "off",
      "no-underscore-dangle": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "quotes": "error",
      "radix": "off",
      "react/jsx-boolean-value": "off",
      "react/jsx-curly-spacing": "off",
      "react/jsx-key": "error",
      "react/jsx-no-bind": "off",
      "react/jsx-wrap-multilines": "off",
      "react/self-closing-comp": "error",
      "semi": "error",
      "spaced-comment": [
          "off",
          "always",
          {
              "markers": [
                  "/"
              ]
          }
      ],
      "@typescript-eslint/tslint/config": [
          "error",
          {
              "rules": {
                  "jsx-no-string-ref": true,
                  "whitespace": [
                      true,
                      "check-branch",
                      "check-decl",
                      "check-module",
                      "check-operator",
                      "check-separator",
                      "check-type",
                      "check-typecast"
                  ]
              }
          }
      ]
  }*/
};
