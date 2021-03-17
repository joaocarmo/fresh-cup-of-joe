# ☕️ Fresh cup o' joe

When you need that fresh cup of joe in the morning...

## Goal

Build an auto-updating twitter-like feed.

## Feature Requirements

I want to run an auto-updating twitter-like feed. Here is a rough mockup of the expected UI.

![mockup][mockup]

1. The app should show the latest tweets after the first request
1. The list of tweets should update automatically every two seconds
1. The older tweets must be pushed down in the page
1. The newer tweets should come at the top
1. There should be no duplicate tweets on the page
1. There should be no skipped or missed tweets on the page
1. In case of any failure conditions, the tweet updates can pause or stop but should resume as soon as possible and no error messages should be shown to the user

## API Specification

We have a virtual Twitter server hosted on
[bumble-twitter-interview.herokuapp.com/joao-carmo][backend].

### API Info

1. There are several API endpoints at your disposal. You have to pick the most suitable one for your architecture decisions.
1. The API returns a JSON response and supports CORS
1. The JSON response contains the username, id, timestamp, image and text
1. The tweets will max out after 10,000 entries. After which you need to reset the database.
1. The API is designed to fail randomly with HTTP 50X errors (e.g. 500, 503 etc.) and you must handle this in your code. If it fails just try to fetch the updates again.
1. The server responses are always sorted with latest id on top
1. The API parameter count is optional (defaults to 20) and can be between 1 and 50

### API Endpoints

```txt
/api?count=X
```

Returns the latest X tweets

```txt
/api?count=X&afterId=ID
```

Returns X tweets created after the id ID

```txt
/api?count=X&beforeId=ID
```

Returns X tweets created before the id ID

```txt
/api?count=X&id=ID&direction=(-1 OR 1)
```

Returns X tweets with the ID and the direction in time (-1 for past, 1 for future)

```txt
/api?count=X&afterTime=TS
```

Returns X tweets created after the timestamp TS

```txt
/api?count=X&beforeTime=TS
```

Returns X tweets created before the timestamp TS

```txt
/api?count=X&time=TS&direction=(-1 OR 1)
```

Returns X tweets with timestamp TS and the direction in time (-1 for past, 1 for future)

```txt
/reset
```

This resets the database back to 100 entries. You can use it for your testing purposes.

## Technical Requirements

1. Host your code on [codesandbox.io][codesandbox] as this will allow us to easily review and run your solution
1. You don’t need to focus on the UI too much, a barebones version will do just fine
1. You can choose any technology stack you are comfortable with
1. Please don’t make any additional efforts on writing tests etc
1. We will be reviewing your code on the following criteria:
   1. Architecture decisions made
   1. Readability of your code
   1. Handling of edge cases, performance issues, including request efficiency and stability of the web app

## Bypass CORS

```sh
npm install -g local-cors-proxy
```

```sh
lcp --proxyUrl https://bumble-twitter-interview.herokuapp.com/joao-carmo
```

```js
fetch('http://localhost:8010/proxy/api')
```

<!-- References -->

[mockup]: ./src/img/twitter-interview-feed.png
[backend]: https://bumble-twitter-interview.herokuapp.com/joao-carmo
[codesandbox]: https://codesandbox.io
