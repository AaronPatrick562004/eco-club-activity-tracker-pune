import Link from "next/link";
import { Leaf, MapPin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold">Pune Eco-Club</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <Link href="/objectives" className="hover:text-gray-900">Objectives</Link>
            <Link href="/activities" className="hover:text-gray-900">Activities</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
