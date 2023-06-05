# <img align='center' src='./src/assets/img/logo-32.png'> Tea Time In Space

<a href='https://www.youtube.com/watch?v=8eE5jiJ_Fo8' style="display: flex; align-items: center;">
<img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="20" height="20"  alt="YouTube">
&nbsp;Video Demo
</a>
<br>

## Description

Tea Time In Space is a chrome extension that overrides chrome's newtab page. It displays an interesting fact of the day, the astronomy photo of the day, realtime location of the ISS on an interactive map, and a list of astronauts currently in space with extra information about each astronaut.

This project's main purpose was to serve as my final project for Harvard's [CS50x](https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home) course. It was inspired by my love for space and I hope that this extension can extend (pun fully intended) that interest to other people.

For the tech stack I chose to use TypeScript and React. TypeScript for the countless hours of bug fixing that I would inevitably need to do if I were to use vanilla JavaScript, and React because I love building front end applications with it. One problem that TypeScript doesn't solve, however, is run-time type validation. Since this project relies on external APIs that I have no control over, it was important to implement a solution for run-time type validation so that my application could "fail gracefully" if data were to come back in a schema that I wasn't expecting. To solve this problem I used a library called Zod, which is a schema validation library designed with TypeScript in mind.

The app has a very simple background script which adds an event listener for when a user clicks on the extension icon. When clicked, it'll open a new tab page.

There are no content scripts for this extension as it only runs on the new tab page.

There are two main directories within the `src` directory: `components` and `hooks`. The custom hooks are responsbile from fetching data from external APIs as well as storing and retrieving data from chrome's local storage. The components are the building blocks for what make up the app.

## Credit

This project was bootstrapped with [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react) and it would not be possible without the following APIs:

- [Astronomy Photo of the Day](https://api.nasa.gov/)
- [Current location of the ISS](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
- [Astronaut information](https://ll.thespacedevs.com/docs/)

Thank you to all of the contributors and maintainers.
