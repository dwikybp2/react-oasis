import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (user) => {
            queryClient.setQueriesData(['user'], user);
            navigate('/dashboard');
        },

        onError: (error) => {
            console.error(error);
            toast.error('Provided email or password incorrect');
        },
    });

    return { login, isLoading };
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if(!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    console.log(data);
    if (error) throw new Error(error.message);

    return data?.user;
}