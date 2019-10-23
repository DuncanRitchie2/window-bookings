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

For this kind of project where it&rsquo;s about showing what I know and what I can do in a limited time, it seemed sensible to stick with what I&rsquo;m familiar with. I know Information Catalyst prefer Angular, but I have no experience with Angular and I&rsquo;m very comfortable with React (excluding React Hooks). (See also: six of my projects on <a href="https://github.com/DuncanRitchie?tab=repositories" title="DuncanRitchie&rsquo;s repositories">my non-apprenticeship account</a>.) I know Information Catalyst prefer Java, and I am getting a lot better acquainted with Java, but I still have more familiarity with Node/Express/JavaScript generally.

For databases, Information Catalyst like to use MongoDB for non-relational and MySql for relational. I&rsquo;m happy with both &mdash; <a href="https://github.com/DuncanRitchie/velut" title="Code for velut.co.uk on GitHub">my Latin dictionary</a> is a big project of mine using MongoDB &mdash; but this project seemed to need a relational database with several tables linking together, so I used MySql.

I spent three days setting up the database. The six tables I created are customers, surveyors, premises, surveys (which links to the first three tables), windows (which links to premises), and photos (which links to surveys and windows). I knew I wouldn&rsquo;t be able to implement all the features suggested in the brief; nonetheless, I felt I should make the database as comprehensive as possible before writing any HTML or JavaScript, so that I would be able to build whatever front-end and middle-ware I wanted without changing the MySql schemata and potentially dropping and re-creating the database.
