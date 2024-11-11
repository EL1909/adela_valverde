![Avalverde](/media/readme/portada.jpg)
<center><a href="https://desolate-cliffs-84301-09a6fb33b89a.herokuapp.com/" target="_blank">Click here to visit the site</a> - <a href="https://github.com/EL1909/adela_valverde" target="_blank">Click here to visit repository</a></center>

---
## Table of Contents - v2

- [Introduction](#Adela-Valverde)
- [Working Methodology](#working-methodology)
- [User Stories](#user-stories)
- [Moscow Prioritization](#moscow-prioritization)
- [Database Design](#database-design)
    - [Models](#models)
    - [Database Relationships](#database-relationships)
- [Users Types](#users-types)
- [CRUD Operations](#crud-operations)
- [Features](#features)
    - [Design and Colors](#design-and-colors)
    - [Navigation](#navigation)
- [Testing](#manual-testing)
- [Project Creation Process](#project-creation-process)
- [Deployment to Heroku](#deploy-to-heroku)
- [Bugs](#bugs)
    - [Unfixed](#unfixed)
    - [Fixed](#fixed)
- [Features to Improve](#features-to-improve)
- [Credits](#credits)

---

## [Introduction](#Adela-Valverde)

This is a second version of Adela Valverde's website.

The main goal for this V2 is to:
    - Enable products catalog 
    - Complete a purchase process
    - Integrate domain www.adelavalverde.com
    - Host website in Esfuerzo's virtual machine
    - Adapt UI to Adela's taste


## [Working Methodology](#working-methodology)

In order to achieve this Second release, i determined tasks having in mind an Agile mindset and stablishing goals to be completed within weekly iterations.

Placing myself in the user's position, and anticipating the user's wants and needs, i made myself the following questions:

- Why would a user want to visit our blog? 
- What will make them return?
- What do i want to see when I visit a blog What would make me return

From those answers I did set up 5 issues in GitHub as User Stories.

### [User Stories](#user-stories)
    - As a Visitor I can buy products and services provided by Adela.
        - Integrate Paypal merchant
        - Provide inventory handling
    
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

## [Bugs](#bugs)
    - [Unfixed](#unfixed)
    - [Fixed](#fixed)
    1. As i was trying to deploy from Heroku, only the tables for the database were being loaded but not the records. I tried different database configurations noth in settings.py and config vars in Heroku but i never managed to load the records.
    Therefore i created new records within the deployed website, that are currently being hosted to elephantSql.

## [Features to Improve](#features-to-improve)
All features to improved will be discussed and approved after customer's review.

## [Credits](#credits)

![Avalverde](/media/readme/ReadMe.png)
