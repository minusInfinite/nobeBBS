# NodeBBS

A Modern Bulletin Board System in Node JS and Express with a Classic look

[Live Demo](https://nobebbs.onrender.com/)

## Contents

[Local Deployment](#local-deployment)

[To-Do](#to-do)

[Examples](#examples)

## Local Deployment

This CRM uses [MySQL](https://dev.mysql.com/) as it's database and
[Sequelize](https://sequelize.org/) as the ORM for providing schema models and queries.

Be sure to have MySQL setup an running before you download.

### Download

In your terminal download the repo

```terminal
git clone https://github.com/minusInfinite/nobeBBS.git
```

Once downloaded install the dependencies with NPM

```terminal
npm install
```

## Environment Setup

You will also need to edit the .env.EXAMPLE file to .env with the following

### Development
>
> DBNAME - _The database Name_
>
> DBUSER - _Your server or database Username_
>
> DBPASS - _Your server or database password_

### Required
>
> CSECRET - _Random characters for the Session Cookie Secret_
>
> ADMINPASS= _Set the initial Administrator Password_

### Live

> DB_URL - _If your using a cloud hosted DB Url_

Once you .env is setup you should be able to run the server

```terminal
npm start
```

Or for development

```terminal
npm run dev
```

## To-Do

- Create the Admin Dashboard for full forum management.
- Add some kind of WYSIWYG editor
- Sanatise text input from code injection.
- If you would like to add features please raise an issue or PR.

## Example

[Live Demo](https://nobebbs.onrender.com/)

![Animated Demo GIF](/mdassets/nodebbs-demo.gif)
