# ☕️ Fresh cup o' joe

When you need that fresh cup of joe in the morning...

## Goal

Build an auto-updating twitter-like feed.

## Feature Requirements

I want to run an auto-updating twitter-like feed. Here is a rough mockup of the
expected UI.

![mockup][mockup]

1. The app should show the latest tweets after the first request
1. The list of tweets should update automatically every two seconds
1. The older tweets must be pushed down in the page
1. The newer tweets should come at the top
1. There should be no duplicate tweets on the page
1. There should be no skipped or missed tweets on the page
1. In case of any failure conditions, the tweet updates can pause or stop but
   should resume as soon as possible and no error messages should be shown to the
   user

## Extra Credit

1. The app should stop refreshing as soon as the user scrolls down
1. The app should resume refreshing as soon as the user is back at the top
1. The app should fetch older tweets when the user reaches the bottom

## API Specification

### API Info

1. The API returns a JSON response and supports CORS
1. The JSON response contains the username, id, timestamp, image and text
1. The API is designed to fail randomly with HTTP 50X errors
   (e.g. 500, 503 etc.) and you must handle this in your code. If it fails just
   try to fetch the updates again.

### API Endpoints

```txt
/api/tweets
```

Returns all tweets.

```txt
/api/reset
```

Regenerates all fake tweets.

## Technical Requirements

1. You don’t need to focus on the UI too much, a barebones version will do just
   fine
1. You can choose any technology stack you are comfortable with
1. Please don’t make any additional efforts on writing tests etc
1. We will be reviewing your code on the following criteria:
   1. Architecture decisions made
   1. Readability of your code
   1. Handling of edge cases, performance issues, including request efficiency
      and stability of the web app

## Running the app

```sh
# Build
docker compose build

# Start
docker compose up -d

# Shut down
docker compose down -v
```

The app will be available at <http://localhost:3001> or <http://localhost:1234>
if you're updating the frontend.

<!-- References -->

[mockup]: ./src/img/twitter-interview-feed.png
