# Ops Check

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-ie-6.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://forthebadge.com)

## Overview
A checklist management system for a small workshop. Create checklists, assign users, and view completed checklists. Help create accountability for digital tasks.

## Table of Contents
-Description
-Database Schema
-Installation
-Usage
## Description
Create checklists, standard operating procedures, or other workflow tasks. Manage users for your checklists, and view the completed ones they sign off on.

### Create a checklist
![create a checklist](https://i.gyazo.com/60afaacacb61f110d67e3bc03aa13c8e.png)
### View completed checklist
![completed checklist](https://i.gyazo.com/d4d639dd16d3af9bcd736c0995620526.png)

### Database Schema
![db schema](https://snipboard.io/2CPiG0.jpg)

## Installation
run npm install in backend, frontend.
create a db.js file with your connection string
run the db.sql file to seed the schema and admin user

## Usage
As a supervisor:
  Create a checklist.
  Assign a user to be able to work the checklist.
  View completed lists by users in Completed tab.
  
As a user:
  View checklists to work from home.
  Click the steps completed as done.
  Mark complete list.
