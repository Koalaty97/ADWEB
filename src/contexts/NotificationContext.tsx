import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface NotifCtx {
  notify: (msg: string) => void;
}

const Context = createContext<NotifCtx>({ notify: () => {} });

export const useNotifier = () => useContext(Context);

export function NotifierProvider({ children }: { children: ReactNode }) {
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });

  const notify = (msg: string) => setSnack({ open: true, msg });

  return (
    <Context.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity="success"
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Context.Provider>
  );
}
