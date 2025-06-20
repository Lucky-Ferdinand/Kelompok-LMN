import { useState, useEffect } from "react";
import { jobAPI } from "../services/jobAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Job() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    title_job: "",
    company_name: "",
    job_type: "",
    location: "",
    salary_min: "",
    salary_max: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (job) => {
    setIsEditMode(true);
    setEditId(job.id);
    setDataForm({ ...job });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      let imageUrl = dataForm.image;
      if (file) {
        imageUrl = await uploadToSupabase(file);
      }

      const payload = {
        ...dataForm,
        image: imageUrl,
      };

      if (isEditMode && editId) {
        await jobAPI.updateJob(editId, payload);
        setSuccess("Lowongan berhasil diperbarui!");
      } else {
        await jobAPI.createJob(payload);
        setSuccess("Lowongan berhasil ditambahkan!");
      }

      setDataForm({
        title_job: "",
        company_name: "",
        job_type: "",
        location: "",
        salary_min: "",
        salary_max: "",
        category: "",
        description: "",
        image: "",
      });
      setFile(null);
      setIsEditMode(false);
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
      loadJobs();
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
      await jobAPI.deleteJob(id);
      loadJobs();
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobAPI.fetchJobs();
      setJobs(data);
    } catch (err) {
      setError("Gagal memuat data lowongan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Lowongan</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4">
        <input name="title_job" placeholder="Judul Pekerjaan" value={dataForm.title_job} onChange={handleChange} required className="input" />
        <input name="company_name" placeholder="Nama Perusahaan" value={dataForm.company_name} onChange={handleChange} required className="input" />
        <input name="job_type" placeholder="Jenis Pekerjaan" value={dataForm.job_type} onChange={handleChange} className="input" />
        <input name="location" placeholder="Lokasi" value={dataForm.location} onChange={handleChange} className="input" />
        <input name="salary_min" type="number" placeholder="Gaji Minimum" value={dataForm.salary_min} onChange={handleChange} className="input" />
        <input name="salary_max" type="number" placeholder="Gaji Maksimum" value={dataForm.salary_max} onChange={handleChange} className="input" />
        <input name="category" placeholder="Kategori" value={dataForm.category} onChange={handleChange} className="input" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
        <textarea name="description" placeholder="Deskripsi" value={dataForm.description} onChange={handleChange} className="col-span-2 input" rows={3}></textarea>

        <div className="col-span-2 flex gap-4">
          <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl">
            {loading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah"}
          </button>
          {isEditMode && (
            <button type="button" onClick={() => {
              setIsEditMode(false);
              setEditId(null);
              setDataForm({
                title_job: "", company_name: "", job_type: "", location: "",
                salary_min: "", salary_max: "", category: "", description: "", image: ""
              });
              setFile(null);
            }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl">
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Daftar Lowongan ({jobs.length})</h3>

        {loading && <LoadingSpinner text="Memuat lowongan..." />}
        {!loading && jobs.length === 0 && <EmptyState text="Belum ada lowongan." />}
        {!loading && jobs.length > 0 && (
          <GenericTable
            columns={["#", "Judul", "Perusahaan", "Kategori", "Gaji", "Image", "#", "#"]}
            data={jobs}
            renderRow={(job, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-semibold">{job.title_job}</td>
                <td className="px-4 py-2">{job.company_name}</td>
                <td className="px-4 py-2">{job.category}</td>
                <td className="px-4 py-2">{job.salary_min} - {job.salary_max}</td>
                <td className="px-4 py-2">
                  {job.image && <img src={job.image} alt="image" className="w-10 h-10 object-contain rounded" />}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(job)}><AiFillEdit className="text-blue-500 hover:text-blue-700 text-xl" /></button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(job.id)}><AiFillDelete className="text-red-500 hover:text-red-700 text-xl" /></button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
