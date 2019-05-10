insert into user_login (
  username, 
  password,
  email
) values (
  ${username},
  ${hash},
  ${email}
);

insert into users (
  firstname, 
  lastname, 
  email,
  phone,
  facebook,
  instagram,
  profilePic
) values (
  ${firstname},
  ${lastname},
  ${email},
  ${phone},
  ${facebook},
  ${instagram},
  ${profilePic}
)returning user_id;

