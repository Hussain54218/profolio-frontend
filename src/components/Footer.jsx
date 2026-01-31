function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 ">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
