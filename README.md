# Adopt-A-Fur
* To view the wireframe for this project, please check out my [Figma](https://www.figma.com/file/4mt02SD7DuDx4Z3pGyWjLG/Adopt-A-Fur?node-id=0%3A1).
![Image](https://lh3.googleusercontent.com/_COVr0i8Wjl-FbHoItWjH18fFfFMVmfFWqspVicj_Nc-FR1HaB2FGRtEE6TdIa82ZM-H--yegfRx5CMKheBuRhdJR5peHub8BRTeM6B0shhdoz9iOKEPLJmUZSRsik9bmmy8n3zn5lIaHz1afS64u4OvlhbUvAiX2sjb-LuBEus_jXbAm2_16dqqjSxi5AWBs5jim1nUcn64qK1fxwJYjWo6FlB1lql1CXnygVzESTIyeFMg-yjdioS1r4dw1bQKnU4sncZG20NEpoQMxoBJgAZqoBbhsei70L0m34Cc4jqvwcEjhJZdT9dgjvwOsh7WRx4UYWP0YLihTJBa79q2fm7LixX-diFz_aVH05NHm-lQQNoW-8_Q1Ziq5XyB7E5LQvqByHkafWeNl2kBZ802X5p4u5VEchvtMahfhpOXHpvQmxVPpr1__-_35rT4B9NVq5QWsdtFAsa0zQLiUvhGH1RLeCe86SULIEZsPY7PfmiJIYsCMaDmTHP7Ri3iSSJh4VwAcYM7Cn-wzswkFX__FvMGZ1ygMwY4Ih5HmNJeU6Qpy2H5jdbuKaJ-a7en8d6W4lAREF4SYm4UEYmj9Bd0QVtamy29VTGUzQSuloTtRNNK5XJZhADVDpJJ5GB64NXzYzH0ZJaxgRSfpUO8Ns_IFJih0vB1JG-Ot1GcGMZwFhiitYeNoGFCfCwWj4T-WNHCNw7kNdoi1QpxkB2t5HDPVtp2AVrGYN7RT_3oOLBrfgc_tYatWhEUBqebG9_UIx63YN2gaeu_thtKxX4FGe3AI6o2fL0U9u76cw=w1164-h870-no?authuser=0)
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
* Unsplash
