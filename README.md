# geonavigator-recruitment-task
This project is a recruitment task for the Codecool course

# Description.
1. It is a web application used to convert location coordinates from the Polish geodetic system 2000 (in the so-called zone 7) to geographic coordinates.
2. Location coordinates must be within the following ranges:
- horizontal axis: 7000000 - 8000000
- vertical axis: 5000000 - 6500000
If you specify coordinates outside these ranges, the application shows an error message.

3. In addition, the application.
- generates a link to the location on Google Maps,
- provides the ability to save locations in the database and delete, update and recalculate the coordinates of locations stored in the database.

# Activation.
1. Download the repository from GitHub.
2. Open the "backend" folder located in the root of the project using a code editor (IntelliJ recommended), navigate to the SpringbootappApplication.java file located in src/main/java/pl/geonavigator/backend/SpringbootappApplication.java and run it.
3. Open the "frontend" folder located in the root of the project using a code editor (Visual Studio Code recommended), open Terminal and run it using consecutively:
npm install
npm start

# Technologies used.
Backend: SpringBoot
Frontend: React
Database: H2

# Author: Paweł Pestka