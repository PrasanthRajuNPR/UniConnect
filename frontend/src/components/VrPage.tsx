import { useNavigate } from 'react-router-dom';

const VrPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">VR Mode</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Campus" className="rounded-lg mb-4" />
          <h2 className="text-xl font-bold mb-2">Campus</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">Explore the campus in VR.</p>
          <button
            onClick={() => handleViewClick('https://framevr.io/collegeview')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            View
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Class" className="rounded-lg mb-4" style={{ width: '300px', height: '200px' }} />
          <h2 className="text-xl font-bold mb-2">Class</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">Attend classes in VR.</p>
          <button
            onClick={() => handleViewClick('https://framevr.io/collegeinfra')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            View
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1692133211836-52846376d66f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwbGFic3xlbnwwfHwwfHx8MA%3D%3D" alt="Labs" className="rounded-lg mb-4" />
          <h2 className="text-xl font-bold mb-2">Labs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">Experience labs in VR.</p>
          <button
            onClick={() => handleViewClick('https://framevr.io/collegelab')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default VrPage;
