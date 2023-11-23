# MERN Skeleton

## OMG MongoDB why?!?!

Took a bit of time but I finally got the MongoDB container working for the project. Needed to create the root user and the project database for it to start connecting to the DB.

## Server-side Express

A lot of things in this chapter were very similar to the simple setup chapter, but now we've added more routes and created data models with `mongoose` the MongoDB client for NodeJS. 

I had a big of trouble setting things up similarly with MongoDB is getting the Node container setup right, but once I got that set, I implemented most of the routes and Express stuff.

I'm more or less understanding what is going on to get the server up and running. Created the CRUD endpoints for Users and Authentication which used `express-jwt` for the JWT implementation. So from what I'm getting, Nodemon makes that it recompiles with Webpack every time the related files are written, then Webpack uses Babel to convert the ES6 code to transpile to compatible code for node.

Now we have a functional Express server to move to the actual React work.

## Dipping my toes into React

Alright what is kinda bugging me about this book is the code examples on the page don't correlate with what's on the Git repo. And it's starting to bug me.

But what I am kinda understanding as far as the structure fore React 16 app is you have your `main.js` file which contains the logic for rendering your `App` file either on its own or through server-rendering with hydration. 

And components themselves I've decided to stick with the functional format:

```javascript
// Include prop if you wanna use is
export default ComponentName (prop) {
  // Create internal state for your data
  const [data, setData] = useState({})
  
  // If you're doing anything that updates
  useEffect(() => {
    ...
  })
  
  // anything is between is for internal logic and functions
  
  // The HTML template
  return (...)
}
```

And the routing seems straight forward

