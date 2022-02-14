# 🏚️🕵️📋 window-bookings

Bookings system for a window-repair company. My induction project for Information Catalyst (ICE) under the tutelage of Code Nation.

## 💼 Brief

Problem-solving exercise for new, above-junior entrants at ICE.

This exercise is intended to be solved within two weeks’ time using all technologies you think are relevant to solve the problem. Its purpose is only to test how you perform in a situation with high-level requirements. At the same time, you’ll get to know some of the technologies we use at ICE. There is no right or wrong answer; there is no good or bad solution; just give it your best shot.

### Problem Context

JWS is a UK company that builds and repairs windows for period properties, from Victorian period to Tudor and related styles in between. Their headquarters and factory are located in Crewe and have two other offices in the Midlands and in South West England. They are currently looking for expansion but their lack of IT support for managing their survey bookings is impeding them reaching their goal.

Currently, customers call JWS to request a quote for new windows or repairing existing ones. In order to provide an accurate quote, surveyors have to visit the property and assess the status of windows. When customers call, they provide their details (name, contact number, email address, and property address) and book a survey at an arranged date and time. Surveyors visit the property at the agreed time to assess the property windows. As part of the assessment, they count the number of windows, measure them, and identify the architectural style (Elizabethan, Georgian, etc.). All this information is collected in a paper-based form. At the end of a survey, surveyors take pictures of the completed forms and send them via email to the headquarters using their mobile phones.

Each surveyor receives their daily schedule of surveys to be undertaken via email the day before. The schedule informs them of the location of each property to visit and customer contact details. Surveyors use their own navigation system (TomTom, Google maps, streetmap, etc.) to go from survey location to survey location. Schedules are done manually at the headquarters. If a customer calls on the booking date to cancel or re arrange the booking, surveyors are not informed of such a change nor prompted to call the headquarters. This translates in time, effort and money being wasted for going to a survey that is not supposed to happen.

### Problem Statement

JWS wants to create a web-based survey system to improve communication between headquarters – surveyors, and between customers – JWS. Additionally, they want to automate and improve internal processes, which will create efficiencies across the company that will be translated in cost reduction, resource optimisation, increased customer satisfaction, and overall higher revenue.

### User Requirements (in no particular order)

The system should allow customers to book surveys online.

Customers should have an online account created automatically after they book a survey and the system has collected their details.

Customers can manage survey bookings online 24/7 from anywhere. They can cancel or re-arrange them.

Surveyors should be able to see their own schedule of the day.

Navigation routes (displayed in a map) should be provided to the surveyors for travelling between survey locations.

Customers should be able to see in a map the location of the surveyor when in route to the property.

When at the survey, the system must prompt the surveyor to confirm the number of windows, take the measures and a photo of each window, and the property architectural style.

Staff at the headquarters should still be able to arrange bookings via phone or email. This includes any cancelation or re-scheduling.

Any changes to survey bookings (regardless of how they were made) must be immediately reflected in the surveyors’ screens.

Staff at the headquarters would also like to see statistics of surveys including number of surveys done in total or per surveyor in a week or in a month. Moreover, staff should be able to see statistics of the surveyed properties in terms of architectural style and number of windows per property.

In order to plan company growth, management would like to see a heatmap of the location of surveys per week or month.

### Your mission

Using your preferred development environment, you have two weeks to develop a working prototype of the JWS system on the basis of the information provided above. We do NOT expect that you are able to implement the system in its entirety, but please select the parts of the system that you feel comfortable with. Your implementation should include both front-end and back-end functionalities according to the user requirements. At the end of the exercise, you should be able to demonstrate a working prototype of the parts you developed to other colleagues. Remember that we are not after a pretty system. We are only testing your problem-solving skills in order to know how we can best fit you in our projects, both current and future. Feel free to make any assumptions.

## 🛠️ ICE Technologies

This is a non-exhaustive list of technologies we use at ICE. If you know any of them, feel free to show-off your skills (we also want to learn something from you). If you have not used any of them, but always wanted to learn, well this is your chance (as long as it is relevant to your mission). In no particular order:

• Java

• Angular / Javascript

• Python

• Docker & Docker Swarm

• Kubernetes

• Kafka

• MySQL

• MongoDB

• Grafana

• H2O.ai

• Apache Flink

• Liferay

• GitLab

## 🛣️ My approach

