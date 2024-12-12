nothing yet to note 
I learned some vim commands for fun never have I ever usedd the insert key so often, use Esc to return to command line, 
command codes can be combined q is quit w is write


command for deploy script is ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon

Useful CSS

grid layouts parse best for me with defined row locations and column locations, the tag based sytems don't scan the way Id expect them to

font import template
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet">

bootstrap import statement
          <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous"
      />

'#'** - indicates id
.** - indicates class
** html element

border-radius: makes nice beveled edges

<ed> new line command within elements

react and vite:

basic index.html included here wil work with most things but change the metadata for the site

index.jsx should also work with most things, it acts as the root for the app component

the app component handles routing to any existing pages

individual pages have html and basic scripting combined into .jsx files, subcomponents of pages can have their own files as well
.css files are usually still included 

services are easy to deploy capsules of server functionality allowing for server-side storage that can be distributedd to multiple users

services each need their wn configuration settings to run properly

if at all possible make your port number an environment variable

## Run npm init on the service you fool!
for raw code, the occasional .js file is handy to keep complicated operations away from complicated rendering


components on every page go into app.jsx and are styled with app.css
