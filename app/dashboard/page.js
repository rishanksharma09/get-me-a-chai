"use client";
import { use, useState } from "react";
import { getuser, updateuser } from "@/actions/useractions";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        razorpayId: "",
        razorpaySecret: "",
    });
    const fetchData = async () => {
        const userData = await getuser(session.user.email);
        setFormData(userData);
        console.log(userData);

    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchData();
        }
    }, [session]);

    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, type) => {
        if (type === "profile") {
            setProfilePic(e.target.files[0]);
        } else {
            setCoverPic(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/updateuser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Update failed:", data.error);
                alert(data.error || "Failed to update user");
                return;
            }

            console.log("Form Data Submitted:", formData);
            alert(data.message || "User updated successfully");

        } catch (error) {
            console.error("Error updating user:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };


    return (
        <div className="min-h-screen py-24 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
                    Dashboard Settings
                </h2>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 text-slate-900 dark:text-white"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={() => { alert("Cannot change email") }}
                        className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 text-slate-900 dark:text-white"
                        required
                    />
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 text-slate-900 dark:text-white"
                        required
                    />
                </div>

                {/* Profile Picture */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profile")}
                        className="mt-1 block w-full text-slate-700 dark:text-slate-300"
                    />
                </div>

                {/* Cover Picture */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cover Picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "cover")}
                        className="mt-1 block w-full text-slate-700 dark:text-slate-300"
                    />
                </div>

                {/* Razorpay ID */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Razorpay ID
                    </label>
                    <input
                        type="text"
                        name="razorpayId"
                        value={formData.razorpayId || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 text-slate-900 dark:text-white"
                        required
                    />
                </div>

                {/* Razorpay Secret */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Razorpay Secret
                    </label>
                    <input
                        type="password"
                        name="razorpaySecret"
                        value={formData.razorpaySecret || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-2 text-slate-900 dark:text-white"
                        required
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-fit px-3   bg-gradient-to-r from-green-400 to-blue-600 text-white py-2 rounded-lg font-medium hover:opacity-80"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
