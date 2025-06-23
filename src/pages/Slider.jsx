import { useState, useEffect } from "react";
import { sliderAPI } from "../services/sliderAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function SliderManagement() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    title_slider: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (slider) => {
    setIsEditMode(true);
    setEditId(slider.id);
    setDataForm({ ...slider });
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
        title_slider: dataForm.title_slider,
        image: imageUrl,
      };

      if (isEditMode && editId) {
        await sliderAPI.updateSlider(editId, payload);
        setSuccess("Data slider berhasil diperbarui!");
      } else {
        await sliderAPI.createSlider(payload);
        setSuccess("Data slider berhasil ditambahkan!");
      }

      setDataForm({ title_slider: "", image: "" });
      setFile(null);
      setIsEditMode(false);
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);

      await loadSliders(); // penting agar sinkron juga ke localStorage
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
      await sliderAPI.deleteSlider(id);
      await loadSliders(); // agar sinkronisasi setelah delete
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSliders = async () => {
    try {
      setLoading(true);
      const data = await sliderAPI.fetchSliders();
      setSliders(data);

      // Simpan ke localStorage untuk halaman guest
      const formatted = data.map((item) => ({
        id: item.id,
        title: item.title_slider,
        image: item.image,
      }));
      localStorage.setItem("sliders", JSON.stringify(formatted));
    } catch (err) {
      setError("Gagal memuat data slider");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Slider</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4"
      >
        <input
          name="title_slider"
          placeholder="Judul Slider"
          value={dataForm.title_slider}
          onChange={handleChange}
          className="input col-span-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input col-span-2"
        />

        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            {loading ? "Menyimpan..." : isEditMode ? "Simpan Perubahan" : "Tambah"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setEditId(null);
                setDataForm({ title_slider: "", image: "" });
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
        <h3 className="text-xl font-semibold mb-4">Daftar Slider ({sliders.length})</h3>

        {loading && <LoadingSpinner text="Memuat data..." />}
        {!loading && sliders.length === 0 && <EmptyState text="Belum ada data slider." />}
        {!loading && sliders.length > 0 && (
          <GenericTable
            columns={["#", "Judul", "Gambar", "#", "#"]}
            data={sliders}
            renderRow={(item, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-semibold">{item.title_slider}</td>
                <td className="px-4 py-2">
                  {item.image && (
                    <img
                      src={item.image}
                      alt="slider"
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(item)}>
                    <AiFillEdit className="text-blue-500 hover:text-blue-700 text-xl" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(item.id)}>
                    <AiFillDelete className="text-red-500 hover:text-red-700 text-xl" />
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
