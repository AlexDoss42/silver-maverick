update users

set firstname = ${firstname},
    lastname = ${lastname},
    email = ${email},
    phone = ${phone},
    venmo = ${venmo}
    profilePic = ${profilePic}

where user_id = ${id}