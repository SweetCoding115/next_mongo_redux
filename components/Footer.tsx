import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col-reverse justify-between items-center px-3 space-y-3 sm:mb-0 mb-3 border-gray-500">
      <div className="text-gray-500">
        © 2023 ImprovementAI. All Rights Reserved.
      </div>
      <div className="flex space-x-4 pb-4 sm:pb-0 text-gray-900">
        <Link
          href="#terms"
        >
          <p>Terms of Service</p>
        </Link>
        <Link
          href="#privacy"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
