# INTRODUCTION 😁
**ASAD** is an Open Source project to share one song a day with family and loved ones online. It stands for ***A Song A Day***. 🎧🎷🎵🎼🎹🎷🎺🎸📻🎙🎻

## HISTORY 🧾
I've ran a daily song sharing WhatsApp broadcast list titled (A SONG A DAY) for years with family and friends. Basically what I do is share one song I think everyone should hear but haven't or so I think. The rule is it must not be a popular song. Since I make use of Spotify, I decided to create something similar online using their API.

## THE RESULT 🌐
The webpage of the completed website can be found [here](https://my-asad.netlify.app). I kept things really simple. Feel free to go crazy with your own design.
![alt desktop](/public/asad-desktop.PNG)
![alt mobile](/public/asad-mobile.PNG)

## HOW IT WORKS ❓
I add a song to the playlist and that song becomes the song of the day. It has to be just one song a day because the API manipulation only outputs one song and it is the last song added. This means that any song added for the day becomes the last song and thus is the song for that day. Of course adding multiple songs works but it defeats the purpose since you can only get the latest song added.

## STEPS TO RECREATE 🔁
1. Fork and Clone this repo.
2. run `npm i` to install all the dependencies.
3. When it's done, run `npm run dev`.
4. After you're done, open developer.spotify.com and create an account if you don't have one already. If you do, just log in. Free or Premium account is fine. It doesn't matter.
5. Create an app using the **Create app** button and give it a name.
6. This app comes with the `CLIENT ID` and `CLIENT SECRET` which can be found in the **settings** of the app.
7. In the root folder of your project, create a file named `.env` and add these three digits:

```
- VITE_CLIENT_ID=329829845jhshfshfoi242
- VITE_CLIENT_SECRET=173824nhbjfgbjfska9234
- VITE_PLAYLIST_ID=872134jh4jh3d93k4
```

**NOTE:** *Replace the values of each variable with your own values found in number 6. The values here are just for demonstration purposes. Also make sure this file is added in your .gitignore file so it is not pushed to Github. It contains sensitive information and should not be pushed to production*

8. The `VITE_PLAYLIST_ID` is the url of the playlist you want to work with.

For instance, if your playlist url is `https://open.spotify.com/playlist/fgapotnatquiOLafmqterraxc`, then your Playlist ID is `fgapotnatquiOLafmqterraxc`.

9. After you're done, run your server if you've not already done that and your playlist should start working.

### CAN I CONTRIBUTE? 👊
I am totally open to contributions. These are some of the areas I feel can be improved on:
- The preview music player which is the default audio html tag. I would love for that to change.
- Would love the track image to spin on play and stop on pause.
- Design changes are also appreciated.

### Bugs? 🐜
If you notice a bug during development or in production, do well to submit an issue or chat me up on Twitter on [iMrVoN](https://twitter.com/imrvon).