import { useState, useEffect } from "react";
import { companyAPI } from "../services/companyAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function CompanyProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    company_name: "",
    description: "",
    logo: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (company) => {
    setIsEditMode(true);
    setEditId(company.id);
    setDataForm({ ...company });
    setFile(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    setError("");
    setSuccess("");

    let logoUrl = dataForm.logo;
    if (file) {
      logoUrl = await uploadToSupabase(file); // Upload dan dapatkan URL
    }

    const payload = {
      company_name: dataForm.company_name,
      description: dataForm.description,
      logo: logoUrl,
      address: dataForm.address,
    };

    if (isEditMode && editId) {
      await companyAPI.updateCompany(editId, payload);
      setSuccess("Data perusahaan berhasil diperbarui!");
    } else {
      await companyAPI.createCompany(payload);
      setSuccess("Data perusahaan berhasil ditambahkan!");
    }

    setDataForm({
      company_name: "",
      description: "",
      logo: "",
      address: "",
    });
    setFile(null);
    setIsEditMode(false);
    setEditId(null);
    setTimeout(() => setSuccess(""), 3000);
    loadCompanies();
  } catch (err) {
    setError("Gagal menyimpan data: " + err.message);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      setLoading(true);
      await companyAPI.deleteCompany(id);
      loadCompanies();
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyAPI.fetchCompanies();
      setCompanies(data);
    } catch (err) {
      setError("Gagal memuat data perusahaan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profil Perusahaan</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4">
        <input name="company_name" placeholder="Nama Perusahaan" value={dataForm.company_name} onChange={handleChange} className="input" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
        <input name="address" placeholder="Alamat" value={dataForm.address} onChange={handleChange} className="col-span-2 input" />
        <textarea name="description" placeholder="Deskripsi Perusahaan" value={dataForm.description} onChange={handleChange} className="col-span-2 input" rows={3}></textarea>

        <div className="col-span-2 flex gap-4">
          <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl">
            {loading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setEditId(null);
                setDataForm({ company_name: "", description: "", logo: "", address: "" });
                setFile(null);
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Daftar Perusahaan ({companies.length})</h3>

        {loading && <LoadingSpinner text="Memuat data..." />}
        {!loading && companies.length === 0 && <EmptyState text="Belum ada data perusahaan." />}
        {!loading && companies.length > 0 && (
          <GenericTable
            columns={["#", "Nama", "Alamat", "Logo", "#", "#"]}
            data={companies}
            renderRow={(item, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-semibold">{item.company_name}</td>
                <td className="px-4 py-2">{item.address}</td>
                <td className="px-4 py-2">
                  {item.logo && <img src={item.logo} alt="logo" className="w-10 h-10 object-contain rounded" />}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(item)}><AiFillEdit className="text-blue-500 hover:text-blue-700 text-xl" /></button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(item.id)}><AiFillDelete className="text-red-500 hover:text-red-700 text-xl" /></button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
