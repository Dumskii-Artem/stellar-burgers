# Проектная работа 11 и 12-го (в работе) спринтов

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## 11 спринт:

**Для корректной работы запросов к серверу необходимо** добавить переменную BURGER_API_URL в окружение.
Для этого содержимое файла `.env.example` нужно скопировать в файл `.env`

для локального запуска
* удалить строку с homepage в файде package.json
* посмотреть порт на котором запускается в конце файла webpack.config.js
* в корневой папке создать файл .env и скопировать туда содержимое из .env.example

после этого выполнить следующие команды

```
npm install
npm i react-router-dom
npm i -D @types/react-router-dom
npm install @reduxjs/toolkit react-redux
npm start
```


StoreBook
```
npx storybook@latest init
npm run storybook
```

## 12 спринт:

### Настройка Cypress
```
npm install cypress --save-dev 
npm install ts-node --save-dev
```
одновременно запускаем 
* приложение stella-burgers в терминале
```
 npm start
 ```
* cypress в vscode или в другом терминале
```
npx cypress open
```

### Настройка Jest

```
npm install --save-dev jest
npm install --save-dev ts-jest ts-node
npm install --save-dev @jest/globals
```
