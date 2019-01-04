let Bahan = require('../models/').Bahan

async function autoGenerateIdBahan () {
  try {
    let data = await Bahan.find({}).sort([['_id', 'descending']])
    if (data.length < 1){
      return '0001'
    } else {
      let lastId = data[0]["_id"]
      let newId = parseInt(lastId) + 1
      if (newId < 10) {
        newId = '000' + newId.toString()
      }
      else if (newId < 100) {
        newId = '00' + newId.toString()
      }
      else if (newId < 1000) {
        newId = '0' + newId.toString()
      }
      else if (newId < 10000) {
        newId = '' + newId.toString()
      }
      return newId
    }
  }
  catch(err) {
    console.log(err)
    return err
  }
}

// how to use
async function create_user() {
  Bahan.create({
    _id: await autoGenerateIdBahan(),
    nama_bahan: 'Bawang Merah',
    icon_bahan: 'http://www.erabaru.net/wp-content/uploads/2016/09/Manfaat-bawang-merah_kesehatan.jpg'
  })
}

create_user()

module.exports = autoGenerateIdBahan;
