## Разработка сайта по заказу пицц.

О проекте: учебный проект, на котором планирую опробовать новые выученные технологии и знания.

## Ссылка на Github Pages

в процессе...

## Инструкция по установке и запуску

Клонировать репозиторий ---> npm i ---> npm start.

## Стэк технологий

```
- HTML5
- CSS3 (CSS-Modules / SCSS)
```

```JS
- JavaScript ES2015
- React.js
- Redux Toolkit
```

## Другие технологии + функционал

```
- Реализовал поиск
- Axios + Fetch (загрузка пицц с бэкенда), async await
- Попробовал mockapi.io
- React Content Loader (реализовал скелетон)
- Оптимизировал поиск с помощью Lodash.Debounce (создав дополнительный локальный value в компоненте Search)
- Сохранил параметры фильтрации в URL посредством npm библиотеки qs
- Компонент Sort скрытие попапа по нажатию вне компонента
if (!event.composedPath().includes(popup.current))
- Вынесли бизнес логику в отдельный Redux (создали асинхронный экшен createAsyncThunk (+ extraReducers) в apiSlice) (в Movies у меня она вынесена в classes MainAPI/MoviesAPI)
- Создали Redux селекторы ()
```
