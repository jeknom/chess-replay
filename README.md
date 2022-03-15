# Chess replay

A react app to replay through a game of chess step by step.

## Demo

- Check out the live demo: [https://chess-replay.herokuapp.com/](https://chess-replay.herokuapp.com/)

## Note

- This was built without templates such as create-react-app
- Supports unconventional grid sizes
- Non-standard chess pieces can be used (for visualization set the piece `type` property to your desired string or character)

## Possible improvements

- Animated chess pieces
- Match data validation to check for things like illegal moves
- Improve the setup screen look
- Add sound effects
- Improve layout on smaller screens
- Saving previously replayed matches to local storage and making a system to swap/load them easily
- Optimize so that the whole board does not have to be rerendered with each update
- More tests

## Running locally

1. Remember to install packages with either `yarn install` or `npm install`
2. Run the app in development mode with `yarn run dev` or `npm run dev`
3. You should now be able to find the app at [localhost:3000](http://localhost:3000)

## Usage

When you first open the page, you will be directed to setup. On that page, you will have three options:

1. You can enter a URL from which to fetch the match data
2. You can import JSON directly by clicking the import button
3. You can click on the demo button if you would just like to see what the app looks like

> If you would like to create your own data refer to the [mock file](./mock/mock-game.json) to see the format.

After deciding on which data to use, you will be directed to the replay view. In there, you will have a slider which you can use to slide through all of the moves. Next to the slider, there is a menu button which will open a list of all the moves with extra details.

## Running tests

Make sure you have installed dependencies and then run `yarn run test` or `npm run test`.

## Special thanks

- [All who created the necessary dependencies](./package.json)
- [Cburnett - Chess icons](https://en.wikipedia.org/wiki/User:Cburnett/GFDL_images/Chess)
