import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface PortfolioState {
  activeSection: string;
  contactForm: {
    data: ContactForm;
    status: 'idle' | 'submitting' | 'success' | 'error';
    errorMsg: string | null;
  };
  sidebarOpen: boolean;
}

const initialState: PortfolioState = {
  activeSection: 'home',
  contactForm: {
    data: { name: '', email: '', subject: '', message: '' },
    status: 'idle',
    errorMsg: null,
  },
  sidebarOpen: false,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    updateContactForm: (state, action: PayloadAction<Partial<ContactForm>>) => {
      state.contactForm.data = { ...state.contactForm.data, ...action.payload };
    },
    submitContactFormStart: (state) => {
      state.contactForm.status = 'submitting';
      state.contactForm.errorMsg = null;
    },
    submitContactFormSuccess: (state) => {
      state.contactForm.status = 'success';
      state.contactForm.data = { name: '', email: '', subject: '', message: '' }; // reset
    },
    submitContactFormError: (state, action: PayloadAction<string>) => {
      state.contactForm.status = 'error';
      state.contactForm.errorMsg = action.payload;
    },
    resetContactFormStatus: (state) => {
      state.contactForm.status = 'idle';
      state.contactForm.errorMsg = null;
    }
  },
});

export const {
  setActiveSection,
  setSidebarOpen,
  updateContactForm,
  submitContactFormStart,
  submitContactFormSuccess,
  submitContactFormError,
  resetContactFormStatus,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
