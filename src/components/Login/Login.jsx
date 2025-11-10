import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContex } from "../../contexts/AuthContex";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { signIn, signInWithGoogle } = useContext(AuthContex);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then((userCred) => {
        if (userCred.user) {
          if (location.state) {
            navigate(`${location.state.from.pathname}`);
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `${error.message}`,
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((userCred) => {
        if (userCred.user) navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `${error.message}`,
        });
      });
  };
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center p-4 transition-colors duration-300">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-content">A</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h1>
            <p className="text-base-content/70">Sign in to your Artify account</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Email Address</span>
              </label>
              <input type="email" name="email" placeholder="📧 Enter your email" className="input input-bordered w-full pl-4" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="🔒 Enter your password" className="input input-bordered w-full pr-12 pl-4" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>
          <div className="divider text-base-content/50 my-6">OR</div>
          <button onClick={handleGoogleLogin} className="btn w-full bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>
          <div className="text-center mt-6">
            <span className="text-base-content/70">Don't have an account? </span>
            <a href="/register" className="text-primary hover:text-primary-focus font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
