# EX04 - Check-in API and Remote

## Setup

Open the project in a VSCode DevContainer.

### Front-end Setup

1. Open a new terminal, change the working directory to `frontend` and run `npm install`.
2. Run `ng serve` to begin the front-end development server.

### Back-end Setup

1. Open a new terminal, change the working directory to `backend` and run `python3 -m pip install -r requirements.txt`
2. Run `uvicorn main:app --reload` to begin the back-end development server.

### Reverse Proxy

Now that we have two separate servers running on separate ports, we'd like to unify these servers through a reverse proxy such that from the end-user's perspective it "feels like" both servers are running on the same port. 

One other significant benefit of a reverse proxy in this scenario is there are complex security rules at play when a front-end web app attempts to integrate with a server running on a different host or port. We avoid those security concerns by using a reverse proxy that "sits infront" of our development servers for the front-end and backend.

For a reverse proxy, we'll use [Caddy](https://caddyserver.com/), a modern and popular web / proxy server that is easier to configure than former classics such as nginx and Apache.

A `Caddyfile` configuration for EX03 is already established in the project, so all you need to do is:

1. Open a third terminal window and run `caddy start`. You should now be able to browse to `localhost:8080` and see the starter app.

### Mock Data

If you navigate to `http://localhost:8080/docs` you will see the FastAPI docs for the provided starter code. Notice the `POST` route for `/api/reset`. This corresponds to the route in `backend/main.py#reset`, which creates a simple dummy user in the backend system. Try executing this route via the FastAPI docs system. You should see a response of `"OK"`. Next, try using the docs UI to execute the `GET /api/registrations` endpoint. Notice the response includes a single dummy user. Finally, try navigating to <http://localhost:8080/stats> and you should see the dummy user data populating the front-end.

If you've made it this far, congratulations your setup is complete! You are now ready to dig into a guided code review to understand the makeup of the project. For this, refer to Gradescope.