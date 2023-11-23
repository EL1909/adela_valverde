![Avalverde](/media/readme/portada.jpg)

<a href="https://desolate-cliffs-84301-09a6fb33b89a.herokuapp.com/" target="_blank">Click here to visit the site</a>

<a href="https://github.com/EL1909/adela_valverde" target="_blank">Click here to visit repository</a>

---
# Table of Contents for adelavalverde.com - v1
## [Introduction](#Adela-Valverde)

This is a personal website for Adela Valverde.

It's intended to handle her online activities, marketplace, blog multimedia, events -done and to do- registration and user accounts.

Users of the website are able to be updated on Adela Valverde's most recent publications, They will be also able to find previous books and other content created by Adela, keep messages and request private meetings.

Those that are not familiarized with her background will have access to review Adela's working and personal history, as well as those whom have make part of her pathway.


## [Working Methodology](#working-methodology)

In order to achieve this first release, i determined tasks having in mind an Agile mindset and stablishing goals to be completed within weekly iterations.

Placing myself in the user's position, and anticipating the user's wants and needs, i made myself the following questions:

- Why would a user want to visit our blog? 
- What will make them return?
- What do i want to see when I visit a blog What would make me return

From those answers I did set up 5 issues in GitHub as User Stories.

### [User Stories](#user-stories)
    - As a Visitor I can Create an account so that i can have a user or superuser profile.
    - As a Visitor I can See all products and services provides by Adela so that i can purchase or acquire those services.
    - As a Visitor I can Watch one main item on the home page so that I can easily access without surfing the site.
    - As a Visitor I can review Adela's background so that i'm aware of her biography and other informations she wants to share.
    - As a User I can log in and out so that Access user features.

### [Moscow Prioritization](#moscow-prioritization)
![Avalverde](/media/readme/Milestones1mvp.jpg)

## [Database Design](#database-design)
### [Models](#models)
For the first version of thi project, I will be using four different database models for this project: User, KeyMoments, Products and Categories.

1. The User class is the default User class from Django.

2. The Key Moments model is a key custom class in this project as the main function of the site is for users to travel thru Adela Valverde life's timeline.

class key_moments(models.Model):

    title = models.CharField(max_length=128)
    user = models.ForeignKey()
    excerpt = models.CharField()
    status = models.IntegerField()
    description = models.TextField()
    image = models.ImageField()
    cropped_image = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField()
    likes = models.ManyToManyField()    
    moment_type = models.CharField()

3. The Products model is a class for creating product items within different categories.

class Product(models.Model):

    category = models.ForeignKey()
    sku = models.CharField()
    name = models.CharField()
    description = models.TextField()
    price = models.DecimalField()
    rating = models.DecimalField()
    image_url = models.URLField()
    image = models.ImageField()
    created_by = models.ForeignKey()

4. The Category model is a class to determine categories for the products or services published on the website.

class Category(models.Model):

    name = models.CharField()
    friendly_name = models.CharField()


### [Database Relationships](#database-relationships)

to be determined

## [Users Types](#users-types)

There's three type of expected users.

### Visitors:

- Will be able to watch all publications and online store.
- Will be able to register as a member using a valid email.

### Members

- Will be able to register payment information to access store items or services.
- Will be able to comment on key moments posts.

### Superusers

- Will be able to manage products and services.
- Will be able to manage key moments.


## [CRUD Operations](#crud-operations)

Superusers are able to succesfulle CRUD elements in products and key moments features.

## [Features](#features)
### [Design and Colors](#design-and-colors)

Navigation fonts tend to be sober and respectful; text style contrast with solid background colors.

For this first version, Inconsolata and Raleway, Imported from google fonts are the fonts to be used.

Color selection is intended to allow clear navigation.

Colors used in this website are:
- #666666
- #7199d0
- #ffffff

All colors and fonts will be modified after customer's review.

### [Navigation](#navigation)
    - [Home Page](#Home_Page) 
	- [Quien Soy] (#Key_moments)
    - [Mi Labor] (#Products)
		- Libros
		- Seminarios
        - Podcast (#youtube_posts)
		- Sesiones Privadas
	- [Apoya mi Labor](#products)
	- [Equipo]
    
## [Testing](#manual-testing)
    
    - [Manual Testing](#manual-testing)
        - [CRUD](#crud)
        - [Messages](#messages)
    - [Automated Testing](#automated-testing)
    - [CSS Validator](#css-validator)
    - [LightHouse](#lighthouse)

## [Project Creation Process](#project-creation-process)

1. Installed Allauth authentication
2. Installed Home App
3. Installed Key Moments
4. Installed Products
5. Installed Youtube Posts
6. Setup Heroku variables


- [Deployment to Heroku](#deploy-to-heroku)

- [Bugs](#bugs)
    - [Unfixed](#unfixed)
    - [Fixed](#fixed)

- [Features to Improve](#features-to-improve)

- [Credits](#credits)




<img src="">


![Avalverde](/media/readme/ReadMe.png)
