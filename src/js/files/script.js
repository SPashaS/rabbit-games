// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuClose } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

if (window.matchMedia('(min-width: 991.98px)').matches) {
  const parallax = document.querySelector('.parallax');
  const promo = document.querySelector('.promo');
  if (promo) {
    window.addEventListener('scroll', () => {
      let value = window.scrollY;

      parallax.style.backgroundPosition = `0 -${value * 0.5}px`;
      promo.style.top = `-${value * 0.2}px`;
    });
  }
}

// const itemProjects = document.querySelectorAll('.item-projects');

if (window.matchMedia('(max-width: 991.98px)').matches) {
  const menuBody = document.querySelector('.menu__body');
  const links = menuBody.querySelectorAll('.menu-item a');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menuClose();
    });
  });
}

// projectBody.addEventListener('mouseover', function(e) {
//   let target = e.target;
//   let itemProject = target.closest('.item-projects');
//   if (itemProject) {
//     let video = itemProject.querySelector('video');
//     if (video) {
//       video.play();
//     }
//   }
// })

// projectBody.addEventListener('mouseover', function(e) {
//   let target = e.target;
//   let itemProject = target.closest('.item-projects');
//   if (itemProject) {
//     let video = itemProject.querySelector('video');
//     if (video) {
//       video.play();
//     }
//   }
// })

const projectHome = document.querySelector('.projects_home');
if (projectHome) {
  const projectBody = projectHome.querySelector('.projects__body');

  if (isMobile.any()) {
    // console.log('mob');
    let videosItem = projectHome.querySelectorAll('.item-projects');
    let videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemProject = entry.target;
          const video = itemProject.querySelector('video');

          video.load();
          video.preload = null;

          // Play is a promise, so we need to check if we have it
          let playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (!entry.isIntersecting || entry.intersectionRatio <= 0.9) {
                  video.pause();
                  itemProject.classList.remove('item-projects_video-visible');
                } else {
                  video.play();
                  itemProject.classList.add('item-projects_video-visible');
                }
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
              });
          }
        });
      },
      {
        threshold: [0.9, 1],
      }
    );

    videosItem.forEach((item) => {
      videoObserver.observe(item);
    });
  } else {
    // console.log('ne-mob');
    projectBody.onmouseover = projectBody.onmouseout = handler;
    function handler(event) {
      let itemProject = event.target.closest('.item-projects');
      if (itemProject) {
        let video = itemProject.querySelector('video');
        console.log('video');
        if (video) {
          if (event.type == 'mouseover') {
            itemProject.classList.add('item-projects_video-visible');
            video.play();
          }

          if (event.type == 'mouseout') {
            itemProject.classList.remove('item-projects_video-visible');
            video.pause();
          }
        }
      }
    }
  }
}

// function playPauseVideo() {
//   let videos = document.querySelectorAll('video');
//   videos.forEach((video) => {
//     // We can only control playback without interaction if the video is muted
//     video.muted = true;
//     // Track if the video has been played
//     let hasPlayed = false;

//     // Play is a promise, so we need to check if we have it
//     let playPromise = video.play();

//     if (playPromise !== undefined) {
//       playPromise.then(() => {
//         let observer = new IntersectionObserver(
//           (entries) => {
//             console.log('entries');
//             console.log(entries);
//             entries.forEach((entry) => {
//               if (entry.intersectionRatio !== 1 && !video.paused && !hasPlayed) {
//                 // Pause the video only if it’s playing and hasn’t been played yet
//                 // video.pause();
//                 console.log('pause');
//               } else if (entry.intersectionRatio === 1 && video.paused && !hasPlayed) {
//                 // Play the video when it’s fully in view and hasn’t been played yet
//                 // video.play();
//                 hasPlayed = true;
//                 console.log('play');
//               }
//             });
//           },
//           { threshold: 0.2 }
//         );
//         observer.observe(video);
//       });
//     }
//   });
// }

// playPauseVideo();

// document.addEventListener('DOMContentLoaded', () => {
//   // Получаем стандартные <select> элементы
//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');

