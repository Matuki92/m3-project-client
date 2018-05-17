# TAPMAN

### Tapman is a web application that shows a restaurant/pub's current list of craft beers in stock. Developed and designed by Matias during Ironhack webdev bootcamp 03/2018.

# USER STORIES

 - Users can sign up
 - Users can log in
 - Users can log out
 - Users can get a list of the actual beers in stock
 - Users can see the details of a selected beer
 - Users can comment beers
 - Users can add beers to favorites
 - Admin can add beers
 - Admin can set beers visible or hidden
 - Admin can delete beers and users

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
  - get "/" (get all the beers
  - get "/active" (get only active:true status)
  - get "/:id" (get one)
  - post "/add" (creates new beer)
  - post "/comments/add" (adds new comment to beer)
  - put "/edit" (edits one beer)
  - delete "/:id" (deletes one beer)

 - auth
  - get "/me" (gets user)
  - post "/login"
  - post "/signup"
  - post "logout"

 - users
  - get "/" (gets list of users)
  - get "/me" (gets one user)
  - post "/me/favorites" (adds beer to user's favorites)
  - put "/:id" (edits one user)
  - delete "/me/favorites/:beerId" (removes beer from user's favorites)
  - delete "/:id" (delete one user)

- comments
  - get "/user/:id" (gets comments owned by user)
  - delete ":id" (deletes one comment)

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
- beer list grid max items (or switch to css grid)
- backend errors
- css (no consistency at all)


# BACKLOG

- Admin page - user search
- Admin page - beer search
- Profile - edit info
- Profile - delete account
- Send email when a beer is available
- Users - rate beers
