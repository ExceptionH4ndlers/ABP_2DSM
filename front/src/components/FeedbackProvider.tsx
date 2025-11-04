import { Toaster } from 'react-hot-toast';

export const FeedbackProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#f87171', 
            secondary: '#fff',
          },
        },
      }}
    />
  );
};
