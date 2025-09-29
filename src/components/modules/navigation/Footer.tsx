export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="bg-background border-t border-border py-8 px-6 shadow-lg mt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-base text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>2023 - {currentYear} ©</span>
            <span className="text-primary font-medium">Operation Media LLC</span>
          </div>
          <div>
            <button className="hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-accent">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
