const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Voter Management System. All rights reserved.</p>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:text-gray-800 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-800 transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
