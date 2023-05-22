const PageLayout = ({ children }) => {
    const logo = "Meadow Vale Foods";
    return (
        <div>
            <header className="bg-slate-200	px-8 py-4">
                <h1 className="text-3xl">{logo}</h1>
            </header>
            <main className="px-8 py-4 flex">{children}</main>
        </div>
    );
};

export default PageLayout;
