# node-lightarray-relay

Remote web application->node-lightarray, for sequencing the LightArray installation from a publicly-accessible web address.

## Synchronization

Start with a 100ms buffer from Ableton Live (negative offset of 100ms for relay)

Relay server sends a timestamp with each frame.

On WebSocket frame message:

Client compares local timestamp to the timestamp in the frame.
delta = frame timestamp - local timestamp
Set a timeout to play the frame in (100ms - delta) ms.


### License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
