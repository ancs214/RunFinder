#Run and Chug Finder

##Run and Chug Finder is a website designed for users to locate race events such as marathons, half- marathons, 5ks and other race events in a specified city- as well providing info on nearby brewers in that area- users may be thirsty after a run!

###Run and Chug Finder is an html based projected that utilizes BULMA CSS framework, and third-party APIs; RunSignUp and Open Brewery DB.
API links
https://runsignup.com/API
https://www.openbrewerydb.org/

BULMA CSS framework was selected for this project because of the simplicity of syntax and responsive design elements.
The third-party API used in this projected were selected not only to support the intended concept of this project, but also because of the compatibility between these two APIs; in that they have similar parameters, which allows a user to search one a single query and be returned coherent results from both APIs.
Some of the difficulties encountered by our team on this project was finding third party APIs that had similar documentation to facilitate the results we wanted while maintaining clean and straight forward code.

Additionally while using our RunSignUp API we discovered it was necessary to gain temporary access to CORS demo server.
https://cors-anywhere.herokuapp.com/corsdemo

One of our original concepts was to include a weather forecast for queried race results, however we realized that as weather forecast info wasn’t available for future events, it was conceptually inappropriate.
