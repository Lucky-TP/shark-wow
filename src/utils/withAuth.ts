import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase"; // Adjust the import path as necessary

const useRequireAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				router.push("/"); // Redirect to login page if not authenticated
			}
		});

		return () => unsubscribe();
	}, []);

	return user;
};

export default useRequireAuth;
