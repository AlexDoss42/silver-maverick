create table users (
  user_id serial primary key,
  firstName varChar(50),
  lastName varChar(50),
  email varChar(50),
  phone varChar(20),
  facebook varChar(50),
  instagram varChar(50),
  profilePic text
);

create table user_login (
  login_id serial primary key,
  username varChar(50),
  password text,
  email varChar(50)
);

create table pins (
  pin_id serial primary key,
  title varChar(50),
  media text,
  description varChar(400),
  url text,
  price int,
  address varChar(150),
  city varChar(50),
  state varChar(50),
  country varChar(50)
);

create table trip (
  group_id serial primary key,
  group_leader boolean,
  user_id int references user_id(users),
  pin_id int references pin_id(pins)
);

create table chat (
  chat_id serial primary key,
  message varChar(350),
  ts timestamp, 
  user_id int references user_id(users),
  group_id int references group_id(trip)
);

create table comments (
  comment_id serial primary key,
  comment varChar(350),
  vote int,
  global boolean,
  ts timestamp,
  pin_id int references pin_id(pins),
  user_id int references user_id(users),
  group_id int references group_id(trip)
);

create table gear (
  gear_id serial primary key,
  name varChar(50),
  group_id int references group_id(trip)
);

create table todo (
  todo_id serial primary key,
  task varChar(180),
  group_id int references group_id(trip)
)