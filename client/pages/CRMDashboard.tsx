
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, onSnapshot, addDoc, doc, updateDoc, Timestamp, orderBy } from "firebase/firestore";
import {
  Search,
  Plus,
  Star,
  Tag,
  MessageSquare,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

// Interface matches Firestore data structure
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  tags: string[];
  lastContact: Timestamp;
  interactions: number;
  notes: string;
  company?: string;
  isFavorite: boolean;
}

// Helper to get initials for avatar
const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length > 1) return words[0][0] + words[1][0];
    return name.substring(0, 2);
};

// Helper to format Firestore Timestamps
const formatLastContact = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
};

export default function CRMDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive" | "lead">("all");
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '' });

  useEffect(() => {
    const q = query(collection(db, "crm_contacts"), orderBy("lastContact", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
      setContacts(contactsData);
    });
    return () => unsubscribe();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      (contact.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (contact.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (contact.company?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || contact.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/20 text-primary";
      case "lead": return "bg-yellow-500/20 text-yellow-500";
      case "inactive": return "bg-muted/50 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const toggleFavorite = async (e: React.MouseEvent, id: string, isFavorite: boolean) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    const contactRef = doc(db, "crm_contacts", id);
    await updateDoc(contactRef, { isFavorite: !isFavorite });
  };

  const handleAddNewContact = async () => {
    if (!newContact.name || !newContact.email) {
      alert("Name and email are required.");
      return;
    }
    await addDoc(collection(db, "crm_contacts"), {
      ...newContact,
      status: "lead", // Default status
      tags: [],
      lastContact: Timestamp.now(),
      interactions: 0,
      notes: "",
      isFavorite: false,
    });
    setShowNewContactModal(false);
    setNewContact({ name: '', email: '', phone: '', company: '' }); // Reset form
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* ... Page Header and Stats ... */}
       <div className="border-b border-border px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Contacts & CRM</h1>
          <button
            onClick={() => setShowNewContactModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Contact
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your customer relationships and interactions
        </p>
      </div>
       <div className="border-b border-border px-6 py-4 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Contacts
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="lead">Lead</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground mb-1">Total Contacts</p>
            <p className="text-xl font-bold text-foreground">
              {contacts.length}
            </p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground mb-1">Active</p>
            <p className="text-xl font-bold text-primary">
              {contacts.filter((c) => c.status === "active").length}
            </p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground mb-1">Leads</p>
            <p className="text-xl font-bold text-yellow-500">
              {contacts.filter((c) => c.status === "lead").length}
            </p>
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground mb-1">Favorites</p>
            <p className="text-xl font-bold text-foreground">
              {contacts.filter((c) => c.isFavorite).length}
            </p>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-semibold text-foreground">
                No contacts found
              </p>
              <p className="text-sm text-muted-foreground">
                Click 'New Contact' to add your first client.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-6">
            {filteredContacts.map((contact) => (
              <Link
                key={contact.id}
                to={`/crm/${contact.id}`}
                className="block rounded-lg border border-border bg-card p-4 hover:bg-secondary transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {getInitials(contact.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary">
                        {contact.name}
                      </h3>
                      <button
                        onClick={(e) => toggleFavorite(e, contact.id, contact.isFavorite)}
                        className="flex-shrink-0 p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Star className={`h-4 w-4 ${contact.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-muted-foreground">
                      {contact.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3" /><span className="truncate">{contact.email}</span></div>}
                      {contact.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" /><span>{contact.phone}</span></div>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                      {contact.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /><span>{contact.interactions} interactions</span></div>
                      <div className="flex items-center gap-1"><Clock className="h-3 w-3" /><span>Last: {formatLastContact(contact.lastContact)}</span></div>
                      {contact.company && <span className="rounded bg-secondary px-2 py-1">{contact.company}</span>}
                    </div>
                    {contact.notes && <p className="mt-2 text-xs text-muted-foreground italic">"{contact.notes}"</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New Contact Modal */}
      {showNewContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowNewContactModal(false)}>
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-4 text-xl font-bold text-foreground">Add New Contact</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" value={newContact.name} onChange={(e) => setNewContact({...newContact, name: e.target.value})} className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Email Address" value={newContact.email} onChange={(e) => setNewContact({...newContact, email: e.target.value})} className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="tel" placeholder="Phone Number" value={newContact.phone} onChange={(e) => setNewContact({...newContact, phone: e.target.value})} className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <input type="text" placeholder="Company" value={newContact.company} onChange={(e) => setNewContact({...newContact, company: e.target.value})} className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowNewContactModal(false)} className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors">Cancel</button>
                <button onClick={handleAddNewContact} className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Add Contact</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
