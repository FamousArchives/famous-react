__This project is still under active development, and should not be considered production ready.__

famous-react
============

Famous-React provides a bridge between Famous and React. The API is extremely unstable currently as things are still being fleshed out.

A few implementation details so far:

- All DOM events run through react's bubbling system
- The tick from famo.us is used to batch React updates
- Any famo.us nodes manage their own DOM fragments
  - React won't touch the DOM elements, besides adding data-reactid to make eventing and refs work
    - React could be monkeypatched to take famo.us events to prevent the extra attribute if needed
  - famo.us nodes will act just like React components, so you shouldn't notice any difference API-wise