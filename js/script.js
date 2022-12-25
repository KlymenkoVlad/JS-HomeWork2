/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
        //Переменные с верстки
    const btn = document.querySelector('button'),
          promoAdv = document.querySelectorAll('.promo__adv img '),
          promoBG = document.querySelector('.promo__bg'),
          promoGenre = promoBG.querySelector('.promo__genre'),
          promoListMov = document.querySelector('.promo__interactive-list'),
          addInput = document.querySelector('.adding__input');

    //Объект
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
        ],
    };

    function toLowCase() {
        movieDB.movies = movieDB.movies.map(str => str.toLowerCase());
    }
    const moviesForSort = toLowCase();

    promoAdv.forEach(item => {
        item.remove();
    });

    promoGenre.textContent = 'Драма';
    promoBG.style.backgroundImage = 'url("img/bg.jpg")';

    //Сортировка фильмов в списке
    function movieSort () {
        promoListMov.innerHTML = "";
        movieDB.movies.sort();
        movieDB.movies.forEach ((film, i) => {
            promoListMov.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
    movieSort();

    //Добавление фильмов по нажатию на кнопку
    btn.addEventListener('click', (event,) => {
        const inp = addInput.value;

        if (inp.length === 0) {
            alert("Пожалуйста, укажите фильм");
        } else if (inp.length > 21) {
            movieDB.movies.push(`${inp.slice(0, 21)}...`.toLowerCase());
        } else {
            movieDB.movies.push(inp.toLowerCase());
        }

        movieSort();
        document.querySelector('.adding__input').value = '';
        });

    const checkbox = document.getElementById('checkbox');

    //Любимый фильм, чекбокс
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            console.log("Добавляем любимый фильм");
        }
    });
});

