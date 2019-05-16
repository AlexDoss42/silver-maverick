select *
from trip t
join TripGroup tg
on t.trip_id = tg.trip_id
where tg.user_id = ${user_id}