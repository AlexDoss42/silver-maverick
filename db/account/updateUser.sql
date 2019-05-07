update users

set firstname = ${firstname},
    lastname = ${lastname},
    email = ${email},
    phone = ${phone},
    facebook = ${facebook},
    instagram = ${instagram},
    profilePic = ${profilePic}

where user_id = ${id}