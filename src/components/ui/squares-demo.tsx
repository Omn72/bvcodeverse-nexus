import { Squares } from "@/components/ui/squares-background"

export function SquaresDemo() {
  return (
    <div className="space-y-8">
      {/* Diagonal movement with hover effect - Complete Black */}
      <div className="relative h-[400px] rounded-lg overflow-hidden bg-black">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#000000" 
          hoverFillColor="#000000"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white z-10">
            Complete Dark Black Background
          </h2>
        </div>
      </div>

      {/* Right movement with larger squares - Complete Black */}
      <div className="relative h-[300px] rounded-lg overflow-hidden bg-black">
        <Squares 
          direction="right"
          speed={1}
          squareSize={60}
          borderColor="#000000" 
          hoverFillColor="#000000"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl text-white/80 z-10">
            Pure Black Squares Moving Right
          </h3>
        </div>
      </div>

      {/* Up movement with custom colors */}
      <div className="relative h-[300px] rounded-lg overflow-hidden bg-[#060606]">
        <Squares 
          direction="up"
          speed={0.8}
          squareSize={30}
          borderColor="#0ea5e9" 
          hoverFillColor="#0284c7"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl text-white/80 z-10">
            Custom Blue Squares Moving Up
          </h3>
        </div>
      </div>
    </div>
  )
}
