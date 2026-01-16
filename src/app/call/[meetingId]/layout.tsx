import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-screen w-full bg-background overflow-hidden">
          {children}
        </main>
      );
}

export default layout