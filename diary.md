# Diary

Writing what I did and decided.

## Day 1. Jun 19.

* Set up project with Next.js and TypeScript. But as 8.1.0 doesn't have `d.ts` files. So, I decided to use 8.1.1-canary version.

## Day 2. Jun 20.

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

## Day 3. Jun 21.

* Choose an image for the hero area. [this](https://unsplash.com/photos/iIAjbjXsVt4)
* Responsive UI for the header.
* [Prisma vs. Mongoose vs. Sequelize](https://www.npmtrends.com/mongoose-vs-prisma-vs-sequelize). Decided to use Mongoose. Because it's more popular. 
* Got interested in logging application. So I read [this article](https://stackify.com/microservice-logging/).
* Begin with Monolith. Because I don't know much about docker and kubernetes. But I want to refactor it to microservices some day. 
* Set up backend and users module. 
  - Learned that it is better to create module first and others later. 
  - When using mongoose and @InjectModel. The name you used in @InjectModel and forFeature should be same. If not, you'll see a message like  " Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument at index [0] is available in the UsersModule context.". 
* When you use `type` as argument, you'll see "The type of Mutation must be Input" error message. 

## Day 4. Jun 22.

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
