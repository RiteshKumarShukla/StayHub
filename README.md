# StayHub
StayHub: Your gateway to unforgettable stays and seamless travel experiences

## Entity Relationship (ER) Diagram

This diagram provides a visual representation of the entities and their relationships in the Homestead Horizon vacation rental platform.

### Overview

The ER diagram illustrates the relationships between the following entities:

- Hosts
- Properties
- Guests
- Bookings

![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/dccd5627-0a42-4832-a58f-bfb71cca62b4)

### Explanation

In this diagram:
- The Host entity represents individuals who provide rental properties. Each Host can have multiple Properties, forming a one-to-many relationship.
- The Property entity represents rental properties offered by Hosts. Each Property is associated with a single Host.
- The Guest entity represents individuals who book rental properties. Guests can make multiple Bookings.
- The Booking entity represents a reservation made by a Guest for a specific Property.


## UI Mockup

### Host Management Page

The host management page allows users to perform CRUD operations on host profiles.

| Functionality | Description |
| ------------- | ----------- |
| View Hosts | Display a list of host profiles |
| Create Host | Add a new host profile |
| Edit Host | Update an existing host profile |
| Delete Host | Remove a host profile from the system |

### Property Management Page

The property management page enables users to manage properties associated with hosts.

| Functionality | Description |
| ------------- | ----------- |
| View Properties | Show a list of properties |
| Add Property | Create a new property |
| Edit Property | Modify an existing property |
| Delete Property | Remove a property from the system |

### Guest Management Page

The guest management page allows users to handle guest profiles.

| Functionality | Description |
| ------------- | ----------- |
| View Guests | Display a list of guest profiles |
| Add Guest | Create a new guest profile |
| Edit Guest | Modify an existing guest profile |
| Delete Guest | Remove a guest profile from the system |

### Booking Management Page

The booking management page provides functionality to manage bookings made by guests.

| Functionality | Description |
| ------------- | ----------- |
| View Bookings | Show a list of bookings |
| Filter Bookings | Filter bookings by guest or property |
| Sort Bookings | Sort bookings by date or status |

### Property Listing Page

The property listing page allows guests to browse and book available properties.

| Functionality | Description |
| ------------- | ----------- |
| View Properties | Display a list of available properties |
| Filter Properties | Filter properties by location and type |
| Pagination | Navigate through multiple property listings |
| Property Details | Show more information about a property |
| Booking Process | Initiate the booking process for a property |


## API Endpoints

### Host Management API

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| GET    | /api/hosts              | Retrieve all hosts               |
| GET    | /api/hosts/{hostId}     | Retrieve a specific host         |
| POST   | /api/hosts              | Create a new host                |
| PUT    | /api/hosts/{hostId}     | Update a specific host           |
| DELETE | /api/hosts/{hostId}     | Delete a specific host           |

### Property Management API

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| GET    | /api/properties            | Retrieve all properties              |
| GET    | /api/properties/{propertyId} | Retrieve a specific property         |
| POST   | /api/properties            | Create a new property                |
| PUT    | /api/properties/{propertyId} | Update a specific property           |
| DELETE | /api/properties/{propertyId} | Delete a specific property           |

### Guest Management API

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| GET    | /api/guests             | Retrieve all guests              |
| GET    | /api/guests/{guestId}   | Retrieve a specific guest         |
| POST   | /api/guests             | Create a new guest                |
| PUT    | /api/guests/{guestId}   | Update a specific guest           |
| DELETE | /api/guests/{guestId}   | Delete a specific guest           |

### Booking Management API

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| GET    | /api/bookings              | Retrieve all bookings               |
| GET    | /api/bookings/{bookingId}  | Retrieve a specific booking          |
| POST   | /api/bookings              | Create a new booking                 |
| PUT    | /api/bookings/{bookingId}  | Update a specific booking            |
| DELETE | /api/bookings/{bookingId}  | Delete a specific booking            |

### Property Listing API

| Method | Endpoint                           | Description                                 |
| ------ | ---------------------------------- | ------------------------------------------- |
| GET    | /api/properties/listings           | Retrieve paginated list of properties        |
| GET    | /api/properties/{propertyId}/details | Retrieve detailed information for a property |




## Landing Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/54ddc5f5-c788-4d6c-a949-0f89eb481bef)

![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/2982b05b-b9fc-4d18-a2a3-4b4ac4fc87f8)


## SignUP Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/443d2c78-d33f-4aea-81bb-54c02b17b138)

## Login Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/f37123a7-a0a1-4804-a0b9-f3e0b3f48998)

## Properties Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/d0fd1f9c-3276-4d02-ada6-5d8389f4e8f2)

![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/224b1a0f-0a5b-43b0-83b3-f2085296934e)

## Bookings Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/62100dd8-fc59-4a65-a5a6-e4bb70358793)

## Checkout Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/104b60e2-145e-4374-bb21-e559fed6d491)


## Payment Page
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/625c8c4e-491a-4599-aa7e-163e46f7a8de)


## ChatBot Assistance
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/1d67d498-e762-44db-ba2a-4cd52bd215ed)


## Admin Dashboard
![image](https://github.com/RiteshKumarShukla/StayHub/assets/110231091/df274a96-4dc6-4f16-8223-1796277db10f)






