import React from 'react'

import Link from 'next/link'

type Props = {}

export default function ContainerFooter({}: Props) {
  return (
    <section>
      <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/path/to/logo.png" alt="" className="h-12 w-auto" />
              <p className="mt-2">&copy; 2024 Shark Wow. All rights reserved.</p>
            </div>
            <ul className="flex flex-col md:flex-row gap-4">
              <li>
                <Link href="/about-us">
                  <p className="text-gray-400 hover:text-white">About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p className="text-gray-400 hover:text-white">Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="text-gray-400 hover:text-white">Contact</p>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <p className="text-gray-400 hover:text-white">Privacy Policy</p>
                </Link>
              </li>
            </ul>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12a12 12 0 1 0-13.847 11.849v-8.388h-2.078v-3.461h2.078v-2.635c0-2.052 1.223-3.172 3.092-3.172.897 0 1.837.16 1.837.16v2.019h-1.035c-1.019 0-1.338.631-1.338 1.28v1.548h2.413l-.386 3.461h-2.027v8.388A12.001 12.001 0 0 0 24 12"></path></svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.921 9.921 0 0 1-2.827.775A4.93 4.93 0 0 0 23.337 3a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 11.846 8.11a13.934 13.934 0 0 1-10.124-5.144 4.822 4.822 0 0 0 1.523 6.573A4.92 4.92 0 0 1 .96 8.719v.061a4.918 4.918 0 0 0 3.94 4.827 4.893 4.893 0 0 1-2.224.085A4.918 4.918 0 0 0 7.86 17.57a9.866 9.866 0 0 1-6.102 2.105c-.396 0-.786-.023-1.17-.068a13.954 13.954 0 0 0 7.545 2.212c9.054 0 14-7.497 14-13.985 0-.213-.005-.426-.014-.637A9.935 9.935 0 0 0 24 4.557z"></path></svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.055 1.964.24 2.425.41a4.993 4.993 0 0 1 1.81 1.181 4.993 4.993 0 0 1 1.181 1.81c.17.461.355 1.219.41 2.425.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.206-.24 1.964-.41 2.425a4.993 4.993 0 0 1-1.181 1.81 4.993 4.993 0 0 1-1.81 1.181c-.461.17-1.219.355-2.425.41-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.055-1.964-.24-2.425-.41a4.993 4.993 0 0 1-1.81-1.181 4.993 4.993 0 0 1-1.181-1.81c-.17-.461-.355-1.219-.41-2.425-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.055-1.206.24-1.964.41-2.425a4.993 4.993 0 0 1 1.181-1.81 4.993 4.993 0 0 1 1.81-1.181c.461-.17 1.219-.355 2.425-.41 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.74.132 4.52.327 3.443.686A6.993 6.993 0 0 0 .686 3.443c-.359 1.077-.554 2.297-.614 3.609C.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.06 1.312.255 2.532.614 3.609a6.993 6.993 0 0 0 2.757 2.757c1.077.359 2.297.554 3.609.614C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.312-.06 2.532-.255 3.609-.614a6.993 6.993 0 0 0 2.757-2.757c.359-1.077.554-2.297.614-3.609.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.312-.255-2.532-.614-3.609a6.993 6.993 0 0 0-2.757-2.757c-1.077-.359-2.297-.554-3.609-.614C15.668.014 15.259 0 12 0z"></path><circle cx="12" cy="12" r="3.6"></circle></svg>
              </a>
            </div>
          </div>
        </footer>
    </section>
  )
}