# Node.js Project with PM2

This project is a Node.js application that requires some setup steps before running. Follow the instructions below to install and run the application.

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2.	**Install dependencies:** This project uses Yarn to manage dependencies. Run the following command to install them:
   ```bash
   yarn install
   ```

3.	**Install PM2:** PM2 is required to manage the application’s processes. Install it globally using:
  ```bash
  npm install -g pm2
  ```



4.	**Edit the pm2.config.js file:** This file contains the configuration required for the application. Open it and fill in any necessary settings, such as environment variables or specific project configurations. Ensure the file is complete and correctly set up before proceeding.



# Running the Application
 ---
 
1.	**Start the application:**
   Use PM2 to start the application with the configuration file:
  	```bash
    pm2 start pm2.config.js

2.	**Stop the application:**
 To stop the application:
 ```bash
  pm2 stop pm2.config.js
```

3.	**Restart the application:**
  To restart the application:
  ```bash
  pm2 restart pm2.config.js
 ```


5.	**Check the status of the application:**
   To view the status of the running application:
 ```bash
 pm2 status

