# Description
    npm package for simple addons to postgres projects.
# Installation

    npm i postgres-queryparser --save
    let pg_parser = require('postgres-queryparser');
    

# How to use
## Version V 1.1.2:
    updated to considers array values with escape characters.
## Version V 1.1.1:
    initial method added for parseQuery.

Let's see about js code:

```js

let pg_parser = require('postgres-queryparser');
    
let query = `UPDATE users SET  users_fname= $1, users_lname= $2, users_sonof= $3, users_address= $4, users_postcode= $5, users_mobile= $6, users_email= $7 WHERE apikeys_id = $8`;
let values = ["fname" , "lname" , "sonof" , "address" , "postcode" , "9876543210" , "email@domain.com" , "12345" ];


console.log(pg_parser.parseQuery(query,values));
//UPDATE users SET  users_fname= 'fname', users_lname= 'lname', users_sonof= 'sonof', users_address= 'address', users_postcode= 'postcode', users_mobile= '9876543210', users_email= 'email@domain.com' WHERE apikeys_id = '12345'

```

## Support

Happy to add more, and need any updates, do get in touch on my telegram over [@chigovera](#https://t.me/chigovera)