//   // Получаем кнопки и блоки
//   const buttons = document.querySelectorAll('.tabs__title');
//   const blocks = document.querySelectorAll('.tabs__body');

//   // Проверяем корректность количества кнопок и блоков
//   if (buttons.length !== blocks.length) {
//     console.error('Ошибка: Количество кнопок и блоков не совпадает.');
//     return;
//   }

//   console.log('Инициализация: Фильтры, кнопки и блоки найдены!');

//   // Функция для применения фильтров
//   const applyFilters = () => {
//     const selectedLocation = locationFilter.value; // Значение выбранного местоположения
//     const selectedType = typeFilter.value; // Значение выбранного типа работы

//     console.log('Фильтрация запущена:');
//     console.log('Выбранное местоположение:', selectedLocation);
//     console.log('Выбранный тип работы:', selectedType);

//     buttons.forEach((button, index) => {
//       const buttonLocation = button.getAttribute('data-location');
//       const buttonType = button.getAttribute('data-type');

//       const block = blocks[index]; // Соответствующий блок

//       console.log(
//         `Проверяем кнопку и блок с индексом ${index}:`,
//         `buttonLocation=${buttonLocation}, buttonType=${buttonType}`
//       );

//       // Проверяем, соответствуют ли атрибуты выбранным фильтрам
//       const matchesLocation =
//         selectedLocation === 'All' || buttonLocation === selectedLocation;
//       const matchesType = selectedType === 'All' || buttonType === selectedType;

//       if (matchesLocation && matchesType) {
//         console.log(`Показываем кнопку и блок с индексом ${index}.`);
//         button.hidden = false; // Показываем кнопку
//         block.hidden = false; // Показываем соответствующий блок
//       } else {
//         console.log(`Скрываем кнопку и блок с индексом ${index}.`);
//         button.hidden = true; // Скрываем кнопку
//         block.hidden = true; // Скрываем соответствующий блок
//       }
//     });
//   };

//   // Добавляем события на стандартные <select>
//   locationFilter.addEventListener('change', () => {
//     console.log('Изменено местоположение.');
//     applyFilters();
//   });

//   typeFilter.addEventListener('change', () => {
//     console.log('Изменен тип работы.');
//     applyFilters();
//   });

//   console.log('Инициализация завершена. Фильтры подключены.');
// });

// Вставляем исправленный JavaScript

// document.addEventListener('DOMContentLoaded', () => {
//   const vacancies = [
//     {
//       id: 1,
//       title: 'Senior JS/C++ (Client)',
//       location: 'Poland',
//       type: 'Remote',
//       description:
//         '<p>Work on the client-side of the gaming platform, collaborating with cross-functional teams to deliver excellent user experiences.</p>',
//     },
//     {
//       id: 2,
//       title: 'Senior C# (Backend)',
//       location: 'Remote',
//       type: 'Remote',
//       description:
//         '<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>',
//     },
//     {
//       id: 3,
//       title: 'Senior UX Designer',
//       location: 'Germany',
//       type: 'Office',
//       description:
//         '<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>',
//     },
//     {
//       id: 4,
//       title: 'C++/UE Developer',
//       location: 'Poland',
//       type: 'Hybrid',
//       description:
//         '<p>Create and optimize game logic and features using Unreal Engine and C++.</p>',
//     },
//   ];

//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');
//   const listContainer = document.querySelector('.spollers');

//   if (!locationFilter || !typeFilter || !listContainer) {
//     console.error(
//       'Не удалось найти один из элементов: locationFilter, typeFilter или listContainer.'
//     );
//     return;
//   }

//   const filterVacancies = (location, type) => {
//     return vacancies.filter((vacancy) => {
//       const matchesLocation =
//         location === 'All' || vacancy.location === location;
//       const matchesType = type === 'All' || vacancy.type === type;
//       return matchesLocation && matchesType;
//     });
//   };

//   const renderVacancies = (filteredVacancies) => {
//     listContainer.replaceChildren();

