type MainProps = {
  children: React.ReactNode;
  variant?: string;
};

const Main: React.FC<MainProps> = ({ children, variant = "default" }) => {
  return (
    <main className="px-2 md:px-6 py-8 container mx-auto max-w-6xl flex flex-col w-full h-full">
      {children}
    </main>
  );
};

export default Main;
