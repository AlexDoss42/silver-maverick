with t AS
(insert into trip (
  name,
  user_id
) values (
  ${name},
  ${user_id}
) returning trip_id
)
insert into TripGroup (
  group_leader, 
  trip_id, 
  user_id
) values (
  ${group_leader}, 
  (SELECT trip_id FROM t), 
  ${user_id}
)