create table TripGroup (
  trip_id int references trip(trip_id),
  user_id int references users(user_id),
  group_leader boolean
) 