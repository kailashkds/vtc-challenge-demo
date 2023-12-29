## VTC Challenge Answer

I have update the Docker just use one command given bellow and everything will work out of box

`docker-compose up -d`

Run: `http://localhost:81/` and start browsing it.

Email are saved in file as requested. In order to reach there execute below commands or you can also use IDE for it.

`docker-exec -it {container-name} bash`

`cd /var/www/html/var/email`

`cat {emailaddress}.txt`

**I am sorry I cound not complete it in 24 hours becuase there was some ugent deliveries and I had to focus on that as it year end.** 

# Welcome to VTC Challenge

This challenge is created to test your knowledge of creating Symfony Applications with SPA Frontend build using ReactJS.
In order to start working your solution, please clone this repository and create a copy under your namespace. 
Consider also to change name of your project to make it harder to find your solution by other competitors.

**DO NOT FORK THIS REPOSITORY, THIS WILL ALLOW OTHERS TO COPY YOUR SOLUTION**

## Challenge

Based on this bare-bones application create a service that will allow:
* registration of a user
* confirming account by clicking a link from email. (no need to send actual email, email can be persisted as a file in var/emails directory)
* users to login
* users to create notes
* each note should have fields
  * title
  * content
  * category
  * status (new, todo, done)
* list of notes should have possibility to search notes by text from title/content, a select list for statuses and another select list for categories.

To finish this challenge you have 24h since the moment of receiving this email. Remember to push your last changes before the end of the deadline.
We will be evaluating your solution based on the time of the commit. And remember to send us back link to your solution on GitHub.

Good look.

## Help notes

### Requirements
To run this project you will need:
* Docker: >24
* Docker Compose: >1.29
* NodeJS: >18
* PHP: >7.4

### First steps:

    $ cp .env.dist .env
    $ composer install
    $ yarn install
    $ docker-compose up -d
    $ yarn watch

After running this set of commands, without errors; you should be able to open `http://localhost:81/` and see `Hello World!!!` in the middle of the page.
