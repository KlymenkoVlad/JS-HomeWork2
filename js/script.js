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
          addForm = document.querySelector('.add'),
          addInput = document.querySelector('.adding__input'),
          addCheckbox = document.getElementById('checkbox');
        //addCheckbox = document.getElementById('[type="checkbox"]');

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
    
    const advDel = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    advDel(promoAdv);

    const changes = () => {
        promoGenre.textContent = 'Драма';
        promoBG.style.backgroundImage = 'url("img/bg.jpg")';
    };
    changes();
    
    function movieSort (films) {
        movieDB.movies = films.map(str => str.toLowerCase());
        movieDB.movies.sort();
    }
    movieSort(movieDB.movies);

    //Сортировка фильмов в списке
    const createMovieList = (films, parent)  => {
        parent.innerHTML = "";
        films.forEach ((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
        
        document.querySelectorAll('.delete').forEach((btn, i)=> {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                
                
                createMovieList(films, parent);
            });
        });
    };
        
    createMovieList(movieDB.movies, promoListMov);


    //Добавление фильмов по нажатию на кнопку
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const inp = addInput.value;
        const checkbox = addCheckbox.checked;
        
        if (checkbox) {
            alert("любимый фильм добавлен");
            console.log("Добавляем любимый фильм");
        }

        if (inp) {
            movieDB.movies.push(inp.toLowerCase());
        } else if (inp.length > 21) {
            movieDB.movies.push(`${inp.slice(0, 22)}...`.toLowerCase());
        } else {
            alert("Пожалуйста, укажите фильм");
        }

        movieSort(movieDB.movies);
        createMovieList(movieDB.movies, promoListMov);
        // document.querySelector('.adding__input').value = '';
        event.target.reset();
        });
});