// Layout.tsx
import React from 'react';
import Header from './ components/Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" , backgroundColor: "#FAEF9B" }}>

    <div className="layout">
      <header>
        <Header />
      </header>
      <main>{children}</main>
      {/* <footer>
        <p>&copy; 2024 My App</p>
      </footer> */}
    </div>
    </div>
  );
};

export default Layout;
