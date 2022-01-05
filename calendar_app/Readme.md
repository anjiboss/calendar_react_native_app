# Installation

1. Clone the Repo
2. `yarn`or `npm install`
3. `yarn start`

# Editting

_Src/Components/NavigationBar_
Change the Route Name here

_Src/Components/Layout_
Change The App Layout

## Adding New Route

1. Add Is name in types/route.d.ts first
2. Add FC
3. Add Props in `Router/Router.tsx`
4. Add into Conditional Render in `Router/Router.tsx`
   ```javascript
   		route === "NewRoute" ? (<NewRoute />)
   ```
   _Note_: Recommend to put _HomeRoute_ in else statement
 
