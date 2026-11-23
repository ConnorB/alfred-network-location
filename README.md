
Network Location workflow for Alfred
====================================

View and change your network location from [Alfred][alfred].

Forked from [deanishe/alfred-network-location][upstream] and updated for Alfred 6.

![][screenshot]


## Installation ##

Grab the latest version from the [releases page][releases].

Requires Alfred 6 with the Powerpack, and macOS 12 or later. It has no dependencies (no Python needed).

**Note:** Older versions need Python 2, which macOS no longer includes. For Alfred 3/4, use [v2.0][v2.0]. For Alfred 2, use [v1.0][v1.0].


## Usage ##

- `netloc [<query>]` — Show list of network locations filtered by `<query>` if one is specified
	+ `↩` — Activate selected network location
	+ `⌘+↩` — Open Network Settings


## Licence ##

This workflow is released under the [MIT Licence][mit].


## Changelog ##

- v3.0 — 2026-11-23
    - Support Alfred 6 and current macOS
    - Rewrite in JavaScript for Automation; drop Python 2 and the bundled Alfred-Workflow library
    - Alfred now filters results itself
    - List the active location last
    - `⌘+↩` opens System Settings › Network
    - Remove the built-in updater
- [v2.0][v2.0] — 2018-03-31
    - Add built-in update mechanism
    - Use `scselect` instead of `networksetup` (no need to enter password)
    - Smarter caching
- [v1.0][v1.0] — 2014-06-18
    - Initial release


[alfred]: https://www.alfredapp.com/
[v1.0]: https://github.com/deanishe/alfred-network-location/releases/tag/v1.0
[v2.0]: https://github.com/deanishe/alfred-network-location/releases/tag/v2.0
[releases]: https://github.com/ConnorB/alfred-network-location/releases
[screenshot]: https://raw.githubusercontent.com/ConnorB/alfred-network-location/master/screenshot.png
[upstream]: https://github.com/deanishe/alfred-network-location
[mit]: http://opensource.org/licenses/MIT
