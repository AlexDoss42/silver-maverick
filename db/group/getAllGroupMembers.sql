select *
from users u
join TripGroup tg
on u.user_id = tg.user_id
where tg.trip_id = ${trip_id}