# animist

Animist is a Typescript Library which makes interacting with the 
AniList Api simple.

### Installation
If using yarn,
```sh
$ yarn add animist --save
```
If using npm,
```sh
$ npm install animist --save
```
To use the library you will need to create an AniList client by logging
into your AniList account and going to the [developer settings][developer]
and creating a client to obtain your client id and secret.
### Examples
Retrieve an array of anime data using the passed params:
```typescript
import Animist from "animist";
 
const animist = new Animist(process.env.ID, process.env.SECRET);
 
(async () => {
  let response;
  
  try {
    response = await animist.get("browse/anime", {
      airing_data: true,
      full_page: true,
      season: "winter",
      sort: "popularity-desc",
      status: "finished airing",
      type: 'TV',
      });
  } catch (e) {
    // Handle error with request
    
    console.log('Err getting anime data', e);
    return
  }
  // Do something with the returned response
  
  console.log(response);
})();
```
Available params can be found on [AniLists Documentation Website][anilist].

### License
This project is [licensed under ISC][license].

[anilist]: http://anilist-api.readthedocs.io/en/latest/index.html
[developer]: https://anilist.co/settings/developer
[license]: https://github.com/hsiW/animist.ts/blob/master/LICENSE
