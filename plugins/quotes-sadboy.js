import util from "util";
import path from "path";

let handler = async (m, { conn }) => {
	conn.sendFile(m.chat, `${sad.getRandom()}`, "nt.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.tags = ['quotes']
handler.command = handler.help = ['sadboy']
handler.limit = true
export default handler;

const sad = [
"https://drive.google.com/uc?export=download&id=106ST5L0SicT26WffXK3mMx9KTWi3Ugst",
"https://drive.google.com/uc?export=download&id=12Bb-UXNVUEBPGDM90V36n35OO3hoMEL7",
"https://drive.google.com/uc?export=download&id=12GTS6v16v8gFoRDMj8norsnDItwL7IJU",
"https://drive.google.com/uc?export=download&id=12FATT_VBvYIfoTghjYJlIBkDRJBJembg",
"https://drive.google.com/uc?export=download&id=12GTTN_JrUuZd37nXMaiwtnZpX36030e8",
"https://drive.google.com/uc?export=download&id=12JCCisvgAxOyLxVEAPbXLkO00debAqPN",
"https://drive.google.com/uc?export=download&id=12MbqJz9ybpPuC8vyPzjbV-QGQYWKAU_i",
"https://drive.google.com/uc?export=download&id=12PvK8dNd2ULq-yx-BXDPR5_RG_Z-5Ll3",
"https://drive.google.com/uc?export=download&id=11sMJpaJFRUPzIXkVZKaU2wd_uvvudQ1D",
"https://drive.google.com/uc?export=download&id=11rgEwMLx06RMzs65lSnVsKhFHuh0i2JK",
"https://drive.google.com/uc?export=download&id=11roxgv00GFsKE7nFPgMG74PBL-tESdmY",
"https://drive.google.com/uc?export=download&id=120JjMEbX9pxOoOuKv95qDCSIX7Us_UMm",
"https://drive.google.com/uc?export=download&id=12-WACr4nA1BKjjForzpXNavY80qEUCzS",
"https://drive.google.com/uc?export=download&id=121uzvdsHQRgbouwgq1y8imafNdRaFAeE",
"https://drive.google.com/uc?export=download&id=12AFSESxcGZ2YNnTHy-wRzZGESNBbpqpL",
"https://drive.google.com/uc?export=download&id=126CbvQ8QXS3tTNTX80VVl5EMk87-mnzO",
"https://drive.google.com/uc?export=download&id=123HJ5A_KChxh2A7EDHB55N_wCUzkRkiq"
]