//     if (filteredVacancies.length === 0) {
//       const noResults = document.createElement('p');
//       noResults.classList.add('vacancies__no-results');
//       noResults.textContent = 'No vacancies found.';
//       listContainer.appendChild(noResults);
//       return;
//     }

//     filteredVacancies.forEach((vacancy) => {
//       const item = document.createElement('div');
//       item.classList.add('spollers__item');
//       item.innerHTML = `
//         <button type="button" data-spoller class="spollers__title">${vacancy.title}</button>
//         <div class="spollers__body" hidden>${vacancy.description}</div>
//       `;
//       listContainer.appendChild(item);
//     });
//   };

//   const applyFilters = () => {
//     const selectedLocation = locationFilter.value;
//     const selectedType = typeFilter.value;

//     const filteredVacancies = filterVacancies(selectedLocation, selectedType);
//     renderVacancies(filteredVacancies);
//   };

//   locationFilter.addEventListener('change', applyFilters);
//   typeFilter.addEventListener('change', applyFilters);

//   renderVacancies(vacancies);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const vacancies = [
//     {
//       id: 1,
//       title: 'Senior JS/C++ (Client)',
//       location: 'Poland',
//       type: 'Remote',
//       description:
//         `<p>RabbitGames is looking for a Senior C# Backend Developer to work on a platform for casual games operation management. You will work in the international team and develop different part of the management platform including dynamic configurations, analytics, account system and advertising. You ideally have over commercial experience in C# and .NET 8. Responsibilities:
// Develop and maintain backend services using C# and .NET 8, managing core platform components like dynamic configs, analytics, account management, and advertising modules.
// Design, build, and manage robust, scalable systems with Postgres SQL, Kubernetes (k8s), and Docker in a microservices architecture.
// Collaborate on integration across services within a monorepo, ensuring consistent standards and streamlined workflows.
// Work closely with cross-functional teams, including frontend engineers, to integrate solutions with existing and new frontends.
// Optimize code and infrastructure for high performance, reliability, and scalability.</p>

// Qualifications:
// 5+ years of professional experience coding C#
// Gamedev experience (it is really important)
// Languages: English B2
// 3+ years of server-side development coding C#, C++ or Java
// Familiarity with PostgresSQL
// Proficiency in .NET 8
// Experience in designing and building large-scale and high-performance systems
// Understanding asynchronous programming
// Understanding of data structures and algorithms
// Preferred skills:
// Proven experience with C#, .NET (preferably version 8), and PostgreSQL.
// Strong understanding of containerization and orchestration tools, specifically Kubernetes (k8s) and Docker.
// Experience with microservices architecture and monorepo-based development.
// Familiarity with frontend technologies, for better backend-frontend collaboration would be an advantage
// Knowledge of Keycloak for identity and access management would be an advantage.
// What are the conditions and bonuses?Remote, hybrid or onsite work in Poznan or Warsaw (Poland)
// B2B

// Paid leave: 20 days per year
// Paid sick leave: 5 days per year
// Start your workday anytime between 9am to 12pm (Poland)
// Co-financing of sport cards (Poland)`,
//     },
//     {
//       id: 2,
//       title: 'Senior C# (Backend)',
//       location: 'Remote',
//       type: 'Remote',
//       description:
//         '<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>',
//     },
//     {
//       id: 3,
//       title: 'Senior UX Designer',
//       location: 'Germany',
//       type: 'Office',
//       description:
//         '<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>',
//     },
//     {
//       id: 4,
//       title: 'C++/UE Developer',
//       location: 'Poland',
//       type: 'Hybrid',
//       description:
//         '<p>Create and optimize game logic and features using Unreal Engine and C++.</p>',
//     },
//   ];

//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');
//   const listContainer = document.querySelector('.spollers');

//   if (!locationFilter || !typeFilter || !listContainer) {
//     console.error(
//       'Не удалось найти один из элементов: locationFilter, typeFilter или listContainer.'
//     );
//     return;
//   }

