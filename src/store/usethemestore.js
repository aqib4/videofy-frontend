import { create } from 'zustand'

const useThemeStore = create((set) => ({
      theme:"Coffee",
      settheme:(theme)=>set(theme)
}))

export default useThemeStore;


