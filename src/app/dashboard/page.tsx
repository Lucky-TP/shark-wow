"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserType {
    name: string;
    email: string;
    role: string;
}

export default function Users() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("/api/test");
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(
                    "Failed to fetch users. Please check your Firebase setup."
                );
            }
        }
        fetchUsers();
    }, []);

    const addUser = async () => {
        try {
            const response = await axios.post("/api/test", {
                name,
                email,
                role,
            });
            setUsers([...users, response.data.data]);
            setName("");
            setEmail("");
            setRole("");
        } catch (error) {
            console.error("Error adding user:", error);
            setError("Failed to add user.");
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !role) {
            setError("Please fill in all fields.");
            return;
        }
        addUser();
        setError("");
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            {error && <p className="text-red-500">{error}</p>}
            {users.length === 0 ? (
                <p>No users found. Please check your Firebase setup.</p>
            ) : (
                <ul className="divide-y divide-gray-300">
                    {users.map((user, index) => (
                        <li key={index} className="py-2">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-gray-600">
                                        {user.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <h2 className="text-xl font-bold mb-2">Add User</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={role}
                        onChange={handleRoleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
}
