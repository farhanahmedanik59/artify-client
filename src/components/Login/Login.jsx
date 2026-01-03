import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContex } from "../../contexts/AuthContex";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { signIn, signInWithGoogle } = useContext(AuthContex);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectUser = () => {
    const from = location.state?.from?.pathname || "/";
    navigate(from);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signIn(email, password)
      .then((userCred) => {
        if (userCred.user) redirectUser();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((userCred) => {
        if (userCred.user) redirectUser();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Google login failed",
        });
      });
  };

  const handleDemoLogin = () => {
    const demoEmail = "test@gmail.com";
    const demoPassword = "Test9259";

    setEmail(demoEmail);
    setPassword(demoPassword);

    signIn(demoEmail, demoPassword)
      .then((userCred) => {
        if (userCred.user) redirectUser();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Demo Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-content">A</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-base-content/70">Sign in to your Artify account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="📧 Enter your email" className="input input-bordered w-full" required />
            </div>

            <div className="form-control">
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="🔒 Enter your password"
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-4">
            <button onClick={handleDemoLogin} className="btn btn-outline btn-secondary w-full">
              🚀 Login as Demo User / Admin
            </button>
          </div>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} className="btn w-full bg-white text-black border">
            <svg width="16" height="16" viewBox="0 0 512 512">
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </svg>
            Login with Google
          </button>

          {/* Register */}
          <div className="text-center mt-6">
            <span className="opacity-70">Don't have an account? </span>
            <a href="/register" className="text-primary font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
