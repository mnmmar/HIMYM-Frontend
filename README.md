To redeploy from Netlify, in the terminal run
```
npm i

npm run build

sudo netlify deploy --prod
```

Approach Taken

We decided to make a small wiki page of the How I Met Your Mother show, a classic fan favorite. The search for an existing 3rd party API was long and hard but we managed to find one that had all the episodes and cast members, as well as the roles each played. We knew that we wanted a page for episodes and cast for sure and then expanded onto adding a blog like forum with comments since we didn't want the cast list or episode list to be editted or deleted. 

Technologies Used

* React
* PSQL
* Heroku
* Netlify
* Python
* Material UI

Unsolved Problems

We ended up not having time for authentification, which was one of our original stretch goals. After we added the blog, we decided we didn't have enough time for it since it was going to take us over the span of multiple days in order to add user login and tie it to each blog post so that only that certain user could edit and/or delete it. 

The ratings portion was easy to implement but has given us some unsolved problems and perpetual headaches. The ratings in the episode card shows, and fills in down to 1/10 of a percent, but the partial star shows above the rest, not inline. This has something to do with position and centering of parent elements, but we weren't able to unwind the issue

Additionally the ratings and the media picture in the modal, that was difficult to get in, it broke every time until the very end. With a safe navigator (?) we were able to access the api without breaking the whole site, except the ratings still isnt filling out. 

Resource Links

* https://mui.com/ 
* https://www.tvmaze.com/api 
