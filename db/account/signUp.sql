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
  facebook,
  instagram,
  profilePic
) values (
  ${firstname},
  ${lastname},
  ${username},
  ${email},
  ${phone},
  ${facebook},
  ${instagram},
  ${profilePic}
)returning user_id;

