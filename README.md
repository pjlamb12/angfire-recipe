angular-firebase — a seed for AngularFire apps

This project is an application skeleton for a typical [AngularFire](http://angularfire.com/) web app.
This library allows you to quickly bootstrap real-time apps using [Firebase](http://www.firebase.com) and [AngularJS](http://www.angularjs.org).

The seed contains AngularJS libraries, test libraries and a bunch of scripts all preconfigured for
instant web development gratification. Just clone the repo (or download the zip/tarball), start up
our (or yours) webserver and you are ready to develop and test your application.

The seed app doesn't do much, just shows how to wire controllers and views together and persist them
in Firebase. You can check it out by opening app/index.html in your browser (might not work
file `file://` scheme in certain browsers, see note below).

_Note: While angular, angularFire, and Firebase can be used client-side-only, and it's possible to create
apps that don't require a backend server at all, we recommend hosting the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`._


## How to use angular-firebase

 1. Clone the angular-firebase repository
 1. Open app/js/config.js and add your Firebase URL
 1. Go to your Firebase URL and enable email/password authentication under the Auth tab
 1. Start hacking...

### Serving pages during development

Make sure you have `node` installed, then run `node install`. After installation, run `node start` and you're ready to go.

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.


### Running the app in production

Make sure you set up security rules for your Firebase! An example for this
seed can be found in `config/security-rules.json`

Go to your Forge (open your Firebase URL in the browser) and add your sites domain name under
Auth -> Authorized Request Origins. This allows simple login to work from your web site as well as localhost.

The rest really depends on how complex is your app and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `app/` directory.
Everything else can be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere, where they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and a webserver(s).

## Contact

More information on AngularFire: http://angularfire.com
More information on Firebase: http://firebase.com
More information on AngularJS: http://angularjs.org/