On the first day of the project, I planned it all out &mdash; I decided my tech stack and which features to prioritise. I settled on using a React front-end (using React Router to handle user navigation), an Express.js server, and a MySql database. 

For this kind of project where it&rsquo;s about showing what I know and what I can do in a limited time (ten days), it seemed sensible to stick with what I&rsquo;m familiar with. I know Information Catalyst prefer Angular, but I have no experience with Angular and I&rsquo;m very comfortable with React (excluding React Hooks). (See also: six of my projects on <a href="https://github.com/DuncanRitchie?tab=repositories" title="DuncanRitchie&rsquo;s repositories">my non-apprenticeship account</a>.) I know Information Catalyst prefer Java, and I am getting a lot better acquainted with Java, but I still have more familiarity with Node/Express/JavaScript generally.

### ✨ Features I managed to implement

The app presents the customer with a booking form, which asks for a customer name, premises address, and survey date. On submission, a new survey is added to the database with the information from the form. If the premises does not match a premises existing in the database, a new premises record is created. If the customer does not match a customer existing in the database, a new customer record is created. A random surveyor is assigned to the survey. After submitting a booking, the customer is redirected to their list of surveys.

The customer&rsquo;s list of surveys presents the date due, premises address, surveyor name, and an edit button for every booking. If a latitude and longitude is also in the database for a premises, those co-ordinates are given also.

The edit button allows the customer to change the date and time of the booking. (It would also allow the customer to change the premises, but I&rsquo;ve not figured that out yet.)

Surveyors can also log in, and view the surveys they have been assigned to. They get similar information to the customer&rsquo;s view, though with a customer&rsquo;s name instead of a surveyor&rsquo;s. (So customers get a list of the surveyors they&rsquo;re dealing with, and vice versa.)

The edit button for each record in the surveyor&rsquo;s view allows the surveyor to read and change the architectural style for the premises. (It also asks the surveyor for the number of windows, but this is not saved to the database.)

After a customer changes a booking or a surveyor changes a survey, they are redirected to their list of surveys.

### 🗄️ MySql database

For databases, Information Catalyst like to use MongoDB for non-relational and MySql for relational. I&rsquo;m happy with both &mdash; <a href="https://github.com/DuncanRitchie/velut" title="Code for velut.co.uk on GitHub">my Latin dictionary</a> is a big project of mine using MongoDB &mdash; but this project seemed to need a relational database with several tables linking together, so I used MySql.

I spent three days setting up the database. The six tables I created are customers, surveyors, premises, surveys (which links to the first three tables), windows (which links to premises), and photos (which links to surveys and windows). I knew I wouldn&rsquo;t be able to implement all the features suggested in the brief; nonetheless, I felt I should make the database as comprehensive as possible before writing any HTML or JavaScript, so that I would be able to build whatever front-end and middle-ware I wanted without changing the MySql schemata and potentially dropping and re-creating the database.

The columns for the six tables are as follows. Columns listed italicised in brackets are not read or modified by the application; the photos table did not get used at all.
* customers: id, firstName, lastName, <i>(phoneNumber, dateJoined)</i>;
* surveyors: id, firstName, lastName, <i>(phoneNumber, emailAddress, lastLatitude, lastLongitude, dateJoined)</i>;
* premises: id, houseNumber, houseName, street, town, country, postCode, latitude, longitude, style;
* surveys: id, customer_id, surveyor_id, premises_id, status, dateToHappen, <i>(dateBooked)</i>;
* windows: id, premises_id, <i>(description, deleted)</i>;
* <i>(photos: id, survey_id, window_id, url, dateTaken)</i>.

Of course, if this app were actually in use by the surveying company, all the data would be real customers/surveyors/etc. In development, I&rsquo;ve inserted fake data with the following convention &mdash; I used the names of politicians for customers (with contrived contact details), the names of pop stars for surveyors (also with contrived contact details), and famous government buildings for the premises. Thus I could have Hillary Clinton booking Camila Cabello to survey the White House, for instance.

### 🚂 Express.js server

The JavaScript (Node) code for the server lives in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/index.js" title="index.js code on GitHub">index.js</a>. Much of it is adapted and extended from the <a href="https://github.com/DuncanRitchie2/reminders" title="Reminders app code on GitHub">reminders app</a> that I built with my Code Nation classmates Tom and Stefan, which was a very useful project for me to get acquainted with using MySql and Express together.

