# Diary

Writing what I did and decided.

## Day 1. Wed, Jun 19.

* Set up project with Next.js and TypeScript. But as 8.1.0 doesn't have `d.ts` files. So, I decided to use 8.1.1-canary version.

## Day 2. Thu, Jun 20.

* Set up basic pages. 
* Decided to use other designs for the main page. 
  - Header and hero area with [Divisima](https://colorlib.com/preview/#divisima)
  - Items [Minishop](https://colorlib.com/preview/#minishop)
  - Subtitle [Modist](https://colorlib.com/preview/#modist)
  - Deal of the Month [Minishop]
  - Testimonial [Minishop]
  - Footer: Minishop + Divisima
* Decided not to use material-ui. The bundle is too big. [size](https://bundlephobia.com/result?p=@material-ui/styles@4.1.1). Compare [emotion's size](https://bundlephobia.com/result?p=@emotion/styled@10.0.12)
* Decided to use name beanovia. Got it from namelix.com.
* Made logo with brankmark.io.
* Created `Theme` type and applied it to my theme. 
* Applied Normalize.css by creating Normalize.tsx. 
* Designed Nav, Header.
* Applied NProgress.

## Day 3. Fri, Jun 21.

* Choose an image for the hero area. [this](https://unsplash.com/photos/iIAjbjXsVt4)
* Responsive UI for the header.
* [Prisma vs. Mongoose vs. Sequelize](https://www.npmtrends.com/mongoose-vs-prisma-vs-sequelize). Decided to use Mongoose. Because it's more popular. 
* Got interested in logging application. So I read [this article](https://stackify.com/microservice-logging/).
* Begin with Monolith. Because I don't know much about docker and kubernetes. But I want to refactor it to microservices some day. 
* Set up backend and users module. 
  - Learned that it is better to create module first and others later. 
  - When using mongoose and @InjectModel. The name you used in @InjectModel and forFeature should be same. If not, you'll see a message like  " Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument at index [0] is available in the UsersModule context.". 
* When you use `type` as argument, you'll see "The type of Mutation must be Input" error message. 

## Day 4. Sat, Jun 22.

* Planned to implement next module: Client GraphQL
```markdown
Do not think about other possibilities like online-course shop. Focus on making clothing shop. 

Module Scope 

* GraphQL Client. 
* admin package and CRUD products. 
* Show products on frontend

Dashboard items

* KPIs -> yesterday. Revenue. Orders. New customer. 
* KPI graphs
* Activities

Admin Product CRUD

* Create: Products page -> Add new
* Update: Products page -> Click item
* Fill content: Name, description. availability. stock. images. size, images.
* Delete: don't delete it. Archive it. Only delete it if there is no order of this item. 

Editor design

* Left
  - Name
  - Images
  - Description
* Right
  - Update / State (Draft, Public, Unlisted, Archive)
  - Options: Color, Size, Availability.

First Goal: Big Example. 
```
* Created `d.ts` files for `graphql-react` and `next-graphql-react`. Interestingly, if there is no `@types`, you must simply write module without `import`s. If you add them, it doesn't work. 
* Set up code `admin` app with create-react-app and basic pages. 

# Jun 23

* Installed some libraries. As it's Sunday and I went to church, I didn't count this day. 

# Day 5. Mon, Jun 24.

* Decided to create theme repo. Because theme values are used in both admin and frontend. 
  - `create-react-app` doesn't allow compilation outside 'src' file. So, I had to find way to transpile `.ts` files in theme repo. 
  - So, I had to use Visual Studio Code Build system. `Ctrl + Shift + B`
  - And set up my tsconfig.json. Copied create-react-app tsconfig.json and changed noEmit -> false, outDir -> "./dist", declaration -> "true" and removed "allowJs" and "isolatedModule". 
  - But it constantly showed an error: "JSX element type 'Flexbox' does not have any construct or call signatures." It is solved simply by adding react and @types/react to themes. 
* `create-react-app` [doesn't support `dart-sass` yet](https://github.com/facebook/create-react-app/issues/5282). Currently, [dart-sass](https://sass-lang.com/dart-sass) is the primary implementation of SASS. So, I wanted to use it rather than `node-sass`. So, I used yarn's alias feature like `yarn add node-sass@npm:sass`.
  - But the default package manager of lerna is `npm`. So, when I tried to add internal repo, it showed me `Invalid dependency type requested: alias` message. So, I added `"npmClient": "yarn",` to `lerna.json`. 

 # Day 6. Tue, Jun 25.

* Using [lighten-color](https://pinetools.com/lighten-color) and [darken-color](https://pinetools.com/darken-color) pages to define colors. 
   - It's a useful idea to define light and dark color of each color in theme. 
* [Box shadow tool](https://www.cssmatic.com/box-shadow) to create box shadow for buttons. 
* Followed [tutorial](https://gist.github.com/rimatla/a5a2c5dcf831c5744a656cfe81fadf52) and set up tslint to all packages. 
  - When tslint doesn't work properly, 1) type lint command and check if it works correctly, 2) close and reopen VS Code. 
* `yarn upgrade --latest` updates package.json file. 
* Added basic table skeleton. 

# Day 7. Wed, Jun 26.

* Designed product list page. 

# Day 8. Thu, Jun 27.

* Trying to make add product page. 

# Day 9. Fri, Jun 28. 

* Decided to write every idea in my head. Ideas became like a ball of spaghetti. So, I decided to solve that ball. 
* Trying to add [react-color](https://casesandberg.github.io/react-color).

# Day 10. Sat, Jun 29.

* Met `jsx-no-lambda` lint. Workaround is [here](https://stackoverflow.com/questions/54983582/react-hooks-and-jsx-no-lambda-warning). Use `useCallback`. 

# Jun 30

* Copied code from `react-color`. 
* Tried to learn how popover menu works with http://jsfiddle.net/LPbhS/. 
* I don't count Sundays. 

# Day 11. Mon, July 1.

* I was wondering how `react-color` example detects click outside the component. And I finally learned that it creates `fixed` transparent div that covers the entire screen. And when that transparent cover is clicked, the things are done. 
* Now, I have to choose one. Ref vs. transparent cover. 
  - Transparent cover
    + Pro: Simple to implement. 
    + Con: Mouse pointer and other things don't work. Should click twice. 
  - Ref -> Follow this way. 
    + Pro: Other things work properly. 
    + Con: A bit complicated. 

# Day 12. Tue, July 2. 

* I was wondering how to generate event handlers with certain values. So, I was reading `useMemo` and others. But I found some interesting articles. 
  - [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
  - [Are Hooks slow because of creating functions in render](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)
  - [React, Inline Functions, and Performance](https://reacttraining.com/blog/react-inline-functions-and-performance/)
  - [AHA programming](https://kentcdodds.com/blog/aha-programming)
  - [The Wrong Abstraction](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
* After I read them, I decided to turn off `jsx-no-lambda` option. This option makes code hard to read. 
  - And it seems that this option came from [here](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md). And `bind` performance is better in modern browsers. 
* Checked [FileBird](https://codecanyon.net/item/media-folders-manager-for-wordpress/21715379?ref=cirvitis) for Media manager for my project. [Another manager](https://volunteers.joomla.org/teams/new-media-manager-team/reports/479-media-manager-status-meeting-30-3-2017) Checked [WordPress.com design](https://wordpress.com)

# Day 13. Wed, July 3.

* Created editablediv for color names. 
* In TypeScript + React, there are 2 Event types with the same name: KeyboardEvent. One came from default TypeScript, and the other came from React. When writing JSX, we need to use React version. 
  - To do that, write `import React, { KeyboardEvent } from 'react'`. 
* You cannot access `event.target.value` by default in TypeScript + React. You need to set event type like `ChangeEvent<HTMLInputElement>`. `ChangeEvent` exists in `'react'` package. 
* I learned that tslint will be deprecated in 2019. So, I need to migrate to eslint. [Here's how](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb).

# Day 14. Thu, July 4. 

* There was an interesting bug. `useReducer` was called twice for each dispatch. 
* To understand why it happened, I googled it and found interesting answers. 
  - [useReducer Action dispatched twice](https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice)
  - [React useReducer Hook fires twice / how to pass props to reducer?](https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer)
* The answer was that when you pass a lambda as an argument to `useReducer`, it is sometimes called twice. Because the reference to the reducer function is changed. 
  - To solve that problem, we need to create consistent reference of the reducer function. 
  - In many cases, it can be solved by moving reducer function out of the function component. That's why the reducer function is outside the component in [the official example](https://reactjs.org/docs/hooks-reference.html#usereducer).
* But in my case, it was impossible, because reducer was calling `onChange` from the parent. So, I had to use `useCallback` to create reducer and pass `onChange` in an array. 
  - But it didn't solve the problem because `onChange` also changes because `onChange` is also a lambda function. So, I used `useCallback` for `onChange`, too. 
  - Finally, the action was fired only once. 
  - (To see the code for these, check /admin/components/editor/index.tsx and ColorEditor.tsx)
* When you use a component that manipulates `className` inside with emotion styled, emotion won't append style at the back of `className` list. 
  - Usually, it's a good solution to just ignore that component and cover it with a new `div` component. 
* When I was writing code for `react-dnd`, I met 'Uncaught Invariant Violation: Expected to find a valid target.' error. To find the cause of this problem, I copied the [`Sortable`](http://react-dnd.github.io/react-dnd/examples/sortable/simple) example code and experimented things. 
  - I found that this error is shown when I change `immutability-helper` code to `splice` function like below:
    ```js
    // from 
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          }),
        )
      },
      [cards],
    )

    // to 
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          cards.splice(dragIndex, 1).splice(hoverIndex, 0, dragCard)
        )
      },
      [cards],
    )
    ```
  - Because of this, I got interested in immutable libraries. Actually, I used [Immutable.js](https://immutable-js.github.io/immutable-js/) in 2015 or 2016. But I didn't like it. I had to memorize APIs and it wasn't natural JavaScript. 
  - When I was reading [React official immutability helper](https://reactjs.org/docs/update.html) and [immutability helper README](https://github.com/kolodny/immutability-helper), I learned that there are many alternatives to `immutable.js` like [immer](https://github.com/immerjs/immer), [immutability-helper](https://github.com/kolodny/immutability-helper) and [seamless-immutable](https://github.com/rtfeldman/seamless-immutable).
  - After reading sample codes, I decided to use `immer`. Because `immer` has the biggest number of stars only next to `immutable.js`. But `immer` came out in 2018. Compared to 2015 of `immutable.js`, it's really rapid increase. In npmtrend, we can find that `immer` is following `immutable.js`. And I also loved the philosophy behind immer: 
  - [immutability with] plain, native JavaScript data structures (arrays and objects) without further needing any library.

