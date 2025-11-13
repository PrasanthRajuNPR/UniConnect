import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Info } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";
import { UserRole, roleColors } from "../types";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  // Handle dropdown visibility timer
  useEffect(() => {
    if (!hovered) {
      const timer = setTimeout(() => setShowDropdown(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hovered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("https://uni-connect-server.vercel.app/api/auth/login", {
        email,
        password,
        role,
      });

      const userData = response.data.user;
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate(`/${role}`, { state: { user: userData } });
      }
    } catch {
      setErrorMessage("Invalid email or password");
    }
  };

  const gradientBackgrounds = {
    student: "from-green-400 to-emerald-600",
    teacher: "from-blue-400 to-indigo-600",
    admin: "from-purple-400 to-pink-600",
  };

  const buttonGradients = {
    student: "bg-gradient-to-r from-green-500 to-emerald-700",
    teacher: "bg-gradient-to-r from-blue-500 to-indigo-700",
    admin: "bg-gradient-to-r from-purple-500 to-pink-700",
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientBackgrounds[role]} flex items-center justify-center p-4 transition-all duration-500`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md transition-colors duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90"
      >
        {/* 🌈 Floating Demo Info Card (Right Side) */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="absolute top-1/2 right-[-330px] transform -translate-y-1/2 w-[300px] max-w-sm z-50
                         max-lg:static max-lg:mt-6 max-lg:mx-auto"
            >
              <motion.div
                className="relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl hover:shadow-purple-500/40 transition-shadow"
              >
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-gray-900 dark:text-gray-100 text-sm backdrop-blur-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-indigo-500 animate-pulse" />
                    <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                      Demo Login Info
                    </h3>
                  </div>

                  <ul className="space-y-2 text-center text-gray-700 dark:text-gray-300">
                    <li className="hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md py-1 transition">
                      🎓 <strong>Student:</strong> <code>gibbs@gmail.com</code> / <code>gibbs@123</code>
                    </li>
                    <li className="hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md py-1 transition">
                      👨‍🏫 <strong>Teacher:</strong> <code>sparrow@gmail.com</code> / <code>sparrow@123</code>
                    </li>
                    <li className="hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md py-1 transition">
                      🛡️ <strong>Admin:</strong> <code>jack@gmail.com</code> / <code>jack@123</code>
                    </li>
                  </ul>

                  {/* Subtle animated glow */}
<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-20 blur-2xl animate-gradient-x pointer-events-none"></div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔒 Icon */}
        <div className="flex justify-center mb-8 mt-6">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradientBackgrounds[role]} rounded-full flex items-center justify-center shadow-lg`}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Sign in to your {role} account
        </p>

        {/* ⚠️ Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded"
          >
            <p>{errorMessage}</p>
          </motion.div>
        )}

        {/* 🧾 Login Form */}
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              autoFocus
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
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
