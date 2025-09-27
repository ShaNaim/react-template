export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-6 px-6 mt-auto">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          2023 - {currentYear} © <span className="text-primary">Operation Media LLC</span>
        </div>
        <div>
          <button className="hover:text-primary transition-colors">Contact Us</button>
        </div>
      </div>
    </footer>
  );
}
