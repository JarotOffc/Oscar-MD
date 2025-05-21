import {id} from '../language/index.js'

export async function before(m,{ conn }) {

	let lang = global.db.data.users[m.sender].language

	    let translations

   if (lang === "id") {  

     } else {

      translations = id

     }

	global.mssg = translations

	

}
