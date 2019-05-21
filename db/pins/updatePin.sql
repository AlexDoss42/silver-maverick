update pin

set title = ${title},
    media_url = ${media_url},
    description = ${description},
    url = ${url},
    price = ${price},
    address = ${address},
    city = ${city},
    state = ${state},
    country = ${country}

where pin_id = ${id};