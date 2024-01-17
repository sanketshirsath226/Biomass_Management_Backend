# Biomass Management Project Structure

This README provides essential information about setting up and configuring the Node.js backend for your project. Before running the application, ensure you have Node.js and npm installed on your machine.

## Project Structure Overview

- **config/:** Stores configuration files and environment-specific settings.
- **controllers/:** Handles incoming requests, routes them to appropriate services.
- **middlewares/:** Contains reusable middleware functions for authentication, error handling, logging, and other common tasks.
- **models/:** Holds Mongoose models (if using MongoDB) representing data entities in the application.
- **routes/:** Defines route handlers that map URLs to controller functions.
- **services/:** Encapsulates business logic and utility functions, keeping controllers focused on request handling.
- **utils/:** Stores common utility functions used throughout the application.
- **README.md:** Documentation for the GitHub repository.
- **app.js:** Entry point for the application, usually initializing Express or other frameworks.


### Built With
[![Mongo DB][Mongo.db]][Mongodb-url]
[![Express JS][Express.js]][Express-url]
[![React Native][React-Native.js]][React-url]
[![Node][Node.js]][Node-url]
[![Python][Python]][Python-url]

## Team Members

### Team Leader: Pranav Shimpi
- **Role:** Visionary Leader, UI/UX Designer, Software Engineer
- **Social Media:**

  ![Linkedin][linkedin-shield]

Pranav is our visionary leader, driving the team with passion and expertise in React Native development. With a knack for solving complex problems, Pranav ensures that our project maintains a high standard of quality and innovation.

### Team Member: Vaidehi Patil
- **Role:** UI/UX Designer, Software Engineer
- **Social Media:**

  ![Linkedin][linkedin-shield]


Vaidehi is a creative force on our team, specializing in designing intuitive and visually appealing user interfaces. Her attention to detail and commitment to user experience make her an invaluable member of our development crew.

### Team Member: Sayali Kulkarni
- **Role:** UI/UX Designer, Software Engineer
- **Social Media:**

  ![Linkedin][linkedin-shield]

Sayali is our coding maestro, bringing a wealth of technical expertise to the project. With a keen eye for optimization and performance, Sayali ensures that our React Native app runs smoothly and efficiently.

### Team Member: Sanket Shirsath
- **Role:** Developer
- **Social Media:**

  ![Linkedin][linkedin-shield]

## Getting Started

Follow these steps to clone the repository and set up the project:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sanketshirsath226/Biomass_Management_Backend.git
2. **Navigate to the Project Directory:**
   ```bash
   cd Biomass_Management_Backend
3. **Install Dependencies:**
    ```bash
   npm install

### Configuration:
1. Create a `config` directory in the root of the project.
2. Inside the `config` directory, create a file named `config.example.env` with the following parameters:
    ```bash 
    # config.example.env
    
    # Gmail credentials for sending emails
    GMAIL_ID=
    GMAIL_PASS=
    
    # Port on which the server will run
    PORT=
    
    # MongoDB connection URI
    MONGO_URI=
    
    # JWT secret key for token generation and verification
    JWT_SECRET=
    
    # JWT expiration time in seconds
    JWT_EXPIRE=
    
    # Cookie expiration time in milliseconds
    COOKIE_EXPIRE=
    ```
3.  Duplicate the `config.example.env` file and rename it to `config.env`. Update the values for each parameter according to your configuration.
### Running the Application
1. Start the server:
    ```bash
    npm start
    ```
   By default, the server will run on the specified port in the config.env file.
2. Access the application at `http://localhost:{PORT}` in your browser.

### Important Notes

- Ensure that you never commit your config.env file to version control. Add it to your .gitignore file to prevent accidental commits.

- Keep your sensitive information, such as API keys and passwords, secure and do not share them publicly.

- Review the codebase and make necessary adjustments based on your project's requirements.

**Feel free to reach out if you have any questions or issues. Happy coding!**

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-Native.js]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactnative.dev/
[Node-url]: https://nodejs.org/en
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Python]: https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Mongodb-url]: https://www.mongodb.com/
[Mongo.db]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongodb-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/