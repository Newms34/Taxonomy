#Taxonomy Database

##Contents:
 - [Purpose](#purpose)
 - [Installation and Running](#installation-and-running)
 - [Other Features](#other-features)
 - [Remote Version](#remote-version)
 - [Credits](#credits)

##Purpose
This is a simple Taxonomy database app, written to explore the relationship between taxonomic levels. 

##Installation and Running
 1. Run `npm install` and then `bower install` to set everything up.
 2. Start up mongodb.
 3. Start the server with `npm start`.
 4. Your database starts out as empty. Start creating taxa by going to `localhost:8080/new`, and creating a few taxa.

#Other Features
 - I've included a sample taxonomy tree, if you want to use that. To do so, once you've got everything running (see above), run `seed`. 
 - To remove a taxon (and all its child taxa), go to `localhost:8080/remove/myTaxon`, where `myTaxon` is, of course, the name of the taxon you wanna remove. So, for example:
  - `localhost:8080/remove/Animalia` would remove Bilateria, Radiata, Protostomia, Deuterostomia, etc., but would NOT remove Plantae
 - To view the entire taxonomic tree, go to `localhost:8080/tree`.
 - To view a specific sub-tree, go to `localhost:8080/tree/myTaxon`, where `myTaxon` is the taxon you want as the 'root' of your tree.
 - To view the info on a specific taxon, go to `localhost:8080/info/myTaxon`, where `myTaxon` is the taxon you want info on.
 - Finally, to view all taxa in raw, un-organized format, go to `localhost:8080/allTax/`

#Remote Version
There is also a remote version of this app available at davetaxonomy.herokuapp.com. The api methods are the same as for the local version, but just replace `localhost:8080` with `davetaxonomy.herokuapp.com`. Happy taxonomying! 

##Credits:
This was written by yours truly, [David Newman](https://github.com/Newms34)
