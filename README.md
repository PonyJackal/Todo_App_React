# React Todo App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Dependencies

### redux, redux-toolkit

I used Redux to manage global state in this app.
Since this app is quite simple and the state is not so complicated, it is not required.
But just for the sake of future improvements or expand, I used Redux since it is quite stable for enterprise applications.

react-redux or redux-actions would be nice to use, but they require quite much boilerplate code rather than redux-toolkit

For the future requirement to fetch todo notes from the BE using API request, in order to handle API state and caches, etc, I am thinking to use react-query, but redux-saga is still fine.

### react-bootstrap

I used React-Bootstrap for this project, cause it is quite good to use React-Bootstrap for MVPs or Demos,
But this should be updated to more efficient css-in-js approaches like styled component or Tailwildcss

### react-datepicker

## Approaches

### useToggle

I created useToggle hook since there are many part to share toggle/checkbox logic. </br>

```
const useToggle = (initState = false) => {
    const [status, setStatus] = useState(initState)

    const toggle = useCallback(() => {
        setStatus((state) => !state)
    }, [])

    return [status, toggle]
}
```

### useDebounce

I created useDebounce hook in order to make API requests more efficient for future need to fetch todo notes from the backend using API request. </br>

```
const useDebounce = (searchTerm, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, delay])

  return debouncedValue
}

```

## ToDos

### Pagination

Pagination should be implemented in order to manage tons of todo notes.
In this case, filtering and sorting would be implemented in BE and FE just sends query params for that to fetch matched todo notes.

### Tailwindcss or StyledComponent

Tailwindcss or StyledComponent should be implemented rather than react-bootstrap, since they very much flexible to use and customize.

### Unit Test

Unit test using Jest and react-testing-library should be implemented in order to make sure each component works properly.
E2e test using Cypress might be implemented as well.

### Typescript

Typescript would be used for future expand and improvements.

### Google Calendar or Outlook Calendar implementation

Google calendar or Outlook calendar should be implemented to remind the todos

### Jira/Asana/Clickup imeplementation

Jira/Asana/Clickup should be implementented to fetch todo notes from Jira/Asana/Clickup.
