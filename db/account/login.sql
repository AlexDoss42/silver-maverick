select *
from user_login ul
-- join user u on u.email = ul.email
where email = ${email};