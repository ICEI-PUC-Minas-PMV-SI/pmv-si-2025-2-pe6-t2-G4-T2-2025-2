import {
	createContext,
	useState,
	type ReactNode,
	useEffect,
	useContext,
} from "react";
import { api } from "../services/api";

type AuthContextType = {
	isLoading: boolean;
	session: null | UserAPIResponse;
	save: (data: UserAPIResponse) => void;
	remove: () => void;
};

const LOCAL_STORAGE_KEY = "@flowservice";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<null | UserAPIResponse>(null);
	const [isLoading, setIsLoading] = useState(true);

	function save(data: UserAPIResponse) {
		localStorage.setItem(
			`${LOCAL_STORAGE_KEY}:user`,
			JSON.stringify(data.user),
		);
		localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);
		setSession(data);

		api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
	}

	function loadingUser() {
		const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
		const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

		if (user && token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			setSession({
				token,
				user: JSON.parse(user),
			});
		}
		setIsLoading(false);
	}

	function remove() {
		setSession(null);
		localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
		localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
	}

	useEffect(() => {
		loadingUser();
	}, []);

	return (
		<AuthContext.Provider value={{ session, save, isLoading, remove }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}

	return context;
}
