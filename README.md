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
```


### Explanation

In this diagram:
- Hosts can have multiple Properties (one-to-many relationship), indicated by the arrow from `host_id` in the Host entity to `host_id` in the Property entity.
- Each Property is associated with a single Host.
- Guests can make multiple Bookings (one-to-many relationship), indicated by the arrow from `guest_id` in the Guest entity to `guest_id` in the Booking entity.
- Each Booking is associated with a single Property and a single Guest.

