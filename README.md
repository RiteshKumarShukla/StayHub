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

### Diagram

 +-----------+        +-------------+
 |   Host    |        |   Property  |
 +-----------+        +-------------+
 |   host_id | <----+ | property_id |
 |   name    |      +---- host_id   |
 |   status  |           |   ...     |
 |  location |           +-------------+
 |  ...      |
 +-----------+

     1..*       1
     +---+     +---+
     |   |     |   |
     |   v     v   |
 +-------+     +-------+
 |  Guest  |     | Booking |
 +-------+     +-------+
 | guest_id |   | booking_id |
 |   name   |   |   guest_id |
 |  gender  |   | property_id |
 |   dob    |   |   ...     |
 |   bio    |   +-------+
 +-------+
