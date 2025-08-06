import { supabase } from 'lib/supabaseClient'

export function SupabaseAdapter() {
    return {
        createUser: async (data) => {
            const { data: user, error } = await supabase
                .from('user')
                .insert(data)
                .select('*')
                .single()
            if (error) throw error
            return user
        },
        getUser: async (id) => {
            const { data: user, error } = await supabase
                .from('user')
                .select('*')
                .eq('id', id)
                .single()
            if (error) return null
            return user
        },
        getUserByEmail: async (email) => {
            const { data: user, error } = await supabase
                .from('user')
                .select('*')
                .eq('email', email)
                .single()
            if (error) return null
            return user
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const { data: account, error } = await supabase
                .from('account')
                .select('*, user(*)')
                .eq('provider', provider)
                .eq('providerAccountId', providerAccountId)
                .single()
            if (error || !account) return null
            return account.user
        },
        updateUser: async ({ id, ...data }) => {
            const { data: user, error } = await supabase
                .from('user')
                .update(data)
                .eq('id', id)
                .select('*')
                .single()
            if (error) throw error
            return user
        },
        deleteUser: async (id) => {
            const { data: user, error } = await supabase
                .from('user')
                .delete()
                .eq('id', id)
                .select('*')
                .single()
            if (error) throw error
            return user
        },
        linkAccount: async (data) => {
            const { data: account, error } = await supabase
                .from('account')
                .insert(data)
                .select('*')
                .single()
            if (error) throw error
            return account
        },
        unlinkAccount: async ({ provider, providerAccountId }) => {
            const { data: account, error } = await supabase
                .from('account')
                .delete()
                .eq('provider', provider)
                .eq('providerAccountId', providerAccountId)
                .select('*')
                .single()
            if (error) throw error
            return account
        },
        async getSessionAndUser(sessionToken) {
            const { data: session, error: sessionError } = await supabase
                .from('session')
                .select('*, user(*)')
                .eq('sessionToken', sessionToken)
                .single()
            if (sessionError || !session) return null
            const { user, ...sessionData } = session
            return { user, session: sessionData }
        },
        createSession: async (data) => {
            const { data: session, error } = await supabase
                .from('session')
                .insert(data)
                .select('*')
                .single()
            if (error) throw error
            return session
        },
        updateSession: async (data) => {
            const { data: session, error } = await supabase
                .from('session')
                .update(data)
                .eq('sessionToken', data.sessionToken)
                .select('*')
                .single()
            if (error) throw error
            return session
        },
        deleteSession: async (sessionToken) => {
            const { data: session, error } = await supabase
                .from('session')
                .delete()
                .eq('sessionToken', sessionToken)
                .select('*')
                .single()
            if (error) throw error
            return session
        },
        async createVerificationToken(data) {
            const { data: token, error } = await supabase
                .from('verificationToken')
                .insert(data)
                .select('*')
                .single()
            if (error) throw error
            // Remove id if present for compatibility
            if (token && 'id' in token) delete token.id
            return token
        },
        async useVerificationToken({ identifier, token }) {
            // Find the token
            const { data: foundToken, error: findError } = await supabase
                .from('verificationToken')
                .select('*')
                .eq('identifier', identifier)
                .eq('token', token)
                .single()
            if (findError || !foundToken) return null
            // Delete the token
            const { error: deleteError } = await supabase
                .from('verificationToken')
                .delete()
                .eq('identifier', identifier)
                .eq('token', token)
            if (deleteError) throw deleteError
            if ('id' in foundToken) delete foundToken.id
            return foundToken
        },
        async getAccount(providerAccountId, provider) {
            const { data: account, error } = await supabase
                .from('account')
                .select('*')
                .eq('providerAccountId', providerAccountId)
                .eq('provider', provider)
                .single()
            if (error) return null
            return account
        },
        async createAuthenticator(data) {
            const { data: authenticator, error } = await supabase
                .from('authenticator')
                .insert(data)
                .select('*')
                .single()
            if (error) throw error
            return authenticator
        },
        async getAuthenticator(credentialID) {
            const { data: authenticator, error } = await supabase
                .from('authenticator')
                .select('*')
                .eq('credentialID', credentialID)
                .single()
            if (error) return null
            return authenticator
        },
        async listAuthenticatorsByUserId(userId) {
            const { data: authenticators, error } = await supabase
                .from('authenticator')
                .select('*')
                .eq('userId', userId)
            if (error) return []
            return authenticators
        },
        async updateAuthenticatorCounter(credentialID, counter) {
            const { data: authenticator, error } = await supabase
                .from('authenticator')
                .update({ counter })
                .eq('credentialID', credentialID)
                .select('*')
                .single()
            if (error) throw error
            return authenticator
        },
    }
}
