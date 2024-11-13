# ShopAround

ShopAround is a mobile application designed to compare prices of products in local shops, helping users find the cheapest options in their area. The app provides functionalities to search for products, find nearby stores, manage favourite items, and browse products by category.

Back end repo available here https://github.com/JoeMosley96/shop-around-be

Features

- Go Shopping: Find the cheapest price for a desired product within a specified radius from your current location.
- Get Local Stores: View all stores within a given radius from your current location.
- Report Price: Report the price paid for a product and where it was bought.
- Get Favourites: Manage and view a list of favourite products.

Tech Stack
- Backend: Python, Django, Django REST Framework, PostgreSQL with PostGIS extension
- Frontend: JavaScript, React Native, Tailwind CSS, Google Maps API, Expo
- Testing: Pytest

Frontend Setup
1) Make sure that Node.js is running on your computer - at least version v21.7.3

2) Make sure that Expo Go is installed on your smartphone

3) Clone the repository:
```
git clone https://github.com/JoeMosley96/shop-around-fe.git
```

4) Navigate to project directory
```
cd shop-around-fe
```

5) Get a Google maps API key (https://developers.google.com/maps/documentation) and create a .env file in the root folder containing the API key in the following format: 
```
EXPO_PUBLIC_MAPS_API_KEY="<your_api_key_here>"
```

6) Install dependancies
```
npm install
```

7) Start the app emulator
```
npx expo start -c --tunnel
```

8) Open Expo Go on your smartphone, select "Scan QR code" and aim the camera at the QR code in the terminal. The app will now load

