# Amigo Server

### Prerequisites
- Make sure that [Node.js v16.13.0]( https://nodejs.org/en/) is installed on your machine.
- Make sure that you have yarn v1.23 installed, to install just type `npm install --global yarn` in your terminal then type `yarn --version` to check which version do you have. Please let me know if you have trouble installing yarn.
- In Chrome, install [GraphQL Playground](https://chrome.google.com/webstore/detail/graphql-playground-for-ch/kjhjcgclphafojaeeickcokfbhlegecd) in chrome.

### How to run it
- First, type `yarn watch` in the terminal. (Make sure you are in the same directory Amigo/server)
- Second, type `yarn start` in a different terminal window. (Make sure you are in the same directory Amigo/server)
- Head to http://localhost:4000/graphql
- Test it by typing `{hello}` in the playground window. Expect hello world! to be returned.