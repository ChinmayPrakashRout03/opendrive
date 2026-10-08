import { type FormEvent, type ReactNode, useEffect, useState } from 'react'
import { Outlet, useOutletContext, NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {

  FileArchive,
  Gauge,
  History,
  LogOut,
  Menu,
  Search,
  Settings,
  SlidersHorizontal,
  Trash2,
  X,
  ChevronDown,
  Upload,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/drive/BrandLogo'
import { apiFetch, formatBytes } from '@/lib/api'
import { useUpload } from '@/context/UploadContext'
import { clearAuthSession, getStoredUser, updateStoredUser, type AuthUser } from '@/lib/auth'
import { getGravatarUrl } from '@/lib/gravatar'
import { cn } from '@/lib/utils'

const menu = [
  { label: 'All Files', icon: FileArchive, href: '/all-files' },
  { label: 'Quota Tracker', icon: Gauge, href: '/quota' },
  { label: 'Recycle Bin', icon: Trash2, href: '/trash' },
  { label: 'Activity Log', icon: History, href: '/activity' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

type StorageSummary = {
  totalBytes: string
  usedBytes: string
  availableBytes: string
}

type StorageBreakdown = {
  photo: string
  video: string
  document: string
}

function StorageRing({ used, total }: { used: number; total: number }) {
  const R = 22
  const CIRC = 2 * Math.PI * R
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0
  const offset = CIRC - (pct / 100) * CIRC
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
        <circle cx="28" cy="28" r={R} fill="none" stroke="#fee2e2" strokeWidth="6" />
        <circle
          cx="28" cy="28" r={R} fill="none"
          stroke="#ef4444" strokeWidth="6"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
    </div>
  )
}

function Sidebar({ onNavigate, storage, breakdown, onLogout }: {
  onNavigate?: () => void
  storage: StorageSummary | null
  breakdown: StorageBreakdown
  onLogout: () => void
}) {
  const used = Number(storage?.usedBytes ?? 0)
  const total = Number(storage?.totalBytes ?? 0)
  const other = Math.max(0, used - Number(breakdown.photo) - Number(breakdown.video) - Number(breakdown.document))

  const breakdownItems = [
    { label: 'Photos', value: breakdown.photo, color: '#22c55e' },
    { label: 'Videos', value: breakdown.video, color: '#f59e0b' },
    { label: 'Documents', value: breakdown.document, color: '#dc2626' },
    { label: 'Other', value: String(other), color: '#ef4444' },
  ]

  return (
    <aside className="flex h-full w-[210px] flex-col bg-white p-5" style={{ borderRight: '1px solid #f0f0f0' }}>
      {/* Brand */}
      <div className="flex items-center gap-2.5 pb-6 pt-1">
        <BrandLogo className="h-9 w-9 shrink-0" />
        <span className="text-[18px] font-extrabold tracking-tight">
          <span className="text-slate-900">Open</span><span className="text-red-500">Drive</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="grid gap-0.5">
        {menu.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'inline-flex h-10 items-center gap-2.5 rounded-xl px-3 text-[13px] font-semibold transition-all',
                  isActive
                    ? 'bg-red-50 text-red-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('h-[17px] w-[17px] shrink-0', isActive ? 'text-red-500' : 'text-slate-500')} />
                  {item.label}
                </>
              )}
            </NavLink>
        ))}
      </nav>

      {/* Storage Widget & Logout */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="rounded-2xl bg-white p-4" style={{ border: '1px solid #f0f0f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <StorageRing used={used} total={total} />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">
                {formatBytes(storage?.usedBytes)} <span className="font-semibold text-slate-500 text-xs">used</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">of {formatBytes(storage?.totalBytes)}</p>
            </div>
          </div>

          <div className="grid gap-1.5">
            {breakdownItems.map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </span>
                <span className="font-semibold text-slate-600">{formatBytes(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  )
}

type ConnectedAccount = {
  id: string
  email: string
  provider: string
}

export type DriveLayoutContext = {
  setHeaderActions: (actions: ReactNode) => void
}

export function useDriveLayoutActions() {
  return useOutletContext<DriveLayoutContext>()
}

export function DriveLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(searchParams.get('q') ?? '')
  const [user, setUser] = useState<AuthUser | null>(getStoredUser())
  const [storage, setStorage] = useState<StorageSummary | null>(null)
  const [breakdown, setBreakdown] = useState<StorageBreakdown>({ photo: '0', video: '0', document: '0' })

  const [headerActions, setHeaderActions] = useState<ReactNode>(null)
  const { uploadProgress, setUploadProgress, retryFailedUpload } = useUpload()
  const [uploadProgressCollapsed, setUploadProgressCollapsed] = useState(false)

  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [avatarError, setAvatarError] = useState(false)

  const [accounts, setAccounts] = useState<ConnectedAccount[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterKind, setFilterKind] = useState(searchParams.get('kind') ?? '')
  const [filterAccountId, setFilterAccountId] = useState(searchParams.get('accountId') ?? '')
  const [filterMinSize, setFilterMinSize] = useState(() => {
    const min = searchParams.get('minSize')
    return min ? String(Math.round(Number(min) / (1024 * 1024))) : ''
  })
  const [filterMaxSize, setFilterMaxSize] = useState(() => {
    const max = searchParams.get('maxSize')
    return max ? String(Math.round(Number(max) / (1024 * 1024))) : ''
  })
  const [filterStartDate, setFilterStartDate] = useState(() => {
    const raw = searchParams.get('startDate')
    return raw ? raw.split('T')[0] : ''
  })
  const [filterEndDate, setFilterEndDate] = useState(() => {
    const raw = searchParams.get('endDate')
    return raw ? raw.split('T')[0] : ''
  })

  useEffect(() => {
    setAvatarError(false)
    getGravatarUrl(user?.email, 64).then(setProfileImageUrl).catch(() => setProfileImageUrl(''))
  }, [user?.email])

  async function loadSidebarStats() {
    await Promise.all([
      apiFetch<StorageSummary>('/storage/summary').then(setStorage),
      apiFetch<StorageBreakdown>('/storage/breakdown').then(setBreakdown),
    ])
  }

  async function loadConnectedAccounts() {
    try {
      const data = await apiFetch<{ accounts: ConnectedAccount[] }>('/connected-accounts')
      setAccounts(data.accounts)
    } catch (e) {
      console.error('Failed to load accounts', e)
    }
  }

  useEffect(() => {
    setSearchValue(searchParams.get('q') ?? '')
    setFilterKind(searchParams.get('kind') ?? '')
    setFilterAccountId(searchParams.get('accountId') ?? '')
    setFilterMinSize(() => {
      const min = searchParams.get('minSize')
      return min ? String(Math.round(Number(min) / (1024 * 1024))) : ''
    })
    setFilterMaxSize(() => {
      const max = searchParams.get('maxSize')
      return max ? String(Math.round(Number(max) / (1024 * 1024))) : ''
    })
    const rawStart = searchParams.get('startDate')
    setFilterStartDate(rawStart ? rawStart.split('T')[0] : '')
    const rawEnd = searchParams.get('endDate')
    setFilterEndDate(rawEnd ? rawEnd.split('T')[0] : '')
  }, [searchParams])

  async function logout() {
    await apiFetch('/auth/logout', { method: 'POST' }).catch(() => undefined)
    clearAuthSession()
    navigate('/login')
  }

  function applyFilters() {
    const nextParams = new URLSearchParams()
    const activeFolderId = searchParams.get('folderId')
    if (activeFolderId && location.pathname === '/all-files') nextParams.set('folderId', activeFolderId)
    const q = searchValue.trim()
    if (q) nextParams.set('q', q)
    if (filterKind) nextParams.set('kind', filterKind)
    if (filterAccountId) nextParams.set('accountId', filterAccountId)
    if (filterMinSize) { const b = Number(filterMinSize) * 1024 * 1024; if (!isNaN(b)) nextParams.set('minSize', String(b)) }
    if (filterMaxSize) { const b = Number(filterMaxSize) * 1024 * 1024; if (!isNaN(b)) nextParams.set('maxSize', String(b)) }
    if (filterStartDate) nextParams.set('startDate', new Date(filterStartDate).toISOString())
    if (filterEndDate) nextParams.set('endDate', new Date(filterEndDate).toISOString())
    setFiltersOpen(false)
    navigate({ pathname: '/all-files', search: nextParams.toString() })
  }

  function clearFilters() {
    setFilterKind(''); setFilterAccountId(''); setFilterMinSize(''); setFilterMaxSize('')
    setFilterStartDate(''); setFilterEndDate(''); setFiltersOpen(false)
    const nextParams = new URLSearchParams()
    const activeFolderId = searchParams.get('folderId')
    if (activeFolderId && location.pathname === '/all-files') nextParams.set('folderId', activeFolderId)
    const q = searchValue.trim()
    if (q) nextParams.set('q', q)
    navigate({ pathname: '/all-files', search: nextParams.toString() })
  }

  function searchFiles(event: FormEvent) {
    event.preventDefault()
    applyFilters()
  }

  useEffect(() => {
    apiFetch<{ user: AuthUser }>('/auth/me')
      .then((data) => { setUser(data.user); updateStoredUser(data.user) })
      .catch(() => undefined)
    loadSidebarStats().catch(() => undefined)
    loadConnectedAccounts().catch(() => undefined)
    window.addEventListener('opendrive:storage-changed', loadSidebarStats)
    return () => window.removeEventListener('opendrive:storage-changed', loadSidebarStats)
  }, [])



  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <div className="flex min-h-screen w-full flex-col bg-gray-50 lg:h-screen lg:overflow-hidden lg:flex-row">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:h-screen lg:shrink-0">
          <Sidebar storage={storage} breakdown={breakdown} onLogout={logout} />
        </div>

        {/* Mobile sidebar overlay */}
        <div
          className={cn('fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden', sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0')}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={cn('fixed inset-y-0 left-0 z-50 transform bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}
        >
          <div className="absolute right-4 top-4 z-10">
            <button type="button" onClick={() => setSidebarOpen(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <Sidebar storage={storage} breakdown={breakdown} onLogout={logout} onNavigate={() => setSidebarOpen(false)} />
        </div>

        {/* Main area */}
        <section className="min-w-0 flex-1 flex flex-col lg:h-screen lg:overflow-hidden">

          {/* Header */}
          <header className="flex w-full shrink-0 items-center gap-3 bg-white px-5 py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
            {/* Mobile hamburger */}
            <button type="button" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-sm">
              <form onSubmit={searchFiles} className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search files..."
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 placeholder-slate-400 focus:border-red-400 focus:bg-white focus:outline-none transition-colors"
                />
                <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className={cn('absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600', filtersOpen && 'text-red-500')}>
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </form>

              {/* Filters dropdown */}
              {filtersOpen && (
                <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm font-bold text-slate-900">Search Filters</span>
                    <button type="button" onClick={clearFilters} className="text-xs font-bold text-red-500 hover:text-red-600">Clear</button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">File Type</label>
                      <select value={filterKind} onChange={(e) => setFilterKind(e.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none">
                        <option value="">All Types</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="doc">Document</option>
                        <option value="archive">Archive</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Account</label>
                      <select value={filterAccountId} onChange={(e) => setFilterAccountId(e.target.value)} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none">
                        <option value="">All Accounts</option>
                        {accounts.map((acc) => <option key={acc.id} value={acc.id}>{acc.email}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
                    <Button variant="outline" size="sm" type="button" onClick={() => setFiltersOpen(false)}>Cancel</Button>
                    <Button size="sm" type="button" onClick={applyFilters} className="bg-red-600 hover:bg-red-700 text-white border-0">Apply</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Header actions from child pages */}
            {headerActions ? (
              <div className="hidden lg:flex items-center gap-2 shrink-0">{headerActions}</div>
            ) : null}

            {/* Right icons */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto lg:ml-0">
              {/* User */}
              <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
                {profileImageUrl && !avatarError ? (
                  <img src={profileImageUrl} alt="avatar" className="h-8 w-8 rounded-full object-cover" onError={() => setAvatarError(true)} />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-rose-600 text-xs font-bold text-white">
                    {(user?.name ?? user?.email ?? 'U').trim().charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-[13px] font-semibold text-slate-800">{user?.name?.split(' ')[0] ?? 'User'}</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 lg:p-8">
            <Outlet context={{ setHeaderActions } satisfies DriveLayoutContext} />
          </div>
        </section>
      </div>

      {/* Upload progress panel */}
      {uploadProgress.open ? (
        <div className="fixed inset-x-3 bottom-3 z-[70] max-h-[70dvh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[min(420px,calc(100vw-2.5rem))]">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              {uploadProgress.status === 'done' ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : uploadProgress.status === 'error' || uploadProgress.status === 'partial' ? <X className="h-5 w-5 text-red-500" /> : <Upload className="h-5 w-5 text-red-500" />}
              {uploadProgress.status === 'done' ? 'Upload complete' : uploadProgress.status === 'partial' ? 'Completed with errors' : uploadProgress.status === 'error' ? 'Upload failed' : uploadProgress.percent >= 99 ? 'Processing...' : 'Uploading files'}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setUploadProgressCollapsed(!uploadProgressCollapsed)}>
                <ChevronDown className={cn('h-4 w-4 transition-transform', uploadProgressCollapsed && 'rotate-180')} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setUploadProgress((c) => ({ ...c, open: false }))}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!uploadProgressCollapsed && (
            <div className="p-4">
              <div className="flex items-center justify-between gap-3 text-sm mb-2">
                <p className="truncate font-semibold text-slate-800">{uploadProgress.fileName}</p>
                <span className="text-slate-500 shrink-0">{uploadProgress.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={cn('h-full rounded-full transition-all', uploadProgress.status === 'error' || uploadProgress.status === 'partial' ? 'bg-red-500' : uploadProgress.status === 'done' ? 'bg-emerald-500' : 'bg-red-500')}
                  style={{ width: `${uploadProgress.percent}%` }}
                />
              </div>
              {uploadProgress.files.length > 0 && (
                <div className="mt-4 grid max-h-52 gap-2 overflow-y-auto">
                  {uploadProgress.files.map((file, i) => (
                    <div key={`${file.name}-${i}`} className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <p className="truncate font-semibold text-slate-800">{file.name}</p>
                        <span className="shrink-0 text-xs text-slate-400">{file.percent}%</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                        <div className={cn('h-full rounded-full', file.status === 'error' ? 'bg-red-500' : file.status === 'done' ? 'bg-emerald-500' : 'bg-red-500')} style={{ width: `${file.percent}%` }} />
                      </div>
                      {file.status === 'error' && (
                        <Button className="mt-2 h-6 px-2 text-[11px] bg-red-600 hover:bg-red-700 text-white border-0" onClick={() => retryFailedUpload(file.name)}>Retry</Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </main>
  )
}
