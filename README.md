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

```
  +-------------+      1          1         1         1
  |    Host     | <---------+---------> +--------> | Property |
  +-------------+              *          *          +----------+
  |   host_id   |           +--------+  +---------+ | property_id |
  |    name     |           | status |  | location | |   host_id   |
  |   location  |           |   ...  |  | property | |  property_type |
  |   ...       |           +--------+  |   type   | |    about     |
  | hosting_since|                      |   ...    | +-------------+
  +-------------+                      +---------+

     1        1
   +---+     +---+
   |   |     |   |
   |   v     v   |
 +--------+ +--------+
 |  Guest | | Booking |
 +--------+ +--------+
 |guest_id| |booking_id|
 |  name  | |guest_id  |
 | gender | |property_id|
 |   dob  | |   ...    |
 |   bio  | +--------+
 +--------+

```


### Explanation

In this diagram:
- Hosts can have multiple Properties (one-to-many relationship), indicated by the arrow from `host_id` in the Host entity to `host_id` in the Property entity.
- Each Property is associated with a single Host.
- Guests can make multiple Bookings (one-to-many relationship), indicated by the arrow from `guest_id` in the Guest entity to `guest_id` in the Booking entity.
- Each Booking is associated with a single Property and a single Guest.


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
