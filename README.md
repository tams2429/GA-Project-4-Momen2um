# GA Project 4: Momen2um

## Table of Contents

- [Overview](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#f99c1c68a0be411ea21aebfba620afdd),
- [Technologies](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#c4e06631a3be4fceb9e534a52290e05d),
- [External APIs](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#9a46589e5ce64646bc78fa1fe13382ee),
- [Planning](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#fe3af2ac0fd944c98a0bad3a79ddff88),
- [Getting Started](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#99b60c701ae0446998be70811a2726d1),
- [Wins](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#81e74b7a4ae74f2399c85b5ed0c61304),
- [Challenges](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#7fedc5eb0935405e992e4910a4d6d3a7),
- [Future Work](https://www.notion.so/Project-3-Readme-Fri-21st-Aug-95a55df0773f45c1af1f5ec3084c4b5b#fca88914eeb14fc0909ad0588d7ea20c),

## Overview

### Brief

- **Solo project**,
- **1 week timeframe**,
- **Build a full-stack application** by making your own Back-End and your own Front-End,
- **Use a Django (with Python) back-end API** to serve your data from a **PostgreSQL database**,
- **Consume your API with a separate front-end** built with **React**,
- **Be a complete product** which most likely means multiple relationships and **CRUD functionality** for at least a couple of models,
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut,
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this,
- **Be deployed online** so it's publicly accessible,

I created Momen2um, a productivity app inspired by a Chrome Extension that I am currently using, Momentum but with additional features tailored for myself i.e. music player, news app, workout timer and a 'to-do' list.

This application is designed to be the 'one-stop' location for anyone looking for productivity during the day with everything from news articles and music player all in one place, removing distractions and the need for users to go onto any other internet pages. Users can also register and log in which will allow any 'to-do' items and custom 'workouts' to be saved and added onto a personal 'to-do' list. Additional features include a 10 minute workout timer which is pre-programmed to start every hour which ties in with the main aim of the app, 'Get Productive or Get Fit trying...' Although, for those that just want to focus on working, there is a 'Do not disturb' mode which will just continue counting down the time to the end of the day without the 'workout mode' being triggered.

![Working gif of application](/ReadmeResources/Momen2um-GIF.gif)

The is a full-stack app utilising React on the Front-End and Django (with Python) on the Back-End along with PostgreSQL database and other packages.

## Technologies

- Front-End:
    - ReactJS,
    - HTML5,
    - SCSS (with Bulma framework),
- Back-End:
    - Django (with Python),
    - PostgreSQL (SQL database),
- General:
    - Github,
    - Insomnia (Back-End Testing),
    - TablePlus GUI (Back-End SQL database testing),
    - Figma (Wireframe),
- Libraries:
    - AntDesign,
    - Moment.js,
    - React-modal,

## External APIs

This application uses external APIs, in order to enjoy the full experience of this application, please use the deployed version here ([http://momen2um.herokuapp.com/](http://momen2um.herokuapp.com/)) or to run it locally for development purposes etc, you will need to sign up for an API key from each of the following links:

- [OpenWeatherMap API](https://openweathermap.org/guide) (Weather info. for Citites),
- [Unsplash API](https://unsplash.com/documentation#getting-started) (Background image for application),
- [GNews API](https://gnews.io/) (News articles),
- [Programming Quotes API](https://programming-quotes-api.herokuapp.com/) (Random programming quotes),

## Planning

- Figma for initial wireframe,

    ![Figma screenshot](/ReadmeResources/Figma.png)

- Trello for task planning and tracking,

    ![Trello screenshot](/ReadmeResources/Trello.png)

- ERD (Entity Relationship Diagram) for database planning,

    ![ERD Diagram](/ReadmeResources/ERD v4.png)

- RESTful Routes for Back-end,

    ![Insomnia screenshot](/ReadmeResources/Insomnia.png)

- Researched and finalised the main frameworks and libraries to use,

### MVP

- Register and Login User functionality:
    - Ability to edit your profile,
- To-do list:
    - Ability to add + remove items and be saved to the User,
    - Add workout,
- Countdown timer (from midnight),
- Hard-coded array of background images,

## Getting Started

As highlighted earlier, in order to enjoy the full experience of the application, it is recommended to use the deployed version at [http://momen2um.herokuapp.com/](http://momen2um.herokuapp.com/). If you wish to run it locally, you will need to follow the following steps:

- Fork or Clone the GitHub repositry ([https://github.com/tams2429/GA-Project-4-Momen2um](https://github.com/tams2429/GA-Project-4-Momen2um)),
- Run `pip install pipenv` to install virtual environment package onto your machine (only if you have never installed this package on any project),
- Run `pipenv shell` in the root project folder (i.e. Back-End) to move into the virtual environment,
- `pipenv install` to install all Back-End dependencies,
- `python manage.py loaddata workouts/seeds.json`, `python manage.py loaddata todoitems/seeds.json`,
`python manage.py loaddata exercises/seeds.json`,
`python manage.py loaddata jwt_auth/seeds.json` to load in existing seeded data,
- `python manage.py runserver` to start the Back-End server,
- `cd frontend` to go to the Front-End directory,
- Run `yarn` to install all Front-End dependencies,
- Run `yarn start` to start the development server for the whole application from the Front-End directory,

## Wins

The biggest win in this project was learning the basics of Django and Python in a short space of time (i.e. 1.5 weeks) and  then, with the help of documentations, implementing them to create a fully functioning, full-stack application.

I was also happy with the aesthetics of the application where I used 'pop-up' modals for the various components of my application. This helped to declutter the window, especially with the number of external APIs I was trying to incorporate onto a single page application.

## Challenges

The most challenging aspect of this project was time management, for which Trello was a great tool in planning and breaking down the tasks throughout the week.

Other notable challenges include converting between normal human time and machine unix time to calculate and present the time remaining in the day. Incorporating autocomplete in the 'to-do' list when Users want to input an existing workout as an item.

## Future Work

### Bugs

- Logged in user able to edit and delete other user's 'workout' if they know the 'workout' id (need to follow what I did for 'Users' and 'To-do item'?),

### Planned features/extensions

- Weather information based on current location from Weather API,
- Turn off pre-set timer with 'Silent mode',
- Landing page with title animations before opening application,
- 'Checked' to-do items to be striked through,
- Draggable 'to-do' items,
- Associate categories (i.e. work) to 'to-do' items,
