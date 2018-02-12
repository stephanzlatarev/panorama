
Test changes with:
```
npm run go
```

Deploy changes with:
```
npm run deploy
```

# Production

server.js - server-side logic

compression - allows gzip for express
express - simplified server-side on top of node.js
webpack - bundles source react modules into static assets
babel-core
babel-loader - webpack loader for babel used for translating the source react modules
babel-preset-es2015 - babel-loader plugin to translate ES6 syntax
babel-preset-react - babel-loader plugin to translate JSX syntax
react - react
react-dom - react dom
react-bootstrap - react dom

```
npm install compression --save
npm install express --save
npm install webpack --save
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save
npm install react react-dom react-bootstrap --save
```

# Development

concurrently - starts two scripts - nodemon and webpack - concurrently
nodemon - restarts the server on file changes

```
npm install concurrently --save-dev
npm install nodemon --save-dev

```
