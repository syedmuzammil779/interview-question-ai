import ButtonUI from "@/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-gray-100 w-full justify-center text-center">
      <div className="flex-1   p-10 flex flex-col justify-center max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Could not find the requested resource. The page you&apos;re looking
          for doesn&apos;t exist or has been moved.
        </p>
        <div>
          <Link href="/">
            <ButtonUI type="reset" title="Return Home" />
          </Link>
        </div>
      </div>
    </div>
  );
}
