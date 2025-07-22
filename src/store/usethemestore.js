import { create } from 'zustand'

const useThemeStore = create((set) => ({
      theme: localStorage.getItem("videofy-theme") || "Coffee",
      settheme:(theme)=>{
            localStorage.setItem("Videofy-theme", theme);
            set({ theme });
      }
}))

export default useThemeStore;


