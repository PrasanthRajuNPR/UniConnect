import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";
import { UserRole, roleColors } from "../types"; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const theme = useTheme(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("https://uni-connect-server.vercel.app/api/auth/login", {
        email,
        password,
        role,
      });
      console.log(password)
      const userData = response.data.user;  

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate(`/${role}`, { state: { user: userData } });
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };
 
  
  const colors = roleColors[role];

  
  const gradientBackgrounds = {
    student: "from-green-400 to-emerald-600", 
    teacher: "from-blue-400 to-indigo-600", 
    admin: "from-purple-400 to-pink-600"
  };

  
  const buttonGradients = {
    student: "bg-gradient-to-r from-green-500 to-emerald-700", 
    teacher: "bg-gradient-to-r from-blue-500 to-indigo-700", 
    admin: "bg-gradient-to-r from-purple-500 to-pink-700"
  };

  
  const textColors = {
    student: "text-green-600 dark:text-green-400",
    teacher: "text-blue-600 dark:text-blue-400", 
    admin: "text-purple-600 dark:text-purple-400"
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientBackgrounds[role]} flex items-center justify-center p-4 transition-all duration-500`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90"
      >
        <div className="flex justify-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradientBackgrounds[role]} rounded-full flex items-center justify-center shadow-lg`}>
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Sign in to your {role} account
        </p>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded"
          >
            <p>{errorMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-4">
              {["student", "teacher", "admin"].map((roleOption) => (
                <motion.button
                  key={roleOption}
                  type="button"
                  onClick={() => setRole(roleOption)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-lg text-center capitalize transition-all duration-200 ${
                    role === roleOption
                      ? `bg-gradient-to-r ${gradientBackgrounds[roleOption]} text-white shadow-md`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {roleOption}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 shadow-md ${buttonGradients[role]}`}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;