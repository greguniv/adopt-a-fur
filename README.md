# Adopt-A-Fur
* To view the wireframe for this project, please check out my [Figma](https://www.figma.com/file/4mt02SD7DuDx4Z3pGyWjLG/Adopt-A-Fur?node-id=0%3A1).
---
* To view the deployed website, please check it out on [Heroku](https://adoptafur.herokuapp.com/). *
---
For this project, I used a third-party API from [Petfinder](https://www.petfinder.com/developers/) to pull a set of 20 animals available for adoption. The set of animals is randomized, so every refresh on the page yields 20 new animals available as cards with their Names, Age, Gender, and a brief Description.

This API has an access token that expires every 60 minutes, then requires a new access token. *If the deployed website is unavailable, the access token has expired.

The Login feature allows 'Liked' images to be stored until unliked or no longer logged in. 'Signing up' yields the same, the information is not stored.

At this time, a search feature has not been added, but is something planned for the future.
--
Technologies
* [Petfinder API](https://www.petfinder.com/developers/)
* React
* Bootstrap/Icons