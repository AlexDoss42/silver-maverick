insert into user_login (
  password,
  email
) values (
  ${hash},
  ${email}
);

insert into users (
  firstname, 
  lastname,
  username, 
  email,
  phone,
  venmo,
  profilePic
) values (
  ${firstname},
  ${lastname},
  ${username},
  ${email},
  ${phone},
  ${venmo},
  ${profilePic}
)returning user_id;

