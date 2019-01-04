const Pelanggan = require('../../../models/').Pelanggan
const Transaksi = require('../../../models/').Transaksi

async function detailStaffSekolahTerdaftar (level_user, kode_sekolah, idPelanggan) {
  try {
    let dataPelanggan = await Pelanggan.findById(idPelanggan)
    let returnedObject = {
      _id: dataPelanggan._id,
      nip: dataPelanggan.username,
      nama: dataPelanggan.nama_pelanggan,
      telepon: dataPelanggan.telepon,
      email: dataPelanggan.email,
      alamat: dataPelanggan.alamat,
      foto: dataPelanggan.foto_pelanggan,
      saldo: dataPelanggan.saldo
    }
    let dataTransaksi = await Transaksi.find({kode_pelanggan: idPelanggan})
    let totalPembelian = 0
    let totalPengembalian = 0
    let totalPembelianArray = dataTransaksi.map((data) => {
      let temp =  {
        jumlahKembali: 0,
        jumlahPesan: 0
      }
      let jumlahPesanKembali = data.transaksi_detail.map((transaksi) => {
        temp.jumlahPesan += (transaksi.jumlah_pesan - transaksi.jumlah_kembali)
        temp.jumlahKembali += transaksi.jumlah_kembali
      })
      totalPembelian += temp.jumlahPesan
      totalPengembalian += temp.jumlahKembali
    })
    returnedObject.totalPembelian = totalPembelian
    returnedObject.totalPengembalian = totalPengembalian
    return {
      message: 'Request Success',
      status: 200,
      data: returnedObject
    }
  } catch (err) {
    console.log('src/controllers/manajemenSekolah/staff/listStaffSekolahTerdaftar/:40', err);
    return {
      message: 'Internal Server Error',
      status: 500
    }
  }
}

module.exports = detailStaffSekolahTerdaftar;
