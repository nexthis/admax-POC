import { StorageSerializers } from '@vueuse/core'
import { defineStore } from 'pinia'
import { supabase } from 'supabase'
import type { UserInterface } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const userState = useLocalStorage<UserInterface>('auth', null, { serializer: StorageSerializers.object })

  const user = computed(() => userState.value)
  console.log('useAuthStore init only once')

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT')
      userState.value = null
  })

  async function auth(email: string, password: string, remember = true) {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {

        },
      })
      if (error)
        return error
      userState.value = data.user!
    }
    catch (error) {
      if (error instanceof Error)
        return error
    }

    return true
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error)
        return error
    }
    catch (error) {
      if (error instanceof Error)
        return error
    }
    userState.value = null

    return true
  }

  return { user, auth, logout }
})
