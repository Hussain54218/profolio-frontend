import React, { useContext, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const MessagesSection = () => {
  const { messages, deleteMessage } = useContext(ProjectContext);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // عرض الإشعارات
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // تصفية الرسائل
  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === "all" || 
                          (filter === "unread" && !message.read) || 
                          (filter === "read" && message.read);
    
    const matchesSearch = searchTerm === "" || 
                         message.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // حذف الرسالة
  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      showNotification("پیام با موفقیت حذف شد", "success");
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      showNotification("خطا در حذف پیام", "error");
    }
  };

  // تأكيد الحذف
  const confirmDelete = (message) => {
    setSelectedMessage(message);
  };

  // عرض تفاصيل الرسالة
  const viewMessageDetails = (message) => {
    setSelectedMessage(message);
    // هنا يمكنك إضافة منطق لتحديد الرسالة كمقروءة إذا لزم الأمر
  };

  // إغلاق التفاصيل
  const closeDetails = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="p-4">
      {/* نافتیفیکیشن */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      {/* مودال تأكيد الحذف */}
      {selectedMessage && selectedMessage._id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">حذف پیام</h3>
            <p className="text-gray-600 mb-6">آیا از حذف این پیام اطمینان دارید؟ این عمل قابل بازگشت نیست.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                انصراف
              </button>
              <button
                onClick={() => handleDeleteMessage(selectedMessage._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال عرض التفاصيل */}
      {selectedMessage && !selectedMessage._id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800">جزئیات پیام</h3>
              <button
                onClick={closeDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full ml-2">نام</span>
                <span className="text-gray-800 font-medium">{selectedMessage.name}</span>
              </div>
              
              <div className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full ml-2">ایمیل</span>
                <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              
              <div className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full ml-2">تاریخ</span>
                <span className="text-gray-600">
                  {new Date(selectedMessage.createdAt).toLocaleString('fa-IR')}
                </span>
              </div>
              
              <div>
                <span className="block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-2">پیام</span>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => confirmDelete(selectedMessage)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                حذف پیام
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">پیام‌های کاربران</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="جستجو در پیام‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
            </div>
            
            {/* Filter dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">همه پیام‌ها</option>
              <option value="unread">پیام‌های خوانده نشده</option>
              <option value="read">پیام‌های خوانده شده</option>
            </select>
          </div>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="bg-gray-50 rounded-xl shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-gray-500 text-lg mt-4">
              {messages.length === 0 ? "هیچ پیامی وجود ندارد." : "پیامی با معیارهای جستجو یافت نشد."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMessages.map(m => (
                <div key={m._id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-800 truncate">{m.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{m.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(m.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm line-clamp-2">{m.message}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => viewMessageDetails(m)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      مشاهده جزئیات
                    </button>
                    <button 
                      onClick={() => confirmDelete(m)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="حذف پیام"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mt-6">
              <p className="text-center text-gray-500 text-sm">
                نمایش {filteredMessages.length} از {messages.length} پیام
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;