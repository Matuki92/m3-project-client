# USER STORIES

 - Users can sign up
 - Users can log in
 - Users can log out
 - Users can get a list of the actual beers in stock
 - Users can see the details of a selected beer
 - Users can add beers to favorites
 - Users can rate beers
 - Users can comment beers
 - Admin can add beers
 - Admin can set stock beers visible or hidden
 - Admin can delete beers or remove from stock

--------------------------------------------------

# MODELS

## Beer:
  - name: string
  - Type: string
  - Abv: number
  - Ibu: number
  - Brewery: string
  - Color: string
  - Rating: number
  - Active: boolean
  - Pint price: number
  - Half pint price: number
  - Comments: [objectid] ref: 'comments'

## User:
  - Username: string
  - Password: string
  - Email: string
  - Role: string
  - Favorites: [objectid] ref: 'beers'

## Comment
  - Owner: objectid ref: 'users'
  - Content: string
  - Date: Date

--------------------------------------------------

# APP

## BACKEND ROUTES
 - beers
  - get "/"
  - get ":id"
  - post ":id"
  - put ":id"
  - delete ":id"

 - auth
  - get "/me"
  - post "/login"
  - post "/signup"
  - post "logout"

 - users
  - get ":id"
  - put ":id"
  - delete ":id"

- comments
  - post ":id"
  - delete ":id"

##      Route           /           Page             /          Components                    /          Guard
  -    /beers                       Home                 Beer card, Log in, Sign up                  initAuthGuard
  -  /beers/:id                  Beer detail                 Beer card, Comments                     requireUserGuard
  -   /users/:id                User profile               User card, Beer list                     requireUserGuard
  -   /admin                        Admin               Add beer form*, User list*, Beer list        requireAdminGuard

## Component imports
- Home page
  - Beer service

- Beer detail page
  - Beer service
  - Activated route

- User profile page

- Admin page

- Beer card
  - Input
  - Route

- Log in
  - Router
  - Auth service

- Sign up
  - Router
  - Auth service

- Comments
- User card
- Favorites
- Add beer form
- User list
- Beer list

## Services

  - Beer service
    - getList()
    - getOne(id)
    - add(beer) - Admin
    - update(beer)
    - delete(beer) - Admin

  - User service
    - getList() - Admin
    - getOne(id)
    - update(user)
    - delete(user)

  - Auth service
    - me()
    - login(user)
    - signup(user)
    - logout()
    - getuser()

  - Comment service
    - add(comment)
    - delete(comment)

--------------------------------------------------
## FIX

- user feedback (navigating to routes)
- beer list grid max items (switch to grid)
- backend errors
- admin not delete yourself


# BACKLOG

- Admin page - user search
- Admin page - beer search
- Profile - edit info
- Profile - delete account
- Send email when a beer is available
