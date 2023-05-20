import type { UserInterface } from "@/types/auth"
import { StorageSerializers } from "@vueuse/core"
import { defineStore } from 'pinia'
import { supabase } from "supabase"

export const useAuthStore = defineStore('auth', () => {
    const userState = useLocalStorage<UserInterface>("auth", null, {serializer: StorageSerializers.object})

    const user = computed(() => userState.value)

    async function auth(email: string, password: string, remember: boolean = true) {
        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
                options: {
                    
                }
            })
            if (error)
                return error
            userState.value = data.user!
        }
        catch (error) {
            if (error instanceof Error)
                return error
        }

        return true;
    }

    async function logout() {
        try {
            const { error } =   await supabase.auth.signOut()
            if (error)
                return error
        }
        catch (error) {
            if (error instanceof Error)
                return error
        }
        userState.value = null
        return true;
    }

    return { user, auth, logout }
})