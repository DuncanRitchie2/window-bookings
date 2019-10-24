# 🏚️🕵️📋 window-bookings

Bookings system for a window-repair company. My apprenticeship project for Information Catalyst under the tutelage of Code Nation.

<h2>Brief</h2>

Problem-solving exercise for new, above-junior entrants at ICE.

This exercise is intended to be solved within two weeks’ time using all technologies you think are relevant to solve the problem. Its purpose is only to test how you perform in a situation with high-level requirements. At the same time, you’ll get to know some of the technologies we use at ICE. There is no right or wrong answer; there is no good or bad solution; just give it your best shot.

<h3>Problem Context</h3>

JWS is a UK company that builds and repairs windows for period properties, from Victorian period to Tudor and related styles in between. Their headquarters and factory are located in Crewe and have two other offices in the Midlands and in South West England. They are currently looking for expansion but their lack of IT support for managing their survey bookings is impeding them reaching their goal.

Currently, customers call JWS to request a quote for new windows or repairing existing ones. In order to provide an accurate quote, surveyors have to visit the property and assess the status of windows. When customers call, they provide their details (name, contact number, email address, and property address) and book a survey at an arranged date and time. Surveyors visit the property at the agreed time to assess the property windows. As part of the assessment, they count the number of windows, measure them, and identify the architectural style (Elizabethan, Georgian, etc.). All this information is collected in a paper-based form. At the end of a survey, surveyors take pictures of the completed forms and send them via email to the headquarters using their mobile phones.

Each surveyor receives their daily schedule of surveys to be undertaken via email the day before. The schedule informs them of the location of each property to visit and customer contact details. Surveyors use their own navigation system (TomTom, Google maps, streetmap, etc.) to go from survey location to survey location. Schedules are done manually at the headquarters. If a customer calls on the booking date to cancel or re arrange the booking, surveyors are not informed of such a change nor prompted to call the headquarters. This translates in time, effort and money being wasted for going to a survey that is not supposed to happen.

<h3>Problem Statement</h3>

JWS wants to create a web-based survey system to improve communication between headquarters – surveyors, and between customers – JWS. Additionally, they want to automate and improve internal processes, which will create efficiencies across the company that will be translated in cost reduction, resource optimisation, increased customer satisfaction, and overall higher revenue.

<h3>User Requirements (in no particular order)</h3>

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

<h3>Your mission</h3>

Using your preferred development environment, you have two weeks to develop a working prototype of the JWS system on the basis of the information provided above. We do NOT expect that you are able to implement the system in its entirety, but please select the parts of the system that you feel comfortable with. Your implementation should include both front-end and back-end functionalities according to the user requirements. At the end of the exercise, you should be able to demonstrate a working prototype of the parts you developed to other colleagues. Remember that we are not after a pretty system. We are only testing your problem-solving skills in order to know how we can best fit you in our projects, both current and future. Feel free to make any assumptions.

<h2>ICE Technologies</h2>

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

<h2>My approach</h2>

On the first day of the project, I planned it all out &mdash; I decided my tech stack and which features to prioritise. I settled on using a React front-end (using React Router to handle user navigation), an Express.js server, and a MySql database. 

For this kind of project where it&rsquo;s about showing what I know and what I can do in a limited time (ten days), it seemed sensible to stick with what I&rsquo;m familiar with. I know Information Catalyst prefer Angular, but I have no experience with Angular and I&rsquo;m very comfortable with React (excluding React Hooks). (See also: six of my projects on <a href="https://github.com/DuncanRitchie?tab=repositories" title="DuncanRitchie&rsquo;s repositories">my non-apprenticeship account</a>.) I know Information Catalyst prefer Java, and I am getting a lot better acquainted with Java, but I still have more familiarity with Node/Express/JavaScript generally.

<h3>🗄️ MySql database</h3>

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

<h3>🚂 Express.js server</h3>

The JavaScript (Node) code for the server lives in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/master/index.js" title="index.js code on GitHub">index.js</a>. Much of it is adapted and extended from the <a href="https://github.com/DuncanRitchie2/reminders" title="Reminders app code on GitHub">reminders app</a> that I built with my Code Nation classmates Tom and Stefan, which was a very useful project for me to get acquainted with using MySql and Express together.

The code for interacting with the database is in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/master/db.js" title="db.js code on GitHub">db.js</a>. There are fifteen functions in there, though a couple are barely written and the deleteSurvey() function is never used at all.

<h3>⚛️ React front-end</h3>

At the moment, React is still my preferred tech for creating user interfaces; I confess I&rsquo;ve never really looked into alternatives, such as Angular, Vue, or non-JavaScript-based options. So I used React for this project, set up with Create React App.

I wanted a single-page application because it&rsquo;s easy to pass information between views and cut down on HTTP requests by only loading one HTML file. But I think that users still like to have different URLs mapping to different views &mdash; it gives feedback to the user that they&rsquo;re on a different part of the site, and allows for the browser&rsquo;s back/forward buttons to be used via the HTML5 history API. So I used the <a href="https://reacttraining.com/react-router/" title="React Router&rsquo;s website">React Router</a> module for this purpose.

The routes I have (defined in <a href="https://github.com/DuncanRitchie2/window-bookings/blob/master/client/src/App.js" title="App.js code on GitHub">client/src/App.js</a>) are:
* / (homepage),
* /book (form for booking a survey as a new or existing customer),
* /list (table of all the surveys a customer has booked),
* /edit/:id (form for a customer to change a booking, where :id is the survey id),
* /surveyor (table of all the surveys a surveyor has been assigned to),
* /survey/:id (form for a surveyor to complete a survey, where :id is the survey id).
* Anything else should give a 404 error page (if not an endpoint for communicating with the back-end).

The navbar links to the homepage, /book, /list, and /surveyor. The booking form redirects to /list after submission. The customer and surveyor tables have a button for each survey linking to the correct /edit/ or /survey/ view to modify or complete that survey.

<h3>💅 CSS</h3>

Practically all the CSS is in the <a href="https://github.com/DuncanRitchie2/window-bookings/blob/master/client/src/App.css" title="App.css code on GitHub">App.css</a> file; some default code from Create React App is still left in index.css, though it&rsquo;s somewhat redundant.

I kept the CSS fairly simple and minimalistic; there are no images in the app, no reasons for sophisticated animations, and no requirements for particular designs in the brief. (There is a little transition on the navbar elements.) If the screen-width is over 560px, table rows are full width and the navbar is all one horizontal row. If the screen-width is 560px or narrower, the navbar becomes a vertical column and the table rows get a CSS Grid layout with the date and address stacking on top of the lat/long, surveyor/customer, and edit button.

<h3>🔓 Security</h3>

I have not implemented any real security features, not even passwords. On the front-end, users have to log in as a named customer (through the booking form if they&rsquo;ve not already been added as a customer) in order to read and change their bookings, and surveyors have to sign in with the appropriate name in order to submit their surveys. But it is easy to manipulate the React state and gain access to the survey data, because the log-in components (CustomerLogin) and (SurveyorLogin) only appear if there is no customer.id or surveyor.id variable in the App component&rsquo;s state.
