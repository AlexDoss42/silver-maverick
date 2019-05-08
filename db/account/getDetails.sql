-- THIS NEEDS TO BE WORKED OUT SO YOU CAN GATHER ALL THE INFO ON THE PROFILE PAGE

select firstName, lastName, email, balance 
from users
join balances on users.user_id = balances.balance_id
where users.user_id = ${id};