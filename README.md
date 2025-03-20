# HandsOn - Social Volunteering Platform

HandsOn is a community-driven social volunteering platform where users can:

•	Register & Login securely (JWT authentication)

•	Create & Join groups with approval-based requests

•	Post & Interact in groups (text & images)

# Built using Next.js, NestJS, MongoDB, TailwindCSS, and JWT authentication



#Frontend:
- [Next.js](https://nextjs.org/) (React Framework)
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API calls
- [DaisyUI](https://daisyui.com/) for UI components

#Backend:
- [NestJS](https://nestjs.com/) (TypeScript Framework)
- [MongoDB](https://www.mongodb.com/) (Database)
- [JWT Authentication](https://jwt.io/) (User Authentication)
- [Mongoose](https://mongoosejs.com/) (ODM for MongoDB)

# API Endpoints
1] Authentication

Method = Endpoint = Description

POST =	/auth/register = Register a new user

POST =	/auth/login =	Login user (JWT)

2] Users

Method = Endpoint = Description

GET = /users =	Get all users

GET = /users/:id = Get user by ID

3] Groups

Method =	Endpoint =	Description

POST =	/groups =	Create a group

POST =	/groups/:groupId/join-request =	Send join request

POST =	/groups/:groupId/accept-request =	Accept join request (Admin)

POST =	/groups/:groupId/rename =	Rename group (Admin)

DELETE =	/groups/:groupId =	Delete group (Admin)

DELETE =	/groups/:groupId/leave =	Leave group

4] Posts

Method =	Endpoint =	Description

POST =	/posts =	Create a post in a group

GET =	/posts/:groupId =	Get posts for a group

DELETE =	/posts/:postId =	Delete a post

