export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e8e7e3] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#302f2d] mx-auto mb-4"></div>
        <p className="text-[#302f2d]">Loading product...</p>
      </div>
    </div>
  )
}
