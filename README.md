# Cookie editor for mobile and tablet devices

This is a simple and limited developer tool for editing cookies on smartphones and tablets. Distributed as a bookmarklet as this is the only way to have an external browser tool for Android and iOS browsers.

## Limitations

The tool uses the {{document.cookie}} getter/setter for all its interactions with cookies. This API is limited due to browser security reasons - e.g. much more limited than browser extensions.

## Functionality

- Appears as a modal overlay
- Displays current cookies (name:value)
- Delete a cookie
- Update a cookie's value
- Advanced cookie data (domain, path, expiration, httpOnly)
- Create a new cookie
