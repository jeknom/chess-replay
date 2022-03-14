# Chess replay

A react app to replay through a game of chess step by step.

## Note

- This was built without templates such as create-react-app
- Supports unconventional grid sizes
- Non-standard chess pieces can be used (For visualization set the piece `type` property to your desired string or character)

## Possible improvements

- Animated chess pieces
- Add possibility to copy and paste match data without having to do a GET request
- Match data validation to check for things like illegal moves
- Improve the setup screen look
- Add sound effects
- Improve layout on smaller screens
- Saving previously replayed matches to local storage and making a system to swap/load them easily

## Running locally

1. Remember to install packages with either `yarn install` or `npm install`
2. Run the app in development mode with `yarn run dev` or `npm run dev`
3. You should now be able to find the app at [localhost:3000](http://localhost:3000)

## Usage

When you first open the page, you will be directed to setup. On that page, you will need to copy and paste a URL in which the app can find data for the match you would like to replay. Once you have entered the URL, hit enter or click the arrow button, you will be directed to the replay view.

> If you would like to create your own data and host it somewhere, see the data format in the [mock file](./mock/italian-game-data.json).

In the replay view you will have a slider which you can use to slide through all of the moves. Next to the slider, there is a menu button which will open a list of all the moves with extra details.

## Running tests

Make sure you have installed dependencies and then run `yarn run test` or `npm run test`.

## Special thanks

- [All who created the necessary dependencies](./package.json)
- [Cburnett - Chess icons](https://en.wikipedia.org/wiki/User:Cburnett/GFDL_images/Chess)
