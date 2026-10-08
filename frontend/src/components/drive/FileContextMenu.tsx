import { Copy, Download, Edit3, Eye, FolderInput, Info, Link2, Trash2, UserPlus } from 'lucide-react'
import type { FileItem } from '@/data/drive-data'

type Props = {
  x: number
  y: number
  file: FileItem | null
  onClose: () => void
  onView: () => void
  onDownload: () => void
  onRename: () => void
  onMove: () => void
  onDetails: () => void
  onShare: () => void
  onCopyLink: () => void
  onInvite: () => void
  onDelete: () => void
}

const kindColors: Record<string, string> = {
  image: 'bg-red-500',
  video: 'bg-red-500',
  pdf: 'bg-red-500',
  doc: 'bg-red-500',
}

const kindLabels: Record<string, string> = {
  image: 'Image',
  video: 'Video',
  pdf: 'PDF',
  doc: 'Document',
}

function MenuItem({ icon: Icon, label, onClick, danger = false, kbd }: { icon: React.ElementType; label: string; onClick: () => void; danger?: boolean; kbd?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-150',
        danger
          ? 'text-red-500 hover:bg-red-50  :bg-red-950/40'
          : 'text-slate-700 hover:bg-slate-100  :bg-slate-800/70',
      ].join(' ')}
    >
      <span className={[
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150',
        danger
          ? 'bg-red-50 text-red-500 group-hover:bg-red-100  '
          : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm  ',
      ].join(' ')}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="flex-1 text-left">{label}</span>
      {kbd && (
        <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 group-hover:border-slate-300    sm:inline">
          {kbd}
        </kbd>
      )}
    </button>
  )
}

export function FileContextMenu({ x, y, file, onClose, onView, onDownload, onRename, onMove, onDetails, onShare, onCopyLink, onInvite, onDelete }: Props) {
  if (!file) return null

  const safeX = Math.max(12, Math.min(x, window.innerWidth - 228))
  const safeY = Math.max(12, Math.min(y, window.innerHeight - 430))
  const kindColor = kindColors[file.kind] ?? 'bg-slate-500'
  const kindLabel = kindLabels[file.kind] ?? 'File'

  function handleShare() {
    onShare()
  }

  function handleCopyLink() {
    onCopyLink()
  }

  return (
    <>
      <button
        className="fixed inset-0 z-40 cursor-default"
        aria-label="Close file menu"
        onClick={onClose}
      />
      <div
        className="fixed z-50 w-56 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl  "
        style={
          window.innerWidth >= 640
            ? { left: safeX, top: safeY }
            : { insetInline: '0.75rem', bottom: '0.75rem', position: 'fixed' }
        }
      >
        {/* Header: file name + kind badge + folder path */}
        <div className="border-b border-slate-100 bg-slate-50/80 px-3.5 py-3  ">
          <div className="flex items-start gap-2.5">
            <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white ${kindColor}`}>
              {kindLabel.slice(0, 3).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold leading-tight text-slate-900 ">{file.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="rounded-md bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500  ">
                  {file.size}
                </span>
                {file.folderName && (
                  <span className="flex items-center gap-0.5 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600  ">
                    <FolderInput className="h-2.5 w-2.5" />
                    {file.folderName}
                  </span>
                )}
                {!file.folderName && (
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400  ">
                    / All Files
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-1.5">
          <MenuItem icon={Eye} label="Preview" onClick={onView} kbd="↵" />
          <MenuItem icon={Download} label="Download" onClick={onDownload} />
          <MenuItem icon={Edit3} label="Rename" onClick={onRename} />
          <MenuItem icon={FolderInput} label="Move to Folder" onClick={onMove} />
          <MenuItem icon={Info} label="Details" onClick={onDetails} />

          <div className="my-1 h-px bg-slate-100 " />

          <MenuItem icon={Link2} label="Share Link" onClick={handleShare} />
          <MenuItem icon={Copy} label="Copy Link" onClick={handleCopyLink} kbd="Ctrl+L" />
          <MenuItem icon={UserPlus} label="Invite Member" onClick={onInvite} />

          <div className="my-1 h-px bg-slate-100 " />

          <MenuItem icon={Trash2} label="Delete" onClick={onDelete} danger />
        </div>
      </div>
    </>
  )
}
