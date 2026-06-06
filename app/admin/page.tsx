"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "contacts" | "members" | "projects" | "achievements" | "sponsors";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  
  // Data lists
  const [contacts, setContacts] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  
  // UI states
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null); // null means adding new

  // Check Session
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push("/admin/login");
        }
      })
      .catch(() => {
        setAuthenticated(false);
        router.push("/admin/login");
      });
  }, [router]);

  // Load Data based on Tab
  useEffect(() => {
    if (authenticated) {
      loadTabContextData(activeTab);
    }
  }, [authenticated, activeTab]);

  async function loadTabContextData(tab: Tab) {
    setLoadingData(true);
    try {
      const endpoint = tab === "contacts" ? "/api/contacts" : `/api/${tab}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        if (tab === "contacts") setContacts(data);
        else if (tab === "members") setMembers(data);
        else if (tab === "projects") {
          // Parse project JSON fields for edit preview
          const parsed = data.map((p: any) => ({
            ...p,
            capabilities: typeof p.capabilities === "string" ? JSON.parse(p.capabilities) : p.capabilities,
            technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies,
            team: typeof p.team === "string" ? JSON.parse(p.team) : p.team,
          }));
          setProjects(parsed);
        }
        else if (tab === "achievements") setAchievements(data);
        else if (tab === "sponsors") setSponsors(data);
      }
    } catch (err) {
      console.error("Failed to fetch data for " + tab, err);
    } finally {
      setLoadingData(false);
    }
  }

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/admin/login");
      router.refresh();
    }
  }

  // Upload file helper
  async function uploadFile(file: File): Promise<string> {
    setUploadingFile(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.url;
    } finally {
      setUploadingFile(false);
    }
  }

  // Delete item handler
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const endpoint = activeTab === "contacts" ? `/api/contacts?id=${id}` : `/api/${activeTab}?id=${id}`;
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        loadTabContextData(activeTab);
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  }

  // Toggle contact status
  async function handleUpdateContactStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === "New" ? "Contacted" : currentStatus === "Contacted" ? "Completed" : "New";
    try {
      const res = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        loadTabContextData("contacts");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.org && c.org.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleExportCSV() {
    if (contacts.length === 0) {
      alert("No contacts to export.");
      return;
    }

    const headers = ["ID", "Name", "Organisation", "Email", "Partnership Type", "Message", "Status", "Submitted At"];
    const rows = contacts.map(c => [
      c.id,
      c.name,
      c.org || "",
      c.email,
      c.kind,
      c.message || "",
      c.status,
      new Date(c.submittedAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row =>
        row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `oracle_partnership_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0505] flex items-center justify-center text-white font-mono text-sm">
        Validating session...
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(160deg, #0a0505 0%, #150a0a 50%, #200c0c 100%)" }}
      />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,75,75,0.08) 0%, transparent 60%)", filter: "blur(50px)" }} />

      <div className="relative z-[3] min-h-screen text-white flex flex-col">
        {/* Top Header */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ff3d3d] animate-pulse" />
            <h1 className="font-semibold text-lg tracking-tight">Oracle KAU Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs px-5 py-2 rounded-full transition"
          >
            Logout
          </button>
        </header>

        {/* Layout Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="border-r border-white/15 p-6 flex flex-col gap-2">
            {[
              { id: "contacts", label: "Partnership Requests" },
              { id: "members", label: "Members" },
              { id: "projects", label: "Projects" },
              { id: "achievements", label: "Achievements" },
              { id: "sponsors", label: "Sponsors" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as Tab)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  activeTab === t.id
                    ? "bg-[#ff3d3d]/15 text-[#ff4b4b] border border-[#ff3d3d]/30 font-semibold"
                    : "text-white/55 hover:bg-white/[0.03] hover:text-white border border-transparent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </aside>

          {/* Main Area */}
          <main className="p-8">
            <div className="max-w-[1200px] mx-auto">
              {/* Header Title & Action */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold capitalize tracking-tight">{activeTab === "contacts" ? "Partnership Requests" : activeTab}</h2>
                  <p className="text-white/40 text-xs mt-1">Manage all {activeTab} content displayed on the website</p>
                </div>
                {activeTab !== "contacts" && (
                  <button
                    onClick={() => {
                      setCurrentItem(null);
                      setModalOpen(true);
                    }}
                    className="bg-[#ff3d3d] hover:bg-[#e02d2d] text-white font-semibold text-xs px-6 py-2.5 rounded-full transition"
                  >
                    Add New +
                  </button>
                )}
              </div>

              {/* Dashboard Controls for Submissions */}
              {activeTab === "contacts" && !loadingData && (
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search requests by name, organization, email or message..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                      />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#120a0a] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-[#ff4b4b]/40"
                      >
                        <option value="All">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Export CSV Button */}
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="border border-white/20 hover:border-white/40 text-white hover:bg-white/[0.03] text-xs px-5 py-2.5 rounded-full transition font-semibold cursor-pointer"
                  >
                    Export CSV
                  </button>
                </div>
              )}

              {/* Loader */}
              {loadingData ? (
                <div className="text-center text-white/30 py-20 text-xs font-mono">Loading data context...</div>
              ) : (
                /* Tab Panels */
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 overflow-x-auto">
                  {activeTab === "contacts" && (
                    <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase font-semibold">
                          <th className="pb-4 w-[180px]">Details</th>
                          <th className="pb-4 w-[120px]">Interest</th>
                          <th className="pb-4">Message</th>
                          <th className="pb-4 w-[110px]">Status</th>
                          <th className="pb-4 w-[80px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContacts.length === 0 ? (
                          <tr><td colSpan={5} className="text-center text-white/20 py-10">No submissions found.</td></tr>
                        ) : (
                          filteredContacts.map((c) => (
                            <tr key={c.id} className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                              <td className="py-4">
                                <div className="font-semibold">{c.name}</div>
                                <div className="text-xs text-white/40 mt-0.5">{c.org || "No Organisation"}</div>
                                <div className="text-xs text-[#ff4b4b] mt-1 font-mono">{c.email}</div>
                              </td>
                              <td className="py-4 capitalize font-semibold">{c.kind}</td>
                              <td className="py-4 text-xs text-white/70 max-w-[280px] pr-4 whitespace-pre-wrap">{c.message || "No message."}</td>
                              <td className="py-4">
                                <button
                                  onClick={() => handleUpdateContactStatus(c.id, c.status)}
                                  className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border transition ${
                                    c.status === "New"
                                      ? "text-[#ff4b4b] bg-[#ff4b4b]/10 border-[#ff4b4b]/30 hover:bg-[#ff4b4b]/20"
                                      : c.status === "Contacted"
                                      ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20"
                                      : "text-emerald-500 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20"
                                  }`}
                                >
                                  {c.status}
                                </button>
                              </td>
                              <td className="py-4">
                                <button
                                  onClick={() => handleDelete(c.id, c.name)}
                                  className="text-white/30 hover:text-red-500 text-xs transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {activeTab === "members" && (
                    <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase font-semibold">
                          <th className="pb-4 w-[60px]">Avatar</th>
                          <th className="pb-4">Name</th>
                          <th className="pb-4">Role</th>
                          <th className="pb-4">Dept</th>
                          <th className="pb-4 w-[80px]">Order</th>
                          <th className="pb-4 w-[120px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.length === 0 ? (
                          <tr><td colSpan={6} className="text-center text-white/20 py-10">No members found.</td></tr>
                        ) : (
                          members.map((m) => (
                            <tr key={m.id} className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                              <td className="py-4">
                                <div className="w-10 h-10 rounded-full bg-[#931f1f] text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                                  {m.imageUrl ? <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" /> : m.initials}
                                </div>
                              </td>
                              <td className="py-4 font-semibold">{m.name}</td>
                              <td className="py-4 text-xs text-white/60">{m.role}</td>
                              <td className="py-4 text-xs capitalize text-white/60">{m.department}</td>
                              <td className="py-4 font-mono text-xs">{m.order}</td>
                              <td className="py-4 space-x-3">
                                <button
                                  onClick={() => {
                                    setCurrentItem(m);
                                    setModalOpen(true);
                                  }}
                                  className="text-white/40 hover:text-[#ff4b4b] text-xs transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(m.id, m.name)}
                                  className="text-white/20 hover:text-red-500 text-xs transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {activeTab === "projects" && (
                    <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase font-semibold">
                          <th className="pb-4 w-[60px]">Num</th>
                          <th className="pb-4">Project</th>
                          <th className="pb-4">Category</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 w-[120px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.length === 0 ? (
                          <tr><td colSpan={5} className="text-center text-white/20 py-10">No projects found.</td></tr>
                        ) : (
                          projects.map((p) => (
                            <tr key={p.id} className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                              <td className="py-4 font-mono text-white/40">{p.num}</td>
                              <td className="py-4 font-semibold">{p.name}</td>
                              <td className="py-4 text-xs text-white/60">{p.category}</td>
                              <td className="py-4 text-xs text-white/60">{p.status}</td>
                              <td className="py-4 space-x-3">
                                <button
                                  onClick={() => {
                                    setCurrentItem(p);
                                    setModalOpen(true);
                                  }}
                                  className="text-white/40 hover:text-[#ff4b4b] text-xs transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(p.id, p.name)}
                                  className="text-white/20 hover:text-red-500 text-xs transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {activeTab === "achievements" && (
                    <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase font-semibold">
                          <th className="pb-4 w-[80px]">Year</th>
                          <th className="pb-4 w-[100px]">Banner</th>
                          <th className="pb-4">Achievement Title</th>
                          <th className="pb-4 w-[120px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {achievements.length === 0 ? (
                          <tr><td colSpan={4} className="text-center text-white/20 py-10">No achievements found.</td></tr>
                        ) : (
                          achievements.map((a) => (
                            <tr key={a.id} className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                              <td className="py-4 font-mono font-semibold text-[#ff4b4b]">{a.year}</td>
                              <td className="py-4">
                                <div className="w-16 h-10 rounded bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                                  {a.imageUrl ? <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" /> : <span className="text-[10px] text-white/20">Empty</span>}
                                </div>
                              </td>
                              <td className="py-4 font-semibold">{a.title}</td>
                              <td className="py-4 space-x-3">
                                <button
                                  onClick={() => {
                                    setCurrentItem(a);
                                    setModalOpen(true);
                                  }}
                                  className="text-white/40 hover:text-[#ff4b4b] text-xs transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(a.id, a.title)}
                                  className="text-white/20 hover:text-red-500 text-xs transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {activeTab === "sponsors" && (
                    <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase font-semibold">
                          <th className="pb-4 w-[60px]">Logo</th>
                          <th className="pb-4">Sponsor Name</th>
                          <th className="pb-4">Tier/Level</th>
                          <th className="pb-4 w-[120px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sponsors.length === 0 ? (
                          <tr><td colSpan={4} className="text-center text-white/20 py-10">No sponsors found.</td></tr>
                        ) : (
                          sponsors.map((s) => (
                            <tr key={s.id} className="border-b border-white/[0.05] hover:bg-white/[0.01]">
                              <td className="py-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                  {s.logoUrl ? <img src={s.logoUrl} alt={s.name} className="w-full h-full object-contain" /> : <span className="text-[9px] text-white/30">N/A</span>}
                                </div>
                              </td>
                              <td className="py-4 font-semibold">{s.name}</td>
                              <td className="py-4 text-xs text-white/60">{s.tier}</td>
                              <td className="py-4 space-x-3">
                                <button
                                  onClick={() => {
                                    setCurrentItem(s);
                                    setModalOpen(true);
                                  }}
                                  className="text-white/40 hover:text-[#ff4b4b] text-xs transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(s.id, s.name)}
                                  className="text-white/20 hover:text-red-500 text-xs transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Editor Modal overlay */}
      <AnimatePresence>
        {modalOpen && (
          <ModalForm
            tab={activeTab}
            item={currentItem}
            onClose={() => setModalOpen(false)}
            onSave={() => {
              setModalOpen(false);
              loadTabContextData(activeTab);
            }}
            uploadFile={uploadFile}
            uploading={uploadingFile}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Modal Form component representing editors
function ModalForm({
  tab,
  item,
  onClose,
  onSave,
  uploadFile,
  uploading,
}: {
  tab: Tab;
  item: any | null;
  onClose: () => void;
  onSave: () => void;
  uploadFile: (file: File) => Promise<string>;
  uploading: boolean;
}) {
  const isEdit = !!item;
  const [loading, setLoading] = useState(false);

  // Forms state
  // Members State
  const [memberName, setMemberName] = useState(item?.name || "");
  const [memberRole, setMemberRole] = useState(item?.role || "MEMBER");
  const [memberDept, setMemberDept] = useState(item?.department || "tech");
  const [memberInitials, setMemberInitials] = useState(item?.initials || "");
  const [memberAcademic, setMemberAcademic] = useState(item?.academic || "");
  const [memberQuote, setMemberQuote] = useState(item?.quote || "");
  const [memberLinkedin, setMemberLinkedin] = useState(item?.linkedin || "");
  const [memberGithub, setMemberGithub] = useState(item?.github || "");
  const [memberTwitter, setMemberTwitter] = useState(item?.twitter || "");
  const [memberEmail, setMemberEmail] = useState(item?.email || "");
  const [memberImageUrl, setMemberImageUrl] = useState(item?.imageUrl || "");
  const [memberOrder, setMemberOrder] = useState(item?.order !== undefined ? String(item.order) : "10");
  const [memberIsLeadership, setMemberIsLeadership] = useState(item?.isLeadership || false);

  // Projects State
  const [projectName, setProjectName] = useState(item?.name || "");
  const [projectNum, setProjectNum] = useState(item?.num || "");
  const [projectCategory, setProjectCategory] = useState(item?.category || "");
  const [projectStatus, setProjectStatus] = useState(item?.status || "INTERNAL TOOL");
  const [projectDesc, setProjectDesc] = useState(item?.desc || "");
  const [projectTech, setProjectTech] = useState(item?.technologies ? item.technologies.join(", ") : "");
  const [projectGithub, setProjectGithub] = useState(item?.github || "");
  const [projectYear, setProjectYear] = useState(item?.year || "2026");
  const [projectOrder, setProjectOrder] = useState(item?.order !== undefined ? String(item.order) : "0");
  
  // Capabilities structure
  const [projectCaps, setProjectCaps] = useState<{ title: string; desc: string }[]>(
    item?.capabilities || [{ title: "", desc: "" }]
  );
  // Team members structure
  const [projectTeam, setProjectTeam] = useState<{ initials: string; name: string; role: string }[]>(
    item?.team || [{ initials: "", name: "", role: "" }]
  );

  // Achievements State
  const [achYear, setAchYear] = useState(item?.year || "2026");
  const [achTitle, setAchTitle] = useState(item?.title || "");
  const [achText, setAchText] = useState(item?.text || "");
  const [achImageUrl, setAchImageUrl] = useState(item?.imageUrl || "");

  // Sponsors State
  const [sponName, setSponName] = useState(item?.name || "");
  const [sponTier, setSponTier] = useState(item?.tier || "Workshop Host");
  const [sponLogoUrl, setSponLogoUrl] = useState(item?.logoUrl || "");

  // File Change handlers
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setUrl: (url: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      setUrl(url);
    } catch (err) {
      alert("Image upload failed.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let payload: any = {};
    if (tab === "members") {
      payload = {
        id: item?.id,
        name: memberName,
        role: memberRole,
        department: memberDept,
        initials: memberInitials || memberName.split(" ").map((n: string) => n[0]).join("").substring(0,2).toUpperCase(),
        academic: memberAcademic,
        quote: memberQuote || null,
        linkedin: memberLinkedin || null,
        github: memberGithub || null,
        twitter: memberTwitter || null,
        email: memberEmail || null,
        imageUrl: memberImageUrl || null,
        order: Number(memberOrder) || 10,
        isLeadership: memberIsLeadership,
      };
    } else if (tab === "projects") {
      // Clean and stringify capabilities/team arrays
      const filteredCaps = projectCaps.filter(c => c.title.trim());
      const filteredTeam = projectTeam.filter(t => t.name.trim());
      const cleanedTech = projectTech.split(",").map((t: string) => t.trim()).filter(Boolean);

      payload = {
        id: item?.id,
        name: projectName,
        num: projectNum || "01",
        category: projectCategory,
        status: projectStatus,
        desc: projectDesc,
        capabilities: JSON.stringify(filteredCaps),
        technologies: JSON.stringify(cleanedTech),
        team: JSON.stringify(filteredTeam.map((t: any) => ({
          ...t,
          initials: t.initials || t.name.split(" ").map((n: string) => n[0]).join("").substring(0,2).toUpperCase()
        }))),
        github: projectGithub || null,
        year: projectYear,
        order: Number(projectOrder) || 0,
      };
    } else if (tab === "achievements") {
      payload = {
        id: item?.id,
        year: achYear,
        title: achTitle,
        text: achText,
        imageUrl: achImageUrl,
      };
    } else if (tab === "sponsors") {
      payload = {
        id: item?.id,
        name: sponName,
        tier: sponTier,
        logoUrl: sponLogoUrl,
      };
    }

    try {
      const res = await fetch(`/api/${tab}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSave();
      } else {
        const error = await res.json();
        alert(error.error || "Save operation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving record.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="w-full max-w-[640px] bg-[#120a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl text-white my-8 max-h-[85vh] flex flex-col"
      >
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
          <h3 className="text-lg font-semibold capitalize">
            {isEdit ? "Edit" : "Add New"} {tab.slice(0, -1)}
          </h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
          {tab === "members" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Full Name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="E.g. Rayan AlYasi"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Initials</label>
                  <input
                    type="text"
                    value={memberInitials}
                    onChange={(e) => setMemberInitials(e.target.value)}
                    placeholder="E.g. RA (leave blank to auto-generate)"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Role Name</label>
                  <input
                    type="text"
                    required
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    placeholder="E.g. MEMBER, LEADER - TECH"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Department</label>
                  <select
                    value={memberDept}
                    onChange={(e) => setMemberDept(e.target.value)}
                    className="bg-[#120a0a] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff4b4b]/40 cursor-pointer"
                  >
                    <option value="presidency">Presidency</option>
                    <option value="tech">Tech</option>
                    <option value="media">Media</option>
                    <option value="hr">Human Resources</option>
                    <option value="pr">Public Relations</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Academic Info</label>
                <input
                  type="text"
                  required
                  value={memberAcademic}
                  onChange={(e) => setMemberAcademic(e.target.value)}
                  placeholder="E.g. Computer Science Senior"
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Quote / Bio Statement</label>
                <textarea
                  rows={2}
                  value={memberQuote}
                  onChange={(e) => setMemberQuote(e.target.value)}
                  placeholder="E.g. Code that ships beats code that is perfect."
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-[#ff4b4b]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={memberLinkedin}
                    onChange={(e) => setMemberLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">GitHub Link</label>
                  <input
                    type="url"
                    value={memberGithub}
                    onChange={(e) => setMemberGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">X (Twitter) URL</label>
                  <input
                    type="url"
                    value={memberTwitter}
                    onChange={(e) => setMemberTwitter(e.target.value)}
                    placeholder="https://x.com/..."
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Email</label>
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="username@kau.edu.sa"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Member Headshot Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setMemberImageUrl)}
                    className="text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer"
                  />
                  {memberImageUrl && <div className="text-[10px] text-[#ff4b4b] truncate font-mono mt-1">{memberImageUrl}</div>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Sort Order</label>
                  <input
                    type="number"
                    value={memberOrder}
                    onChange={(e) => setMemberOrder(e.target.value)}
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="chkLeadership"
                  checked={memberIsLeadership}
                  onChange={(e) => setMemberIsLeadership(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#ff3d3d] border-white/20 outline-none bg-white/5 cursor-pointer"
                />
                <label htmlFor="chkLeadership" className="text-sm font-semibold cursor-pointer select-none">
                  Is part of Leadership / Founding Crew?
                </label>
              </div>
            </>
          )}

          {tab === "projects" && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Project Name</label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="KAU Event Platform"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Number/ID (num)</label>
                  <input
                    type="text"
                    required
                    value={projectNum}
                    onChange={(e) => setProjectNum(e.target.value)}
                    placeholder="E.g. 03"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Category</label>
                  <input
                    type="text"
                    required
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    placeholder="E.g. Web Platform, Internal Tool"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Status Badge</label>
                  <input
                    type="text"
                    required
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    placeholder="E.g. PUBLIC LIVE, FLAGSHIP"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Project Description</label>
                <textarea
                  rows={3}
                  required
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Provide a comprehensive summary of the project goals..."
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-[#ff4b4b]/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Technologies (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={projectTech}
                  onChange={(e) => setProjectTech(e.target.value)}
                  placeholder="React, Next.js, Oracle DB, TailwindCSS"
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Launch Year</label>
                  <input
                    type="text"
                    required
                    value={projectYear}
                    onChange={(e) => setProjectYear(e.target.value)}
                    placeholder="E.g. 2026"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              {/* Capabilities */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Capabilities / Key Features</label>
                  <button
                    type="button"
                    onClick={() => setProjectCaps([...projectCaps, { title: "", desc: "" }])}
                    className="text-[10px] text-[#ff4b4b] hover:underline"
                  >
                    + Add Capability
                  </button>
                </div>
                {projectCaps.map((cap, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Title (e.g. QR Check-ins)"
                      value={cap.title}
                      onChange={(e) => {
                        const next = [...projectCaps];
                        next[idx].title = e.target.value;
                        setProjectCaps(next);
                      }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white outline-none flex-1 focus:border-[#ff4b4b]/40"
                    />
                    <input
                      type="text"
                      placeholder="Description (e.g. fast check-ins)"
                      value={cap.desc}
                      onChange={(e) => {
                        const next = [...projectCaps];
                        next[idx].desc = e.target.value;
                        setProjectCaps(next);
                      }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white outline-none flex-[2] focus:border-[#ff4b4b]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setProjectCaps(projectCaps.filter((_, i) => i !== idx))}
                      className="text-xs text-white/30 hover:text-red-500 px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Team members */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Team Members</label>
                  <button
                    type="button"
                    onClick={() => setProjectTeam([...projectTeam, { initials: "", name: "", role: "" }])}
                    className="text-[10px] text-[#ff4b4b] hover:underline"
                  >
                    + Add Team Member
                  </button>
                </div>
                {projectTeam.map((member, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Name (e.g. Sohaib Aloudi)"
                      value={member.name}
                      onChange={(e) => {
                        const next = [...projectTeam];
                        next[idx].name = e.target.value;
                        setProjectTeam(next);
                      }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white outline-none flex-[2] focus:border-[#ff4b4b]/40"
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Tech Lead)"
                      value={member.role}
                      onChange={(e) => {
                        const next = [...projectTeam];
                        next[idx].role = e.target.value;
                        setProjectTeam(next);
                      }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white outline-none flex-1 focus:border-[#ff4b4b]/40"
                    />
                    <input
                      type="text"
                      placeholder="Initials"
                      value={member.initials}
                      onChange={(e) => {
                        const next = [...projectTeam];
                        next[idx].initials = e.target.value;
                        setProjectTeam(next);
                      }}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white outline-none w-[70px] text-center focus:border-[#ff4b4b]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setProjectTeam(projectTeam.filter((_, i) => i !== idx))}
                      className="text-xs text-white/30 hover:text-red-500 px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "achievements" && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Achievement Title</label>
                  <input
                    type="text"
                    required
                    value={achTitle}
                    onChange={(e) => setAchTitle(e.target.value)}
                    placeholder="E.g. Engineering Day Participation"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Year</label>
                  <input
                    type="text"
                    required
                    value={achYear}
                    onChange={(e) => setAchYear(e.target.value)}
                    placeholder="E.g. 2026"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Description / Text</label>
                <textarea
                  rows={4}
                  required
                  value={achText}
                  onChange={(e) => setAchText(e.target.value)}
                  placeholder="Provide a detailed description of the event or achievement..."
                  className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-[#ff4b4b]/40"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Banner Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setAchImageUrl)}
                  className="text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer"
                />
                {achImageUrl && <div className="text-[10px] text-[#ff4b4b] truncate font-mono mt-2">{achImageUrl}</div>}
              </div>
            </>
          )}

          {tab === "sponsors" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Sponsor Name</label>
                  <input
                    type="text"
                    required
                    value={sponName}
                    onChange={(e) => setSponName(e.target.value)}
                    placeholder="E.g. WADI JEDDAH"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Tier / Level</label>
                  <input
                    type="text"
                    required
                    value={sponTier}
                    onChange={(e) => setSponTier(e.target.value)}
                    placeholder="E.g. Workshop Host, Event Sponsor"
                    className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff4b4b]/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-white/35">Logo Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setSponLogoUrl)}
                  className="text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer"
                />
                {sponLogoUrl && <div className="text-[10px] text-[#ff4b4b] truncate font-mono mt-2">{sponLogoUrl}</div>}
              </div>
            </>
          )}

          <div className="border-t border-white/10 pt-6 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold text-xs px-6 py-3 rounded-full transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-[#ff3d3d] hover:bg-[#e02d2d] text-white font-semibold text-xs px-6 py-3 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : uploading ? "Uploading image..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
