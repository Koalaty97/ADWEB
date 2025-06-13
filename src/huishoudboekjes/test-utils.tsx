import React, { ReactNode } from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderHookOptions,
  renderHook as rtlRenderHook,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthProvider } from "../contexts/AuthContext";
import { NotifierProvider } from "../contexts/NotificationContext";

interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => (
  <MemoryRouter initialEntries={["?id=123"]}>
    <AuthProvider>
      <NotifierProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </NotifierProvider>
    </AuthProvider>
  </MemoryRouter>
);

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";

export function renderHook<TResult, TProps = void>(
  callback: (props: TProps) => TResult,
  options?: Omit<RenderHookOptions<TProps>, "wrapper">,
) {
  return rtlRenderHook(callback, { wrapper: AllProviders, ...options });
}
