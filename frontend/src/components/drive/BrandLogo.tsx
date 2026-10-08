import { cn } from '@/lib/utils'

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-red-900/40', className)}>
      <img src="/logo.png" alt="OpenDrive logo" className="h-full w-full object-cover" />
    </div>
  )
}
