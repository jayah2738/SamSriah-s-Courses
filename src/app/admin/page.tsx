'use client'
import React, { useState, useCallback, useMemo } from "react";
import { FiSearch, FiMenu, FiUsers, FiBook, FiVideo, FiFileText, FiSettings, FiLogOut, FiGrid, FiPlusCircle, FiEdit3, FiTrash2 } from "react-icons/fi";
import { debounce } from "lodash";

const courseMaterials = [
  {
    id: 1,
    title: "Mathematics Chapter 1",
    type: "video",
    grade: "Grade 10",
    subject: "Mathematics",
    uploadDate: "2024-01-15",
    fileUrl: "https://example.com/math-chapter1.mp4",
    fileSize: "250MB"
  },
  {
    id: 2,
    title: "Physics Notes",
    type: "pdf",
    grade: "Grade 11",
    subject: "Physics",
    uploadDate: "2024-01-14",
    fileUrl: "https://example.com/physics-notes.pdf",
    fileSize: "15MB"
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [fileType, setFileType] = useState("all");

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  const filteredItems = useMemo(() => {
    let items = [...courseMaterials];

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGrade !== "all") {
      items = items.filter((item) => item.grade === selectedGrade);
    }

    if (selectedSubject !== "all") {
      items = items.filter((item) => item.subject === selectedSubject);
    }

    if (fileType !== "all") {
      items = items.filter((item) => item.type === fileType);
    }

    return items;
  }, [searchQuery, selectedGrade, selectedSubject, fileType]);

  const dashboardStats = {
    totalStudents: 1250,
    totalTeachers: 45,
    totalClasses: 32,
    totalCourses: 156
  };

  const renderDashboardContent = () => {
    switch(activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalStudents}</h3>
                </div>
                <FiUsers className="text-3xl text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Teachers</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalTeachers}</h3>
                </div>
                <FiUsers className="text-3xl text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Classes</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalClasses}</h3>
                </div>
                <FiGrid className="text-3xl text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Courses</p>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalCourses}</h3>
                </div>
                <FiBook className="text-3xl text-orange-500" />
              </div>
            </div>
          </div>
        );
      case "materials":
        return (
          <div>
            <div className="mb-6 flex flex-wrap gap-4">
              <select 
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              <select 
                className="px-4 py-2 border rounded-lg"
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
              </select>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                <FiPlusCircle /> Upload New Material
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === "video" ? <FiVideo className="text-blue-500" /> : <FiFileText className="text-red-500" />}
                      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.grade} - {item.subject}</p>
                    <p className="text-sm text-gray-500">Upload Date: {item.uploadDate}</p>
                    <p className="text-sm text-gray-500">File Size: {item.fileSize}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                        <FiEdit3 /> Edit
                      </button>
                      <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="text-center py-8">Content coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`bg-white shadow-lg fixed h-full z-20 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl text-gray-800 ${!isSidebarOpen && "hidden"}`}>School Admin</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            <FiMenu className="text-xl" />
          </button>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full p-4 flex items-center ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
          >
            <FiGrid className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`w-full p-4 flex items-center ${activeTab === "materials" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
          >
            <FiBook className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Learning Materials</span>}
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`w-full p-4 flex items-center ${activeTab === "students" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
          >
            <FiUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Students</span>}
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`w-full p-4 flex items-center ${activeTab === "teachers" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
          >
            <FiUsers className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Teachers</span>}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full p-4 flex items-center ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-600"} hover:bg-blue-50 hover:text-blue-600`}
          >
            <FiSettings className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </button>
          <button className="w-full p-4 flex items-center text-red-600 hover:bg-red-50">
            <FiLogOut className="text-xl" />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </nav>
      </div>

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;