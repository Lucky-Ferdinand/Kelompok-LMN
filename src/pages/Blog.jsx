import { useState, useEffect } from "react";
import { blogAPI } from "../services/blogAPI";
import { uploadToSupabase } from "../utils/supabaseUpload";
import AlertBox from "../components/components-Generic/AlertBox";
import EmptyState from "../components/components-Generic/EmptyState";
import GenericTable from "../components/components-Generic/GenericTable";
import LoadingSpinner from "../components/components-Generic/LoadingSpinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Blog() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);

  const [dataForm, setDataForm] = useState({
    author_name: "",
    published_at: "",
    title_blog: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (blog) => {
    setIsEditMode(true);
    setEditId(blog.id);
    setDataForm({ ...blog });
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
        await blogAPI.updateBlog(editId, payload);
        setSuccess("Blog berhasil diperbarui!");
      } else {
        await blogAPI.createBlog(payload);
        setSuccess("Blog berhasil ditambahkan!");
      }

      setDataForm({ author_name: "", published_at: "", title_blog: "", content: "", image: "" });
      setFile(null);
      setIsEditMode(false);
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
      loadBlogs();
    } catch (err) {
      setError("Gagal menyimpan data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus blog ini?")) return;

    try {
      setLoading(true);
      await blogAPI.deleteBlog(id);
      loadBlogs();
    } catch (err) {
      setError("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.fetchBlogs();
      setBlogs(data);
    } catch (err) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Blog</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4">
        <input name="author_name" placeholder="Nama Penulis" value={dataForm.author_name} onChange={handleChange} className="input" required />
        <input name="published_at" type="date" value={dataForm.published_at} onChange={handleChange} className="input" />
        <input name="title_blog" placeholder="Judul Blog" value={dataForm.title_blog} onChange={handleChange} className="col-span-2 input" required />
        <textarea name="content" placeholder="Isi Blog" value={dataForm.content} onChange={handleChange} className="col-span-2 input" rows={4}></textarea>
        <input type="file" accept="image/*" onChange={handleFileChange} className="input col-span-2" />

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
                setDataForm({ author_name: "", published_at: "", title_blog: "", content: "", image: "" });
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
        <h3 className="text-xl font-semibold mb-4">Daftar Blog ({blogs.length})</h3>

        {loading && <LoadingSpinner text="Memuat blog..." />}
        {!loading && blogs.length === 0 && <EmptyState text="Belum ada blog." />}
        {!loading && blogs.length > 0 && (
          <GenericTable
            columns={["#", "Judul", "Penulis", "Tanggal", "Gambar", "#", "#"]}
            data={blogs}
            renderRow={(blog, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-bold">{blog.title_blog}</td>
                <td className="px-4 py-2">{blog.author_name}</td>
                <td className="px-4 py-2">{blog.published_at}</td>
                <td className="px-4 py-2">{blog.image && <img src={blog.image} alt="blog" className="w-10 h-10 object-cover rounded" />}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleEdit(blog)}><AiFillEdit className="text-blue-500 hover:text-blue-700 text-xl" /></button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(blog.id)}><AiFillDelete className="text-red-500 hover:text-red-700 text-xl" /></button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
