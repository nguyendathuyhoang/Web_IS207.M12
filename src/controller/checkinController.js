import pool from '../configs/connectDB';

let checkin = async (req, res) => {
    // const mysql = require('mysql2/promise');
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'datvemaybay'});
    let inputMa = req.body.MaDatCho;
    let inputTen = req.body.HoTen;
    const [duLieuKH] = await pool.execute('SELECT * FROM khachhang WHERE MaDatCho = ? And HoTen = ?', [inputMa, inputTen]);
    if (duLieuKH == '') res.redirect('/checkin.ejs')

    let maVe = duLieuKH[0].MaVe;
    const [duLieuVe] = await pool.execute('SELECT * FROM vemaybay WHERE MaVe = ?', [maVe]);
    let maChuyenBay = duLieuVe[0].MaChuyenBay;
    const [duLieuCB] = await pool.execute('SELECT * FROM chuyenbay WHERE MaChuyenBay = ?', [maChuyenBay]);
    //const [duLieuDV] = await pool.execute('SELECT * FROM dichvuchuyenbay WHERE MaDatCho = ?', [inputMa]);
    (res.render('thutuctructuyen.ejs', {
        title: 'Kết quả chuyến bay của bạn', dataKH: duLieuKH, dataCB: duLieuCB
        , maCB: maChuyenBay
    }));
}
module.exports = checkin