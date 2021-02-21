import React, { Component } from 'react'


let dataInput = [
    {
        labelName: 'Nama Lengkap',
        typeData: 'text',
        stateName: 'data_nama'
    },
    {
        labelName: 'Nomor Induk Kependudukan (NIK)',
        typeData: 'number',
        stateName: 'data_nik'
    },
    {
        labelName: 'Nomor Kartu Keluarga',
        typeData: 'number',
        stateName: 'data_noKK'
    },
    {
        labelName: 'Foto KTP',
        typeData: 'file',
        stateName: 'data_fotoKTP'
    },
    {
        labelName: 'Foto Kartu Keluarga',
        typeData: 'file',
        stateName: 'data_fotoKK'
    },
    {
        labelName: 'Umur',
        typeData: 'number',
        stateName: 'data_umur'
    },
    {
        labelName: 'Jenis Kelamin',
        typeData: 'text',
        stateName: 'data_jenisKelamin'
    },
    {
        labelName: 'Alamat',
        typeData: 'text',
        stateName: 'data_alamat'
    },
    {
        labelName: 'RT',
        typeData: 'number',
        stateName: 'data_RT'
    },
    {
        labelName: 'RW',
        typeData: 'number',
        stateName: 'data_RW'
    },
    {
        labelName: 'Penghasilan Sebelum Pandemic',
        typeData: 'number',
        stateName: 'data_penghasilanSebelum'
    },
    {
        labelName: 'Penghasilan Setelah Pandemic',
        typeData: 'number',
        stateName: 'data_penghasilanSetelah'
    },
]
export class App extends Component {
    state={
        data_nama: "",
        data_nik: "",
        data_noKK: "",
        data_fotoKTP: "",
        data_fotoKK: "",
        data_umur: "",
        data_jenisKelamin: "",
        data_alamat: "",
        data_RT: "",
        data_RW: "",
        data_penghasilanSebelum: "",
        data_penghasilanSetelah: "",
        data_alasanBuntuan: "",
        isAlasan: false,
        aggrement: false
    }

    postDataInput = () => {
        let { data_RT, data_RW, data_alamat, data_alasanBuntuan, data_fotoKK, data_fotoKTP, data_jenisKelamin, data_nama, data_nik, data_noKK, data_penghasilanSebelum, data_penghasilanSetelah ,data_umur, aggrement } = this.state

        if(!data_RT ||  !data_RW ||  !data_alamat ||  !data_alasanBuntuan ||  !data_fotoKK || !data_fotoKTP || !data_jenisKelamin || !data_nama || !data_nik || !data_noKK || !data_penghasilanSebelum || !data_penghasilanSetelah || !data_umur){
            return(
                alert("Data Yang Anda Masukan Belum Lengkap")
            )
        }else{
            if(aggrement){
                alert('Berhasil, Data sudah tersimpan.')
                console.log(
                    `nama: ${data_nama}, nik: ${data_nik}, Nomor KK : ${data_noKK}, foto ktp : ${data_fotoKTP}, foto kk : ${data_fotoKK}, umur: ${data_umur}, jenis kelamin: ${data_jenisKelamin}, alamat: ${data_alamat}, rt: ${data_RT}, rw: ${data_RW}, penghasilan sebelum pandemic: ${data_penghasilanSebelum}, penghasilan setelah pandemic: ${data_penghasilanSetelah}, alasan butuh bantuan: ${data_alasanBuntuan}` 
                )
            }else{
                alert("Silahkan Centang Pernyataan di bawah")
            }
        }
    };

    handleOnchangeInput = (event, property) => {
        let changed = {}
        changed[property] = event.target.value
        this.setState(changed)
    };

    handleChangeInputAlasan = (e) => {
        console.log(parseInt(e) === 4)
        if(parseInt(e) === 4){
            this.setState({isAlasan: true})
        }else{
            this.setState({data_alasanBuntuan: e, isAlasan: false})
        }
    };

    renderInput = () =>{
        let dataInputs = dataInput.map((data, index)=>{
            if(data.stateName !== "data_jenisKelamin"){
                return (
                    <div
                    key={index}
                    >
                        <label htmlFor={data.stateName}> {data.labelName} </label>
                        <input 
                            className='form-control' 
                            type={data.typeData}
                            onChange={e=>{this.handleOnchangeInput(e, data.stateName)}}
                        />
                        {
                            data.stateName === "data_fotoKTP" ? <p>*File Maksimal 2MB, Formal JPG/JPEG/PNH/BMP</p> : null 
                        }
                        {
                            data.stateName === "data_fotoKK" ? <p>*File Maksimal 2MB, Formal JPG/JPEG/PNH/BMP</p> : null 
                        }
                        {
                            data.stateName === "data_alamat" ? <p>*Tidak melebihi 255 karakter</p> : null 
                        }
                    </div>
                )
            }else{
                return (
                    <div
                    key={index}
                    >
                        <label htmlFor="">Jenis Kelamin</label>
                        <select 
                        className='form-control' 
                        onChange={e=>this.handleOnchangeInput(e, data.stateName)}
                        >
                            <option value="laki-laki">Laki-Laki</option>
                            <option value="perempuan">Perempuan</option>
                        </select>
                    </div>
                )
            }
        })
        return dataInputs
    };

    render() {
        return (
            <div className="container w-50 border my-4">
                <div>
                    <h3>Selamat Datang di Aplikasi Pendataan Bantuan</h3>
                    {this.renderInput()}
                    <div>
                        <label htmlFor="">Alasan Membutuhkan Bantuan</label>
                        <select
                        className='form-control'
                        onChange={e=>this.handleChangeInputAlasan(e.target.value)}
                        >
                            <option value="1">Kehilangan Pekerjaan</option>
                            <option value="2">Kepala Keluarga Terdampak atau Korban Covid</option>
                            <option value="3">Tergolong Fakir/miskin Semenjak sebelum Covid</option>
                            <option value="4">Lainnya ...</option>
                        </select>
                    </div>
                    {
                        this.state.isAlasan ? 
                        <div>
                            <label htmlFor="">Lainnya</label>
                            <input 
                            type="text"
                            className='form-control'
                            onChange={e=>{this.handleOnchangeInput(e, "data_alasanBuntuan")}}
                            />
                        </div>
                        : null
                    }
                    <div className='d-flex flex-row my-5'>
                        <input
                        className='my-auto mr-3' 
                        type="checkbox"
                        onChange={e=>{this.setState({aggrement: e.target.checked})}}
                        />
                        <label htmlFor="">Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</label>
                    </div>
                </div>
                <button
                    className='btn btn-success'
                    onClick={this.postDataInput}
                >
                    Submit
                </button>
            </div>
        )
    }
}

export default App
