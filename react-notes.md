# React Notes

React is a declarative and component-based JavaScript library for building user interfaces. Its declarative and modular nature makes it easy for developers to create and maintain reusable, interactive, and complex user interfaces.

[Testing Links](https://github.com/andrewg.xyz)

## Why use an all JavaScript Stack?

- Consistency across the technology stack
- Takes less time to learn, develop, deploy & extend
- Widely adopted in the industry
- Community support and growth

## Projects I'm making

- Social Media
- E-commerce
- Classroom application
- Expense tracking app
- Media Streaming
- VR Game

## Development Environment

Program versions in the book:

- React: 16
- Yarn: 1.22.4
- Node: 13.12.0
- MongoDB: 4.2.0

### Docker Environment

I need to create an app for each chapter and that interacts with the same MongoDB database. What I ended up deciding on is I'm going to make two containers, one that runs the React front-end and Express back-ends of each app and the other being the MongoDB app. When we switch to a new app, I can just change the volume bind and COPY folder to the new app.

I wanted to use Docker to keep the software consistent with what the books is asking for, since this is a little older than modern day NodeJS e.i. 18

I think for some of this I'm gonna reply on Packt's repo for this book as far as the `package.json` files are concern. Unless there's something in npm that lets me install only versions of modules that are compatible with the version of node I'm on, using the `package.json` files from the repo is my best shot.

Selected: 

- MongoDB: 27017
- Express: 8020
- React: 8040