//   // Получение уникальных значений для фильтров
//   const getUniqueValues = (key) => {
//     const values = vacancies.map((vacancy) => vacancy[key]);
//     return ['All', ...new Set(values)];
//   };

//   // Заполнение фильтров
//   const populateFilter = (filterElement, values) => {
//     filterElement.innerHTML = '';
//     values.forEach((value) => {
//       const option = document.createElement('option');
//       option.value = value;
//       option.textContent = value;
//       filterElement.appendChild(option);
//     });
//   };

//   populateFilter(locationFilter, getUniqueValues('location'));
//   populateFilter(typeFilter, getUniqueValues('type'));

//   const filterVacancies = (location, type) => {
//     return vacancies.filter((vacancy) => {
//       const matchesLocation =
//         location === 'All' || vacancy.location === location;
//       const matchesType = type === 'All' || vacancy.type === type;
//       return matchesLocation && matchesType;
//     });
//   };

//   const renderVacancies = (filteredVacancies) => {
//     listContainer.replaceChildren();

//     if (filteredVacancies.length === 0) {
//       const noResults = document.createElement('p');
//       noResults.classList.add('vacancies__no-results');
//       noResults.textContent = 'No vacancies found.';
//       listContainer.appendChild(noResults);
//       return;
//     }

//     filteredVacancies.forEach((vacancy) => {
//       const item = document.createElement('div');
//       item.classList.add('spollers__item');
//       item.innerHTML = `
//         <button type="button" data-spoller class="spollers__title">${vacancy.title}</button>
//         <div class="spollers__body" hidden>${vacancy.description}</div>
//       `;
//       listContainer.appendChild(item);
//     });
//   };

//   const applyFilters = () => {
//     const selectedLocation = locationFilter.value;
//     const selectedType = typeFilter.value;

//     const filteredVacancies = filterVacancies(selectedLocation, selectedType);
//     renderVacancies(filteredVacancies);
//   };

//   locationFilter.addEventListener('change', applyFilters);
//   typeFilter.addEventListener('change', applyFilters);

//   renderVacancies(vacancies);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const vacancies = [
//     {
//       id: 1,
//       title: 'Senior JS/C++ (Client)',
//       location: 'Poland',
//       type: 'Remote',
//       description:
//         '<p>RabbitGames is looking for a Senior C# Backend Developer to work on a platform for casual games operation management...</p>',
//     },
//     {
//       id: 2,
//       title: 'Senior C# (Backend)',
//       location: 'Remote',
//       type: 'Remote',
//       description:
//         '<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>',
//     },
//     {
//       id: 3,
//       title: 'Senior UX Designer',
//       location: 'Germany',
//       type: 'Office',
//       description:
//         '<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>',
//     },
//     {
//       id: 4,
//       title: 'C++/UE Developer',
//       location: 'Poland',
//       type: 'Hybrid',
//       description:
//         '<p>Create and optimize game logic and features using Unreal Engine and C++.</p>',
//     },
//   ];

//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');
//   const spollersContainer = document.querySelector('.spollers');
//   const tabsContainer = document.createElement('div');

//   tabsContainer.classList.add('vacancies__tabs', 'tabs');
//   tabsContainer.innerHTML = `
//     <nav data-tabs-titles class="tabs__navigation"></nav>
//     <div data-tabs-body class="tabs__content"></div>
//   `;

//   // Добавляем контейнер для табов после фильтров
//   document.querySelector('.vacancies__filters').after(tabsContainer);

//   const tabsNavigation = tabsContainer.querySelector('.tabs__navigation');
//   const tabsContent = tabsContainer.querySelector('.tabs__content');

//   const getUniqueValues = (key) => {
//     const values = vacancies.map((vacancy) => vacancy[key]);
//     return ['All', ...new Set(values)];
//   };

//   const populateFilter = (filterElement, values) => {
//     filterElement.innerHTML = '';
//     values.forEach((value) => {
//       const option = document.createElement('option');
//       option.value = value;
//       option.textContent = value;
//       filterElement.appendChild(option);
//     });
//   };

