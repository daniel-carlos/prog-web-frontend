import create from 'zustand'

export const useStore = create(set => ({
    username: false,
    password: false,
    setLooggedIn: (isLoggedIn, asAdmin = false) => set(state => ({ loggedIn: isLoggedIn, isAdmin: asAdmin })),
}))