import { createContext, useContext, useState } from 'react';

const DeleteButtonContext = createContext({
  showDeleteButtons: false,
  toggleDeleteButtons: () => {}
});

export function useDeleteButton() {
  return useContext(DeleteButtonContext);
}

export function DeleteButtonProvider({children}: {children: React.ReactNode}) {
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  const value = {
    showDeleteButtons,
    toggleDeleteButtons: () => setShowDeleteButtons(prev => !prev)
  };

  return (
    <DeleteButtonContext.Provider value={value}>
      {children}
    </DeleteButtonContext.Provider>
  );
}