//   populateFilter(locationFilter, getUniqueValues('location'));
//   populateFilter(typeFilter, getUniqueValues('type'));

//   const filterVacancies = (location, type) => {
//     return vacancies.filter((vacancy) => {
//       const matchesLocation =
//         location === 'All' || vacancy.location === location;
//       const matchesType = type === 'All' || vacancy.type === type;
//       return matchesLocation && matchesType;
//     });
//   };

//   const renderVacancies = (filteredVacancies) => {
//     spollersContainer.replaceChildren();
//     tabsNavigation.replaceChildren();
//     tabsContent.replaceChildren();

//     if (filteredVacancies.length === 0) {
//       const noResults = document.createElement('p');
//       noResults.classList.add('vacancies__no-results');
//       noResults.textContent = 'No vacancies found.';
//       spollersContainer.appendChild(noResults);
//       return;
//     }

//     filteredVacancies.forEach((vacancy, index) => {
//       // Добавляем элемент в спойлеры
//       const spollerItem = document.createElement('div');
//       spollerItem.classList.add('spollers__item');
//       spollerItem.innerHTML = `
//         <button type="button" data-spoller class="spollers__title">${vacancy.title}</button>
//         <div class="spollers__body" hidden>${vacancy.description}</div>
//       `;
//       spollersContainer.appendChild(spollerItem);

//       // Добавляем кнопки навигации для табов
//       const tabButton = document.createElement('button');
//       tabButton.type = 'button';
//       tabButton.classList.add('tabs__title');
//       if (index === 0) tabButton.classList.add('_tab-active');
//       tabButton.setAttribute('data-location', vacancy.location);
//       tabButton.setAttribute('data-type', vacancy.type);
//       tabButton.textContent = vacancy.title;
//       tabsNavigation.appendChild(tabButton);

//       // Добавляем содержимое для табов
//       const tabBody = document.createElement('div');
//       tabBody.classList.add('tabs__body');
//       if (index !== 0) tabBody.style.display = 'none';
//       tabBody.setAttribute('data-location', vacancy.location);
//       tabBody.setAttribute('data-type', vacancy.type);
//       tabBody.innerHTML = `
//         <h3>${vacancy.title}</h3>
//         <p>${vacancy.description}</p>
//         <a href="#" class="promo__button button button_opacity"><span>Contact US</span></a>
//       `;
//       tabsContent.appendChild(tabBody);

//       // Логика переключения табов
//       tabButton.addEventListener('click', () => {
//         document
//           .querySelectorAll('.tabs__title')
//           .forEach((btn) => btn.classList.remove('_tab-active'));
//         document
//           .querySelectorAll('.tabs__body')
//           .forEach((content) => (content.style.display = 'none'));

//         tabButton.classList.add('_tab-active');
//         tabBody.style.display = 'block';
//       });
//     });
//   };

//   const applyFilters = () => {
//     const selectedLocation = locationFilter.value;
//     const selectedType = typeFilter.value;

//     const filteredVacancies = filterVacancies(selectedLocation, selectedType);
//     renderVacancies(filteredVacancies);
//   };

//   locationFilter.addEventListener('change', applyFilters);
//   typeFilter.addEventListener('change', applyFilters);

//   renderVacancies(vacancies);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const vacancies = [
//     {
//       id: 1,
//       title: 'Senior JS/C++ (Client)',
//       location: 'Poland',
//       type: 'Remote',
//       description:
//         '<p>RabbitGames is looking for a Senior C# Backend Developer to work on a platform for casual games operation management...</p>',
//     },
//     {
//       id: 2,
//       title: 'Senior C# (Backend)',
//       location: 'Remote',
//       type: 'Remote',
//       description:
//         '<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>',
//     },
//     {
//       id: 3,
//       title: 'Senior UX Designer',
//       location: 'Germany',
//       type: 'Office',
//       description:
//         '<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>',
//     },
//     {
//       id: 4,
//       title: 'C++/UE Developer',
//       location: 'Poland',
//       type: 'Hybrid',
//       description:
//         '<p>Create and optimize game logic and features using Unreal Engine and C++.</p>',
//     },
//   ];

