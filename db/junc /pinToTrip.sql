create table TripPin (
  trip_id int references trip(trip_id)
  pin_id int references pin(pin_id)
) 