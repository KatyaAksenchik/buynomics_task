# NOTE:

There are a lot of things that I would update and add such as:

    - set up linter (add more rules)
    - set up and add tests (jest + react-testing-library)
    - add Redux (because redux bring some boilerplate code I decided not to add it right now )
    - add reselect for redux selectors 
    - possibly add literals handling with react-i18next lib
    - add mobile version for application
    - try to use hook for requests

The structure of project is:

    - assets -> where all fonts and images supposed to be stored
    - common -> components that are specific for the project and can be used in different views
    - components -> simple components 
    - constants
    - containers -> this is where I would keep redux selectors, actions
    - initialisation -> setup redux/ setup routes/ maybe some middleware
    - literals -> where I would store translations
    - service
    - types -> store types that can be used among application
    - utils -> some helper function
    - views -> pages/sections that contain different components
