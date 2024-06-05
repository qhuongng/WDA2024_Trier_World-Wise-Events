# World-Wise Events - Learn About World-wide Cultural Festival Through Fun Quizzes And Communities

This is a Top-6 entry for **2024 WebDev Adventure**, a contest hosted by the Web Development Club at VNU-HCM, University of Information Technology.

## Project contributors
1. Nguyễn Quỳnh Hương ([qhuongng](https://github.com/qhuongng))
2. Đặng Nhật Hòa ([hoadang0305](https://github.com/hoadang0305))
3. Nguyễn Bùi Mẫn Nhi ([nhinbm](https://github.com/nhinbm))
4. Huỳnh Thiện Hữu ([HuynhLeonard](https://github.com/HuynhLeonard))

## General information
The system was developed using the MERN stack and Mapbox GL JS API. It fosters cultural awareness and a sense of community by allowing users to explore cultural festivals around the world by participating in discussion forums and taking fun quizzes. Features include:

- A map to display markers of locations that host a cultural festival, as well as specifying which festival is currently happening.

- A discussion forum for each festival where users can discuss and learn from other festival-goers.

- Quizzes that users can take to learn more about each festival and have their results available on the festival's leaderboard.

As of now, Google's signin portal is not working as expected in the production deployment. This is being investigated.

Features considered for future development include:
- AI integration for content moderation and translation, as well as automated generation and maintenance of the question bank.

- Allowing users to add new festivals to the map. 

## Demo
The website is hosted on Vercel at [https://trier-worldwise-events.vercel.app](https://trier-worldwise-events.vercel.app/). A demo video is also available on [YouTube](https://youtu.be/Idk0jJvVCXQ).

## Build & run the system locally
[Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are required to build and run the system. A [Google OAuth client](https://support.google.com/cloud/answer/6158849?hl=en#zippy=) is also needed to enable Google signin functionality on the website, and a [MapBox API token](https://www.mapbox.com/) is needed for the map to function.

1. Clone the repository for local development.
   
2. Navigate to the **server** folder.
    - Set up a **.env** file in the same directory as **package.json** with the following variables:
     
        ```
          PORT = 3600
          MONGO_URL = mongodb+srv://nhathoa22:18102018nhathoa@cluster0.kxofuma.mongodb.net/WebDevTrier?retryWrites=true&w=majority
          CLIENT_ID = <YOUR GOOGLE OAUTH CLIENT ID>
          CLIENT_SECRET = <YOUR GOOGLE OAUTH CLIENT SECRET>
          USER_TOKEN = normalUser
          NODE_ENV = development
          
          USER_URL = http://localhost:3000
          SERVER_PUBLIC_URL = http://localhost:3600/api/picture
          SERVER_URL = http://localhost:3600
        ```
    - Run `npm i` to install the required dependencies.

3. Navigate to the **user** folder.
    - Set up a **.env** file in the same directory as **package.json** with the following variables:
     
        ```
          REACT_APP_SERVER_BASE_URL = http://localhost:3600
          REACT_APP_MAPBOX_TOKEN = <YOUR MAPBOX TOKEN>
        ```
    - Run `npm i` to install the required dependencies.

4. Navigate to the root folder and run `npm i` to install the required dependencies.

5. Run `npm run dev` to build and run the project. The server should be available at **http://<i></i>localhost:3600** and the user client at **http://<i></i>localhost:3000**.
