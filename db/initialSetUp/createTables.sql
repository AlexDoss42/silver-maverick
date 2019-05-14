create table user (
  user_id serial primary key,
  firstName varChar(50),
  lastName varChar(50),
  email varChar(50),
  phone varChar(20),
  facebook varChar(50),
  instagram varChar(50),
  username varChar(50),
  profilePic text
);

create table user_login (
  login_id serial primary key,
  password text,
  email varChar(50)
);

create table trip (
  trip_id serial primary key,
  group_leader boolean,
  name varChar(50),
  user_id int references users(user_id)
);

create table pin (
  pin_id serial primary key,
  title varChar(50),
  media text,
  description varChar(400),
  url text,
  price int,
  address varChar(150),
  city varChar(50),
  state varChar(50),
  country varChar(50),
  user_id references users(user_id)
);

create table chat (
  chat_id serial primary key,
  message varChar(350),
  ts timestamp, 
  user_id int references users(user_id),
  trip_id int references trip(trip_id)
);

create table comment (
  comment_id serial primary key,
  comment varChar(350),
  vote int,
  global boolean,
  ts timestamp,
  pin_id int references pins(pin_id),
  user_id int references users(user_id),
  trip_id int references trip(trip_id)
);

create table gear (
  gear_id serial primary key,
  name varChar(50),
  trip_id int references trip(trip_id),
  user_id int references users(user_id)
);

create table todo (
  todo_id serial primary key,
  task varChar(180),
  trip_id int references trip(trip_id),
  user_id int references users(user_id)
)