//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');
//   const spollersContainer = document.querySelector('.spollers');
//   const tabsWrapper = document.querySelector('.vacancies__tabs-wrapper');

//   if (!tabsWrapper) {
//     console.error('Не удалось найти элемент .vacancies__tabs-wrapper.');
//     return;
//   }

//   const tabsContainer = document.createElement('div');

//   tabsContainer.classList.add('vacancies__tabs', 'tabs');
//   tabsContainer.innerHTML = `
//     <nav data-tabs-titles class="tabs__navigation"></nav>
//     <div data-tabs-body class="tabs__content"></div>
//   `;

//   // Добавляем контейнер для табов в указанный элемент
//   tabsWrapper.appendChild(tabsContainer);

//   const tabsNavigation = tabsContainer.querySelector('.tabs__navigation');
//   const tabsContent = tabsContainer.querySelector('.tabs__content');

//   const getUniqueValues = (key) => {
//     const values = vacancies.map((vacancy) => vacancy[key]);
//     return ['All', ...new Set(values)];
//   };

//   const populateFilter = (filterElement, values) => {
//     filterElement.innerHTML = '';
//     values.forEach((value) => {
//       const option = document.createElement('option');
//       option.value = value;
//       option.textContent = value;
//       filterElement.appendChild(option);
//     });
//   };

//   populateFilter(locationFilter, getUniqueValues('location'));
//   populateFilter(typeFilter, getUniqueValues('type'));

//   const filterVacancies = (location, type) => {
//     return vacancies.filter((vacancy) => {
//       const matchesLocation =
//         location === 'All' || vacancy.location === location;
//       const matchesType = type === 'All' || vacancy.type === type;
//       return matchesLocation && matchesType;
//     });
//   };

//   const renderVacancies = (filteredVacancies) => {
//     spollersContainer.replaceChildren();
//     tabsNavigation.replaceChildren();
//     tabsContent.replaceChildren();

//     if (filteredVacancies.length === 0) {
//       const noResults = document.createElement('p');
//       noResults.classList.add('vacancies__no-results');
//       noResults.textContent = 'No vacancies found.';
//       spollersContainer.appendChild(noResults);
//       return;
//     }

//     filteredVacancies.forEach((vacancy, index) => {
//       // Добавляем элемент в спойлеры
//       const spollerItem = document.createElement('div');
//       spollerItem.classList.add('spollers__item');
//       spollerItem.innerHTML = `
//         <button type="button" data-spoller class="spollers__title">${vacancy.title}</button>
//         <div class="spollers__body" hidden>${vacancy.description}</div>
//       `;
//       spollersContainer.appendChild(spollerItem);

//       // Добавляем кнопки навигации для табов
//       const tabButton = document.createElement('button');
//       tabButton.type = 'button';
//       tabButton.classList.add('tabs__title');
//       if (index === 0) tabButton.classList.add('_tab-active');
//       tabButton.setAttribute('data-location', vacancy.location);
//       tabButton.setAttribute('data-type', vacancy.type);
//       tabButton.textContent = vacancy.title;
//       tabsNavigation.appendChild(tabButton);

//       // Добавляем содержимое для табов
//       const tabBody = document.createElement('div');
//       tabBody.classList.add('tabs__body');
//       if (index !== 0) tabBody.style.display = 'none';
//       tabBody.setAttribute('data-location', vacancy.location);
//       tabBody.setAttribute('data-type', vacancy.type);
//       tabBody.innerHTML = `
//         <h3>${vacancy.title}</h3>
//         <p>${vacancy.description}</p>
//         <a href="#" class="promo__button button button_opacity"><span>Contact US</span></a>
//       `;
//       tabsContent.appendChild(tabBody);

