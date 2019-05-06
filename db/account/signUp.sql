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
);

insert into user_login (
  username, 
  password,
  email
) values (
  ${username},
  ${hash},
  ${email}
) returning username, password, email;