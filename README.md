
# EVENT MANAGEMENT SYSTEM
To download and use the project. Follow the below instructions

## Clone the Project
To clone the project using HTTPS.
- Https
```
  git clone https://bishal721-admin@bitbucket.org/bishal721/yipl-log-processor.git
  ```
  Note: Use the following password to clone the project:
  ```
  ATBBGyDp2xqNzDUEb7RUXMDPWY7e7BAC86CE
  ```
  ## Setup Environment
  - Navigate to the client directory and install the dependencies:
  ``` 
  cd client
  npm install
  ```
  - Once complete, navigate back to the root directory:
  ```
  cd ..
  ```
  - Navigate to the server directory and install the dependencies:
 ```
    cd server/
    npm install
  ```
  - Add .env file on root directory of both Client and Server and populate with the below data
  - for client
    ```
    VITE_BACKEND_URL = http://localhost:8000
    ```
  - for server
    ```
    JWT_SECRET= Bz7123SHrt
    NODE_ENV = development
    FRONTEND_URL = YOUR FRONTEND URL
    ```  
  ## Run the Project 
  - In server directory use command below to start the server:
  ```
  npm start
  ```
- Open a new terminal, navigate to the client directory, and start the client:
  ```
  cd client/
  npm run dev
  ```
  

  This will start the development server and the client application. You can access the application in your web browser at the specified local address.

  
  
  
