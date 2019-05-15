select *
from pin p
join TripPin tp 
on p.pin_id = tp.pin_id
where tp.trip_id = ${trip_id}