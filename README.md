# blog-appwrite-ts

![image](https://github.com/RameshNeupane/blog-appwrite-ts/assets/45593423/c6083239-3396-4c73-ba28-61bba9a743fb)

## About

This is a blog application using reactJS, redux toolkit and appwrite (BaaS: Backend-as-a-Service) along with TypeScript. Application is responsive to various device screens.


## Deployment

[https://blog-appwrite-ts.vercel.app/](https://blog-appwrite-ts.vercel.app/)

## Setup

This is a [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) project created with [Vite](https://vitejs.dev/). Make sure that you have installed React and Vite into your machine.

- Clone or download github repository.
  ```sh
  git clone git@github.com:RameshNeupane/blog-appwrite-ts.git
  ```

- Install npm dependencies.
  ```sh
  npm install
  ```

- Setup [appwrite](https://cloud.appwrite.io/) environment as specified in `.env.sample`.
  ```js
  VITE_APPWRITE_URL="appwrite endpoint url"
  VITE_APPWRITE_PROJECT_ID="appwrite project id"
  VITE_APPWRITE_DATABASE_ID="appwrite database id"
  VITE_APPWRITE_COLLECTION_ID="appwrite collection id"
  VITE_APPWRITE_BUCKET_ID="appwrite bucket id"
  ```

- Run project in your machine.
  ```sh
  npm run dev
  ```

## Dependencies

- [**appwrite**](https://www.npmjs.com/package/appwrite): Appwrite is an open-source backend as a service server that abstract and simplify complex and repetitive development tasks behind a very simple to use REST API.
 
- [**@headlessui/react**](https://www.npmjs.com/package/@headlessui/react): A set of completely unstyled, fully accessible UI components for React, designed to integrate beautifully with Tailwind CSS.
- [**@reduxjs/toolkit**](https://www.npmjs.com/package/@reduxjs/toolkit): The official, opinionated, batteries-included toolset for efficient Redux development i.e. state management.
- [**@tinymce/tinymce-react**](https://github.com/tinymce/tinymce-react): Official [TinyMCE](https://www.tiny.cloud/) React component. The world's #1 open source rich text editor.
- [**html-react-parser**](https://www.npmjs.com/package/html-react-parser): The parser converts an HTML string to one or more React elements.
- [**react-hook-form**](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
- [**react-router-dom**](https://reactrouter.com/en/main): The react-router-dom package contains bindings for using React Router in web applications.
- [**react-redux**](https://react-redux.js.org/): Official React bindings for Redux.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
