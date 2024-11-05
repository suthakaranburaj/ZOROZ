import { create } from 'zustand';

const devStore = create((set) => ({
    isNavOpen: false,
    displayer: 'dashboard', // initial value can be 'dashboard' or any default section
    
        toggleNav: () => set((state) => ({
        isNavOpen: !state.isNavOpen
        })),
    
    // New action to set the current section to display
    setDisplayer: (section) => set({ displayer: section }),
}));

export default devStore;