const nodemailer = require('nodemailer');

module.exports = (email, nama, password) => {
  nodemailer.createTestAccount((err, account) => {
      // NB! Store the account object values somewhere if you want
      // to re-use the same account for future mail deliveries

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport(
          {
            service: 'gmail',
            auth: {
                user: process.env.SUPPORT_EMAIL, // generated ethereal user
                pass: process.env.SUPPORT_PASSWORD // generated ethereal password
            }
          },
          {
              // default message fields

              // sender info
              from: 'Ekantin Support <support@ekantin.id>',
          }
      );

      // Message object
      let message = {
          // Comma separated list of recipients
          to: nama+' '+email,

          // Subject of the message
          subject: 'Lupa password akun eKantin',

          // plaintext body
          text: `Hi ${nama},

  Baru-baru ini Kami diminta untuk mereset kata sandi untuk akun eKantin Anda.
  Anda dapat login kemBali menggunakan kata sandi sementara ini : ${password}
  Pastikan Anda mengganti kata sandi sementara ini setelah login untuk mejaga keamanan akun Anda.
  Jika Anda tidak meminta pengaturan ulang kata sandi, silakan abaikan email ini atau beri tahu kami.

  Terima Kasih.
  eKantin Team`,

          // HTML body
          html:
              '<p><b>Hi '+nama+'</b>,</p><br/>'+
              '<p>Baru-baru ini Kami diminta untuk mereset kata sandi untuk akun eKantin Anda.</p>'+
              '<p>Anda dapat login kembali menggunakan kata sandi sementara ini : '+password+'</p>'+
              '<p>Pastikan Anda mengganti kata sandi sementara ini setelah login untuk menjaga keamanan akun Anda</p>'+
              '<p>Terima Kasih.</p>'+
              '<p>eKantin Team</p>'
      };

      transporter.sendMail(message, (error, info) => {
          if (error) {
              console.log('Error occurred');
              console.log(error.message);
              return process.exit(1);
          }
          transporter.close();
      });
  });
};
