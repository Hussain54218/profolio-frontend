import React, { useContext, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const ProjectsSection = () => {
  const { projects, addProject, deleteProject, rateProject } = useContext(ProjectContext);
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: null,
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [ratingModal, setRatingModal] = useState({ show: false, projectId: null, rating: 0 });

  // عرض الإشعارات
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProject({ ...newProject, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      showNotification("عنوان و توضیحات پروژه ضروری است", "error");
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.keys(newProject).forEach((key) => {
      if (newProject[key]) formData.append(key, newProject[key]);
    });

    try {
      await addProject(formData);
      setNewProject({ title: "", description: "", technologies: "", github: "", liveDemo: "", image: null });
      setPreviewImage(null);
      showNotification("پروژه با موفقیت اضافه شد", "success");
    } catch (error) {
      console.error("Error adding project:", error);
      showNotification("خطا در افزودن پروژه", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRateClick = (id) => {
    setRatingModal({ show: true, projectId: id, rating: 0 });
  };

  const handleRateConfirm = async () => {
    if (!ratingModal.rating || ratingModal.rating < 1 || ratingModal.rating > 5) {
      showNotification("لطفاً امتیاز معتبر بین 1 تا 5 وارد کنید", "error");
      return;
    }

    try {
      await rateProject(ratingModal.projectId, ratingModal.rating);
      setRatingModal({ show: false, projectId: null, rating: 0 });
      showNotification("امتیاز شما ثبت شد", "success");
    } catch (error) {
      console.error("Error rating project:", error);
      showNotification("خطا در ثبت امتیاز", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("آیا از حذف این پروژه اطمینان دارید؟")) {
      try {
        await deleteProject(id);
        showNotification("پروژه با موفقیت حذف شد", "success");
      } catch (error) {
        console.error("Error deleting project:", error);
        showNotification("خطا در حذف پروژه", "error");
      }
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* نافتیفیکیشن */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      {/* مودال امتیازدهی */}
      {ratingModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">امتیازدهی به پروژه</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">امتیاز (1 تا 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={ratingModal.rating}
                onChange={(e) => setRatingModal({...ratingModal, rating: parseFloat(e.target.value) || 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="امتیاز بین 1 تا 5"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRatingModal({ show: false, projectId: null, rating: 0 })}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                انصراف
              </button>
              <button
                onClick={handleRateConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                تأیید امتیاز
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">مدیریت پروژه‌ها</h2>

      {/* فرم افزودن پروژه جدید */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-indigo-700">افزودن پروژه جدید</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان پروژه</label>
            <input 
              type="text" 
              name="title" 
              value={newProject.title} 
              onChange={handleChange} 
              placeholder="عنوان پروژه" 
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تکنولوژی‌ها</label>
            <input 
              type="text" 
              name="technologies" 
              value={newProject.technologies} 
              onChange={handleChange} 
              placeholder="تکنولوژی‌ها (با کاما جدا کنید)" 
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس GitHub</label>
            <input 
              type="text" 
              name="github" 
              value={newProject.github} 
              onChange={handleChange} 
              placeholder="آدرس GitHub" 
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس دموی زنده</label>
            <input 
              type="text" 
              name="liveDemo" 
              value={newProject.liveDemo} 
              onChange={handleChange} 
              placeholder="آدرس دموی زنده" 
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" 
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">تصویر پروژه</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*" 
                  id="project-image-upload"
                />
                <label 
                  htmlFor="project-image-upload" 
                  className="block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 transition"
                >
                  انتخاب تصویر
                </label>
              </div>
              {newProject.image && (
                <span className="text-sm text-gray-600">{newProject.image.name}</span>
              )}
            </div>
          </div>
          
          {previewImage && (
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">پیش‌نمایش تصویر:</p>
              <img src={previewImage} alt="Preview" className="w-full h-48 object-contain rounded-lg mt-2 border" />
            </div>
          )}
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات پروژه</label>
            <textarea 
              name="description" 
              value={newProject.description} 
              onChange={handleChange} 
              placeholder="توضیحات پروژه" 
              className="border border-gray-300 rounded-lg p-3 w-full h-32 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 col-span-2 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال افزودن...
              </>
            ) : "افزودن پروژه"}
          </button>
        </form>
      </div>

      {/* لیست پروژه‌ها */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">لیست پروژه‌ها</h3>
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-gray-500 text-lg mt-4">هنوز پروژه‌ای اضافه نشده است.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p._id} className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-1">
                {p.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={`https://portfulio-5.onrender.com${p.image}`} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{p.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                  
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">
                        <strong className="text-indigo-600">تکنولوژی‌ها:</strong>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.map((tech, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                      <span className="text-yellow-500 ml-1">⭐</span>
                      <span className="font-medium">{p.rating?.toFixed(1) || "0.0"}</span>
                      <span className="text-gray-500 text-sm mr-2">({p.votes || 0} رأی)</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleRateClick(p._id)} 
                        className="bg-amber-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-500 transition shadow-sm flex items-center"
                      >
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        امتیاز
                      </button>
                      <button 
                        onClick={() => handleDelete(p._id)} 
                        className="bg-rose-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-rose-600 transition shadow-sm flex items-center"
                      >
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;