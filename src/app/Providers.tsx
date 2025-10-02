"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider
      refetchInterval={0} // 🚫 nunca hagas polling
      refetchOnWindowFocus={false} // 🚫 no refresques al volver a la pestaña
    >
      {children}
    </SessionProvider>
  );
}
