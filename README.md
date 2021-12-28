Roku devices can be easily controlled via an HTTP API. It is accessed by issuing a **POST** `request` to `http://{device_ip}:8060/keypress/{command}`.

[*NOTE: it must be accessed by IP address only and not hostname due to how Roku handled addressing a DNS Rebinding vulenerability.*][1]

Request URL Examples:
* http://192.168.1.123:8060/keypress/Home // Go to Roku home
* http://192.168.1.123:8060/keypress/LIT_A // Send 'a' character/key
* http://192.168.1.123:8060/keypress/LIT_%40 // Send '&nbsp;' character/key using URL encoding 

Available Commands:
* `Home`
* `Select` // Select or OK
* `Up`
* `Down`
* `Left`
* `Right`
* `Back`
* `Fwd`
* `Rev`
* `Play` // Play and pause
* `InstantReplay`
* `Info` // Info or \*
* `VolumeUp`
* `VolumeDown`
* `VolumeMute`
* `Search`
* `Enter`
* `Lit_{urlencode key/character}` // Send arbitrary keys URL encoded
* `InputSource`
* `Power`
* `Backspace`
* `Game`
* `Sleep`
* `ClosedCaption`
* `PowerOn`
* `PowerOff`
* `InputAV1`
* `InputHDMI1`
* `InputHDMI2`
* `InputHDMI3`
* `InputHDMI4`
* `InputTuner`
* `Partner1` // Netflix
* `Partner2` // Pandora
* `Partner3` // Crackle
* `Partner4` // VUDU
* `Partner5` // NOW TV
* `Partner6` // Roku Channel Store
* `Partner7` // M-GO
* `Partner8` // Amazon Video
* `Partner9` // Blockbuster
* `Partner10` // Rdio
* `Partner11` // CinemaNow
* `Partner12` // Sling TV
* `Partner13` // Hulu
* `Partner14` // Google Play
* `Partner15` // Cinexplex
* `Partner16` // YouTube
* `Partner17` // Sky Store
* `Partner18` // HBO NOW
* `Partner19` // Showtime
* `Partner20` // Red Bull TV
* `Partner21` // Spotify
* `Partner22` // CBS News
* `Partner23` // Cinepolis Klic
* `Partner24` // TED
* `Partner25` // BLIM
* `Partner26` // Playstation Vue
* `Partner27` // VMedia
* `Partner28` // Starz

[1]: https://community.roku.com/t5/Roku-Developer-Program/External-Control-API-suddenly-returns-403-Forbidden/td-p/499344