The code for interacting with the database is in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/db.js" title="db.js code on GitHub">db.js</a>. There are fifteen functions in there, though a couple are barely written and the deleteSurvey() function is never used at all.

### ⚛️ React front-end

At the moment, React is still my preferred tech for creating user interfaces; I confess I&rsquo;ve never really looked into alternatives, such as Angular, Vue, or non-JavaScript-based options. So I used React for this project, set up with Create React App.

I wanted a single-page application because it&rsquo;s easy to pass information between views and cut down on HTTP requests by only loading one HTML file. But I think that users still like to have different URLs mapping to different views &mdash; it gives feedback to the user that they&rsquo;re on a different part of the site, and allows for the browser&rsquo;s back/forward buttons to be used via the HTML5 history API. So I used the <a href="https://reacttraining.com/react-router/" title="React Router&rsquo;s website">React Router</a> module for this purpose.

The routes I have (defined in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/App.js" title="App.js code on GitHub">client/src/App.js</a>) are:

<table>
  <thead>
    <tr>
      <td><h4>URL</h4></td>
      <td><h4>React component</h4></td>
      <td><h4>Description</h4></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/</td>
      <td>Home</td>
      <td>homepage</td>
    </tr>
    <tr>
      <td>/book</td>
      <td>Book</td>
      <td>form for booking a survey as a new or existing customer</td>
    </tr>
    <tr>
      <td>/list</td>
      <td>CustomersList</td>
      <td>table of all the surveys a customer has booked</td>
    </tr>
    <tr>
      <td>/edit/:id</td>
      <td>EditBooking</td>
      <td>form for a customer to change a booking, where :id is the survey id</td>
    </tr>
    <tr>
      <td>/surveyor</td>
      <td>SurveyorsList</td>
      <td>table of all the surveys a surveyor has been assigned to</td>
    </tr>
    <tr>
      <td>/survey/:id</td>
      <td>SurveyForm</td>
      <td>form for a surveyor to complete a survey, where :id is the survey id</td>
    </tr>
    <tr>
      <td colspan="3">Anything else should give a 404 error page (if not an endpoint for communicating with the back-end).</td>
    </tr>
  </tbody>
</table>

The navbar links to the homepage, /book, /list, and /surveyor. The booking form redirects to /list after submission. The customer and surveyor tables have a button for each survey linking to the correct /edit/ or /survey/ view to modify or complete that survey.

If the user is not logged in as a customer, they see the CustomerLogin component instead of the CustomersList and EditBooking components. Ditto for the surveyor with the SurveyorLogin, SurveyorsList, and SurveyForm components.

### 💅 CSS

Practically all the CSS is in the <a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/App.css" title="App.css code on GitHub">App.css</a> file; some default code from Create React App is still left in index.css, though it&rsquo;s somewhat redundant.

I kept the CSS fairly simple and minimalistic; there are no images in the app, no reasons for sophisticated animations, and no requirements for particular designs in the brief. (There is a little transition on the navbar elements.) If the screen-width is over 560px, table rows are full width and the navbar is all one horizontal row. If the screen-width is 560px or narrower, the navbar becomes a vertical column and the table rows get a CSS Grid layout with the date and address stacking on top of the lat/long, surveyor/customer, and edit button.

### 🔓 Security

I have not implemented any real security features, not even passwords. On the front-end, users have to log in as a named customer (through the booking form if they&rsquo;ve not already been added as a customer) in order to read and change their bookings, and surveyors have to sign in with the appropriate name in order to submit their surveys. But it is easy to manipulate the React state and gain access to the survey data, because the user only needs to log in if there is no customer.id or surveyor.id variable in the App component&rsquo;s state.

### 🔮 Potential improvements

Customers wanting to change a booking are currently given a form to change the premises and date, but the premises part doesn&rsquo;t work. (Because the premises_id column in the surveys table is foreign-keyed to the id in the premises table, MySql is not happy with me changing the premises_id to refer to a different premises.) This is probably the most important bug I need to fix.

Customers should also be able to cancel bookings. I would most likely do this by setting the status column in the surveys table to &ldquo;cancelled&rdquo;, and filtering out &ldquo;cancelled&rdquo; surveys in the MySql queries. Customers should not be able to cancel bookings that have happened.

On the surveyor&rsquo;s side, submitting a number of windows to a premises does not change the database. This is because the number of windows comes from a count of the number of rows in the windows table with a matching premises_id, so I need to insert rows into the windows table when the surveyor tries to increase the number of windows. (Maybe I&rsquo;ll even need to delete rows when the surveyor decreases the number of windows, but this seems dangerous, and MySql may forbid it because the photos table is foreign-keyed to the windows table.)

Furthermore, when a surveyor specifies that a premises has whatever number of windows, they need to be given input boxes for each window, and the data they input will need to go into the database in the appropriate places. A photograph (or URL thereof) of each window should also be able to be added to the database (in the photos table).

The brief suggests that customers could be updated on the surveyor&rsquo;s current location while en route to the premises. This is why I added the lastLatitude and lastLongitude columns to the surveyors table &mdash; were I to implement this feature, I would have the surveyor&rsquo;s device sending the co-ordinates to the database every minute (or on whatever time-interval), and the customer&rsquo;s front-end fetching those co-ordinates at the same frequency.

The brief also suggests generating reports with statistics about the work that different surveyors have done, or maps of the premises locations. This seems quite far beyond &ldquo;minimum viable product&rdquo;, but it would be an opportunity to use the latitude and longitude columns in the premises table.

More importantly, I&rsquo;ve not deployed this app. If you want to try it out for yourself, you have to follow the installation steps at the end of this readme.

The .env file contains the environment variables I use in development, including my MySql password. In production, this file would never be part of the Git history, and environment variables would be set for different environments (e.g. Heroku) individually.


## 🎞️ Screenshots

Click on the image to see the code for the relevant component.

### 📱 Mobile view
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/SurveyorsList/SurveyorsList.jsx">
  <img src="https://res.cloudinary.com/duncanritchie/image/upload/v1590938855/project-screenshots/window-survey-bookings-app.png" alt="SurveyorsList on mobile" width="260" style="width: 90%; max-width: 260px;">
</a>

### 🖥️ Desktop view

#### Homepage

<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/Home/Home.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/Home.png" alt="Homepage" style="max-width: 90vw;">
</a>

#### Booking a survey
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/Book/Book.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/Book.png" alt="Booking a survey">
</a>

#### Customer login
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/CustomerLogin/CustomerLogin.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/CustomerLogin.png" alt="Customer login">
</a>

#### List of a customer&rsquo;s surveys
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/CustomersList/CustomersList.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/CustomersList.png" alt="List of a customer&rsquo;s surveys">
</a>

#### Edit a booking as a customer
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/EditBooking/EditBooking.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/EditBooking.png" alt="Edit a booking as a customer">
</a>

#### Surveyor login
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/SurveyorLogin/SurveyorLogin.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/SurveyorLogin.png" alt="Surveyor login">
</a>

#### List of a surveyor&rsquo;s surveys
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/SurveyorsList/SurveyorsList.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/SurveyorsList.png" alt="List of a surveyor&rsquo;s surveys">
</a>

#### Survey form for a surveyor
<a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/client/src/components/SurveyForm/SurveyForm.jsx">
  <img src="https://github.com/DuncanRitchie2/window-bookings/blob/main/screenshots/SurveyForm.png" alt="Survey form for a surveyor">
</a>

## 🚀 Installation
Install MySql (I use a <a href="https://dev.mysql.com/downloads/mysql/" title="Download a community edition of MySql">community edition</a>). Start a MySql server running (on a Mac it will be something like System Preferences -> MySql -> Start server).

Run <a href="https://github.com/DuncanRitchie2/window-bookings/blob/main/schema.sql" title="Schema.sql code on GitHub">schema.sql</a>.

Install <a title="Node.js" href="https://nodejs.org/en/">Node</a> and <a title="NPM" href="https://www.npmjs.com">Node Package Manager</a> if you don&rsquo;t have them.

Clone this repo and install Node dependencies.
```
git clone https://github.com/DuncanRitchie2/window-bookings
npm i
```

Log into MySql in the terminal; enter your MySql password when prompted:
```
mysql -u root -p
```

Open the root folder (/window-bookings) in the terminal and run index.js. 
```
node
```

Run the Create React App script from inside the client folder:
```
cd client
npm start
```

The homepage should appear in your browser at localhost:3000 . The server will have endpoints at localhost:3019/ .
