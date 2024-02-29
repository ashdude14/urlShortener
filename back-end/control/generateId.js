const ShortUniqueId = require('short-unique-id')
const { randomUUID } = new ShortUniqueId({ length: 7 });

//ash.link/
// 35,21,61,46,06,208 unique id can be generated
const generateId=()=>{
let custom=""
custom+=randomUUID();
return custom;
}


module.exports = {
    generateId,
}