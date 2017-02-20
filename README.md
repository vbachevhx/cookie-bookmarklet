# Cookie editor for mobile and tablet devices

This is a simple and limited developer tool for editing cookies on smartphones and tablets. Distributed as a bookmarklet as this is the only way to have an external browser tool for Android and iOS browsers.

## Limitations

The tool uses the {{document.cookie}} getter/setter for all its interactions with cookies. This API is limited due to browser security reasons - e.g. much more limited than browser extensions.

Known limitations:

- It cannot read cookie data other than name and value (no way of knowing about its path, domain or expiration)
- It cannot edit HttpOnly/secure cookies
- When editing a cookie it's expiration will, by default, be changed to `session` - it will get deleted when the browser is closed
- Editing/deleting may not work if the cookie's domain or path is not matched by the tool's command

## Features

- Appears as a modal overlay
- Displays current cookies (name:value)
- Deletes a cookie
- Updates a cookie's value
- :x: Advanced cookie data (domain, path, expiration, httpOnly)
- :x: Create a new cookie
- :x: Delete all cookies
- :x: Full unicode support
- :x: Path/domain based deleting?
