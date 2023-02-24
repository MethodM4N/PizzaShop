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
- TypeScript
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
- Вынес бизнес логику в отдельный Redux (создал асинхронный экшен createAsyncThunk (+ extraReducers) в apiSlice) (в Movies у меня она вынесена в classes MainAPI/MoviesAPI)
- Создали Redux селекторы;
- Динамические роутеры (pizza/:id, возвращаем динамические параметры из адресной строчки используя useParams, достали id, отрисовал описание по одной пицце, useNavigate когда нужная пицца не найдена)
- Outlet (реализовал логику родительских/дочерних роутов при помощи специализированного компонента Outlet (аналог children))
- Добавил статическую типизацию посредством внедрения TypeScript (type,
оператор опциональной последовательности "?" in Search.tsx, Sort.tsx path: Node[] - нажатие на BodyElement)
- Типизация Redux Toolkit (типизировал стейты при помощи интерфейсов/типов, создал глобальный тип нашего хранилища RootState в Store.ts, типизировал экшены action: PayloadAction<Number...>, выполнил сокращение type при помощи Record в apiSlice, типизировал однотипные асинхронные запросы в apiSlice, использовал enum apiSlice аналог объекта в typeScript, создал типизированный Dispatch ()
- Произвел оптимизацию проекта, посредством библиотеки ahooks (хук useWhyDidYouUpdate) отследил почему производится ререндер компонента, ререндер был устранен с использованием React.memo
- Организовал сохранение пицц в localStorage
-
```
