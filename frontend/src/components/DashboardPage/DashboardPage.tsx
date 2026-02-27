import { useState } from "react";
import { FaChartBar, FaUser, FaCog } from "react-icons/fa";

const sidebarEntries = [
  { id: 1, label: "Dashboard", icon: <FaChartBar /> },
  { id: 2, label: "Something", icon: <FaUser /> },
  { id: 3, label: "Something2", icon: <FaCog /> },
];

const sectionSizes = [1, 2, 3];

const DashboardPage = () => {
  const [activeEntry, setActiveEntry] = useState(sidebarEntries[0].id);

  return (
    <div className="flex h-[80%] w-[80%]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">App Name</h1>
        <ul className="space-y-2">
          {sidebarEntries.map((entry) => (
            <li
              key={entry.id}
              className={`flex items-center p-2 rounded-md cursor-pointer transition 
                ${activeEntry === entry.id ? "bg-gray-700" : "hover:bg-gray-700"}`}
              onClick={() => setActiveEntry(entry.id)}
            >
              <span className="mr-2">{entry.icon}</span>
              <span>{entry.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-gray-100 p-4 shadow">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <span className="font-semibold">DudeUsername</span>
        </nav>

        {/* Content sections */}
        <div className="flex flex-1 gap-4 p-4">
          {sectionSizes.map((size, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow flex items-center justify-center text-gray-700 font-bold`}
              style={{ flex: size }} // flex-grow proportional to "size"
            >
              Section {idx + 1} (size {size})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
