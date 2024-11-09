export function Footer() {
    return (
      <footer className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <a href="/" className="hover:underline">BICAPRIPACDIRAP Academy</a>. No Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="/signin" className="hover:underline me-4 md:me-6">Sign In</a>
            </li>
            <li>
              <a href="mailto:zanggar.manarbek@icloud.com" className="hover:underline">Contact: zanggar.manarbek@icloud.com</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  
