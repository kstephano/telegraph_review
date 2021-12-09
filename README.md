## Installation & Usage
# Installation
Clone or download the repo.

# Usage
Open terminal and run bash _scripts/start.sh. This will run docker and install the required dependencies
Run bash _scripts/stop.sh to stop the docker.
Run bash _scripts/teardown.sh to remove the working containers.

# Buildlog

DB - Produced a postgres database for articles with the required fields

Server - Made the required routes available so that the correct inforamtion could be pulled from the server and inserted into the database

Client - Made an index CSS that included a form to insert data into the database. Depending on the url the page will either produce a form or article. To get a form end the url in index.html. To get a article add (for example)#spiderman-12-08-51 to the index.html.

# Bugs

Had issues with the post (for three hours). Should have been headers not headers. Was working on REST client extension which caused the confusion.

Were not able to get the path produced without the adding the /index.html#. Ideally would like the page to render solely on /spiderman-12-08-51 for example.

## Wins & Challenges
# Wins
Managed to fulfill all the criteria laid out in the assignment
Managed to get all routes working on server side. Post, Edit, Get and Delete

# Challenges
Figuring out how to do show path. Eventually found a way but not the way we wished for it to be.