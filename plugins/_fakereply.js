import fetch from 'node-fetch';
export async function before(m, { conn }) {
   let pp = await this.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/1ZxrXKJ/avatar-contact.jpg');

  let nam = "OSCAR-MD"
  
  // Respuesta con enlace de WhatsApp
  global.rpl = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }, 
      externalAdReply: {
        mediaUrl: bgp,
        mediaType: 'VIDEO',
        description: 'support group',
        title: bottime,
        body: 'y',
        thumbnailUrl: pp,
        sourceUrl: bgp
      }
    }
  };
  
  // Respuesta con enlace de Canal de WhatsApp
  global.rcanal = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }, 
      externalAdReply: {
        mediaUrl: canal,
        mediaType: 'VIDEO',
        description: 'y',
        title: bottime,
        body: 'y',
        thumbnailUrl: pp,
        sourceUrl: canal
      }
    }
  }
  
    // Forwarded
  global.fwc = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }
    }
  }

  // Respuesta con enlace de PayPal
  global.rpyp = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }, 
      externalAdReply: {
        mediaUrl: pyp,
        mediaType: 'VIDEO',
        description: 'Donate',
        title: bottime,
        body: 'y',
        thumbnailUrl: pp,
        sourceUrl: pyp
      }
    }
  };

  // Respuesta con enlace de Instagram
  global.rpig = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }, 
      externalAdReply: {
        mediaUrl: ig,
        mediaType: 'VIDEO',
        description: 'Instagram',
        title: bottime,
        body: 'Instagram',
        thumbnailUrl: pp,
        sourceUrl: ig
      }
    }
  };

  // Respuesta con enlace de YouTube
  global.rpyt = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: id_canal,
      serverMessageId: 100,
      newsletterName: nam,
    }, 
      externalAdReply: {
        showAdAttribution: true,
        mediaUrl: yt,
        mediaType: 'VIDEO',
        description: 'Suscribete: ' + yt,
        title: 'YouTube',
        body: 'y',
        thumbnailUrl: pp,
        sourceUrl: yt
      }
    }
  }
  
  //---
  
  global.business =  await conn.getBusinessProfile(conn.user.jid)
  
  //---
  
  
}