//       // Логика переключения табов
//       tabButton.addEventListener('click', () => {
//         document.querySelectorAll('.tabs__title').forEach((btn) =>
//           btn.classList.remove('_tab-active')
//         );
//         document.querySelectorAll('.tabs__body').forEach((content) =>
//           (content.style.display = 'none')
//         );

//         tabButton.classList.add('_tab-active');
//         tabBody.style.display = 'block';
//       });
//     });
//   };

//   const applyFilters = () => {
//     const selectedLocation = locationFilter.value;
//     const selectedType = typeFilter.value;

//     const filteredVacancies = filterVacancies(selectedLocation, selectedType);
//     renderVacancies(filteredVacancies);
//   };

//   locationFilter.addEventListener('change', applyFilters);
//   typeFilter.addEventListener('change', applyFilters);

//   renderVacancies(vacancies);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const locationFilter = document.getElementById('locationFilter');
//   const typeFilter = document.getElementById('typeFilter');

//   // Функция инициализации кастомного селекта
//   const initCustomSelect = (selectElement, callback) => {
//     const trigger = selectElement.querySelector('.custom-select-trigger');
//     const options = selectElement.querySelectorAll('.custom-option');

//     // Открытие/закрытие списка
//     trigger.addEventListener('click', () => {
//       const isOpen = selectElement.classList.contains('open');
//       closeAllCustomSelects();
//       if (!isOpen) selectElement.classList.add('open');
//     });

//     // Выбор элемента
//     options.forEach((option) => {
//       option.addEventListener('click', () => {
//         const value = option.getAttribute('data-value');
//         const text = option.textContent;

//         // Устанавливаем выбранное значение в триггер
//         trigger.textContent = text;
//         selectElement.dataset.value = value;

//         // Закрываем селект
//         selectElement.classList.remove('open');

//         // Вызываем колбэк для обработки изменений
//         if (callback && typeof callback === 'function') {
//           callback(value);
//         }
//       });
//     });
//   };

//   // Закрытие всех селектов при клике вне
//   const closeAllCustomSelects = () => {
//     document.querySelectorAll('.custom-select').forEach((select) => {
//       select.classList.remove('open');
//     });
//   };

//   document.addEventListener('click', (e) => {
//     if (!e.target.closest('.custom-select')) {
//       closeAllCustomSelects();
//     }
//   });

//   // Применение фильтров
//   const applyFilters = () => {
//     const selectedLocation = locationFilter.dataset.value || 'All';
//     const selectedType = typeFilter.dataset.value || 'All';

//     console.log('Selected Filters:', { selectedLocation, selectedType });

//     // Вызов вашей функции фильтрации здесь
//     // Например: filterVacancies(selectedLocation, selectedType);
//   };

//   // Инициализируем кастомные селекты с передачей колбэка
//   initCustomSelect(locationFilter, applyFilters);
//   initCustomSelect(typeFilter, applyFilters);
// });

