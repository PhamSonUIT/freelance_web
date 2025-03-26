import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartNavbar from "../components/StartNavbar";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import ChatIcon from "../components/ChatIcon";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import Footer from "../components/Footer"; 
import SuccessNoti from "../components/SuccessNoti"; 

const SignUp = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(""); // Reset error message

        const response = await fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setShowSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } else {
            const data = await response.json();
            setError(data.message || "Signup failed. Please check your input.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 mt-30 pt-20">
            <StartNavbar />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="rounded-md border shadow-lg p-11 bg-white max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 text-center font-Roboto_Mono">Sign Up</h2>
                    <div className="flex items-center justify-center space-x-6 my-4">
                        <FaFacebook className="text-blue-600 text-4xl cursor-pointer" />
                        <FaGoogle className="text-red-500 text-4xl cursor-pointer" />
                        <FaGithub className="text-black text-4xl cursor-pointer" />
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-2 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <TextInput tlabel="Username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username"/>
                            <TextInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email"/>
                            <TextInput label="Phone Number" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number"/>
                            <TextInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="new-password"/>
                            <TextInput label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" autoComplete="new-password"/>
                        </div>
                        <div className="flex justify-center mt-6">
                            <PrimaryButton className="w-auto flex justify-center px-3 py-1 text-lg" type="submit">
                                Sign Up
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <ChatIcon />
            <Footer />
            {showSuccess && (
                <div className="bg-slate-400 bg-opacity-75 z-40 w-screen h-screen fixed">
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-lightPrimary z-50 p-6 rounded-lg text-center border-2 border-white">
                            <SuccessNoti message="Đăng ký thành công!" onClick={() => navigate("/login")} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