document.addEventListener('DOMContentLoaded', () => {
  const vacancies = [
    {
      id: 1,
      title: 'Senior JS/C++ (Client)',
      location: 'Poland',
      type: 'Remote',
      description:
        '<p>RabbitGames is looking for a Senior C# Backend Developer to work on a platform for casual games operation management...</p>',
    },
    {
      id: 2,
      title: 'Senior C# (Backend)',
      location: 'Remote',
      type: 'Remote',
      description:
        '<p>Build and maintain backend services using C#, ensuring high performance and scalability for our platform.</p>',
    },
    {
      id: 3,
      title: 'Senior UX Designer',
      location: 'Germany',
      type: 'Office',
      description:
        '<p>Design intuitive user experiences and collaborate with developers to bring them to life.</p>',
    },
    {
      id: 4,
      title: 'C++/UE Developer',
      location: 'Poland',
      type: 'Hybrid',
      description:
        '<p>Create and optimize game logic and features using Unreal Engine and C++.</p>',
    },
  ];

  const locationFilter = document.getElementById('locationFilter');
  const typeFilter = document.getElementById('typeFilter');
  const spollersContainer = document.querySelector('.spollers');
  const tabsWrapper = document.querySelector('.vacancies__tabs-wrapper');

  if (!tabsWrapper) {
    console.error('Не удалось найти элемент .vacancies__tabs-wrapper.');
    return;
  }

  const tabsContainer = document.createElement('div');

  tabsContainer.classList.add('vacancies__tabs', 'tabs');
  tabsContainer.innerHTML = `
    <nav data-tabs-titles class="tabs__navigation"></nav>
    <div data-tabs-body class="tabs__content"></div>
  `;

  // Добавляем контейнер для табов в указанный элемент
  tabsWrapper.appendChild(tabsContainer);

  const tabsNavigation = tabsContainer.querySelector('.tabs__navigation');
  const tabsContent = tabsContainer.querySelector('.tabs__content');

  const getUniqueValues = (key) => {
    const values = vacancies.map((vacancy) => vacancy[key]);
    return ['All', ...new Set(values)];
  };

  const populateFilter = (filterElement, values) => {
    filterElement.innerHTML = '';
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      filterElement.appendChild(option);
    });
  };

  populateFilter(locationFilter, getUniqueValues('location'));
  populateFilter(typeFilter, getUniqueValues('type'));

  const filterVacancies = (location, type) => {
    return vacancies.filter((vacancy) => {
      const matchesLocation =
        location === 'All' || vacancy.location === location;
      const matchesType = type === 'All' || vacancy.type === type;
      return matchesLocation && matchesType;
    });
  };

  const renderVacancies = (filteredVacancies) => {
    spollersContainer.replaceChildren();
    tabsNavigation.replaceChildren();
    tabsContent.replaceChildren();

    if (filteredVacancies.length === 0) {
      const noResults = document.createElement('p');
      noResults.classList.add('vacancies__no-results');
      noResults.textContent = 'No vacancies found.';
      spollersContainer.appendChild(noResults);
      return;
    }

    filteredVacancies.forEach((vacancy, index) => {
      // Добавляем элемент в спойлеры
      const spollerItem = document.createElement('div');
      spollerItem.classList.add('spollers__item');
      spollerItem.innerHTML = `
        <button type="button" data-spoller class="spollers__title">${vacancy.title}</button>
        <div class="spollers__body" hidden>${vacancy.description}</div>
      `;
      spollersContainer.appendChild(spollerItem);

      // Добавляем кнопки навигации для табов
      const tabButton = document.createElement('button');
      tabButton.type = 'button';
      tabButton.classList.add('tabs__title');
      if (index === 0) tabButton.classList.add('_tab-active');
      tabButton.setAttribute('data-location', vacancy.location);
      tabButton.setAttribute('data-type', vacancy.type);
      tabButton.textContent = vacancy.title;
      tabsNavigation.appendChild(tabButton);

      // Добавляем содержимое для табов
      const tabBody = document.createElement('div');
      tabBody.classList.add('tabs__body');
      if (index !== 0) tabBody.style.display = 'none';
      tabBody.setAttribute('data-location', vacancy.location);
      tabBody.setAttribute('data-type', vacancy.type);
      tabBody.innerHTML = `
        <h3>${vacancy.title}</h3>
        <p>${vacancy.description}</p>
        <a href="#" class="promo__button button button_opacity"><span>Contact US</span></a>
      `;
      tabsContent.appendChild(tabBody);

      // Логика переключения табов
      tabButton.addEventListener('click', () => {
        document
          .querySelectorAll('.tabs__title')
          .forEach((btn) => btn.classList.remove('_tab-active'));
        document
          .querySelectorAll('.tabs__body')
          .forEach((content) => (content.style.display = 'none'));

        tabButton.classList.add('_tab-active');
        tabBody.style.display = 'block';
      });
    });
  };

  const applyFilters = () => {
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;

    const filteredVacancies = filterVacancies(selectedLocation, selectedType);
    renderVacancies(filteredVacancies);
  };

  locationFilter.addEventListener('change', applyFilters);
  typeFilter.addEventListener('change', applyFilters);

  renderVacancies(vacancies);
});
