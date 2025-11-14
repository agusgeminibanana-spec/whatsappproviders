
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc, addDoc, collection, query, orderBy, deleteDoc, Timestamp } from "firebase/firestore";
import {
  ArrowLeft, Phone, Mail, MapPin, Tag, Edit, Trash2, Plus, MessageSquare, Briefcase
} from "lucide-react";

// Interfaces for Firestore data
interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  company?: string;
  position?: string;
  status?: "active" | "inactive" | "lead";
  tags?: string[];
  address?: string;
  joinDate?: Timestamp;
  totalValue?: string;
  notes?: string;
  whatsappId?: string; // To link to the chat
}

interface Interaction {
  id: string;
  type: "message" | "call" | "email" | "note";
  content: string;
  timestamp: Timestamp;
  details?: string;
}

// Helper to get initials
const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length > 1) return words[0][0] + words[1][0];
    return name.substring(0, 2);
};

// Helper to format Timestamps
const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString();
};

const formatTime = (timestamp?: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleTimeString();
}

export default function CustomerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [editingNote, setEditingNote] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  // Fetch contact data
  useEffect(() => {
    if (!id) return;
    const contactRef = doc(db, "crm_contacts", id);
    const unsubscribe = onSnapshot(contactRef, (doc) => {
      if (doc.exists()) {
        const data = { id: doc.id, ...doc.data() } as Contact;
        setContact(data);
        setNoteInput(data.notes || "");
      } else {
        console.log("No such contact!");
        setContact(null);
      }
    });
    return () => unsubscribe();
  }, [id]);

  // Fetch interactions sub-collection
  useEffect(() => {
    if (!id) return;
    const interactionsRef = collection(db, "crm_contacts", id, "interactions");
    const q = query(interactionsRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const interactionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interaction));
      setInteractions(interactionsData);
    });
    return () => unsubscribe();
  }, [id]);

  const handleSaveNote = async () => {
    if (!id) return;
    const contactRef = doc(db, "crm_contacts", id);
    await updateDoc(contactRef, { notes: noteInput });
    setEditingNote(false);
  };

  const handleDeleteContact = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this contact? This action cannot be undone.")) {
        await deleteDoc(doc(db, "crm_contacts", id));
        navigate("/crm");
    }
  };
  
  // Placeholder for adding new interactions
  const handleAddInteraction = async () => {
    if (!id) return;
    const content = prompt("Enter interaction note:");
    if (content) {
        await addDoc(collection(db, "crm_contacts", id, "interactions"), {
            type: "note",
            content: content,
            timestamp: Timestamp.now()
        });
    }
  }

  if (!contact) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Loading Contact...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <button onClick={() => navigate("/crm")} className="mb-4 flex items-center gap-2 text-primary hover:underline transition-colors"><ArrowLeft className="h-4 w-4" />Back to Contacts</button>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              {getInitials(contact.name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{contact.name}</h1>
              <p className="text-sm text-muted-foreground">{contact.position || 'N/A'} at {contact.company || 'N/A'}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(contact.tags || []).map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs text-primary"><Tag className="h-3 w-3" />{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Contact Details</h2>
              <div className="space-y-3">
                {contact.email && <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Email</p><p className="text-foreground">{contact.email}</p></div></div>}
                {contact.phone && <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="text-foreground">{contact.phone}</p></div></div>}
                {contact.address && <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-muted-foreground flex-shrink-0" /><div><p className="text-xs text-muted-foreground">Address</p><p className="text-foreground">{contact.address}</p></div></div>}
              </div>
            </div>

            {/* Business Info */}
             <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Business Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-muted-foreground mb-1">Company</p><p className="font-semibold text-foreground">{contact.company || 'N/A'}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1">Position</p><p className="font-semibold text-foreground">{contact.position || 'N/A'}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1">Status</p><p className="font-semibold text-foreground capitalize">{contact.status || 'N/A'}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1">Total Value</p><p className="font-semibold text-foreground">{contact.totalValue || 'N/A'}</p></div>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-foreground">Notes</h2><button onClick={() => setEditingNote(!editingNote)} className="flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors"><Edit className="h-4 w-4" />{editingNote ? 'Cancel' : 'Edit'}</button></div>
              {editingNote ? (
                <div className="space-y-2">
                  <textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)} className="w-full h-24 rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <div className="flex gap-2"><button onClick={handleSaveNote} className="flex-1 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 transition-colors">Save</button></div>
                </div>
              ) : (
                <p className="text-muted-foreground whitespace-pre-wrap">{contact.notes || "No notes yet."}</p>
              )}
            </div>

            {/* Interaction Timeline */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-foreground">Interaction History</h2><button onClick={handleAddInteraction} className="flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors"><Plus className="h-4 w-4" />Add</button></div>
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary"><MessageSquare className="h-5 w-5 text-muted-foreground" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-foreground capitalize">{interaction.type}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(interaction.timestamp)}</p>
                      </div>
                      <p className="text-sm text-foreground mb-1">{interaction.content}</p>
                      {interaction.details && <p className="text-xs text-muted-foreground">{interaction.details}</p>}
                    </div>
                  </div>
                ))}
                 {interactions.length === 0 && <p className='text-muted-foreground text-sm'>No interactions logged yet.</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">Quick Stats</h3>
              <div className="space-y-3">
                <div><p className="text-xs text-muted-foreground mb-1">Member Since</p><p className="font-semibold text-foreground">{formatDate(contact.joinDate)}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1">Total Interactions</p><p className="font-semibold text-foreground">{interactions.length}</p></div>
                <div><p className="text-xs text-muted-foreground mb-1">Account Value</p><p className="font-semibold text-foreground">{contact.totalValue || 'N/A'}</p></div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button onClick={() => contact.whatsappId && navigate(`/chats/${contact.whatsappId}`)} disabled={!contact.whatsappId} className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">Send Message</button>
              <a href={`tel:${contact.phone}`} className="w-full block text-center rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors"><Phone className="h-4 w-4 inline-block mr-2" />Call</a>
              <a href={`mailto:${contact.email}`} className="w-full block text-center rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors"><Mail className="h-4 w-4 inline-block mr-2" />Email</a>
            </div>

            {/* Danger Zone */}
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <button onClick={handleDeleteContact} className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-red-500 hover:bg-red-500/20 transition-colors"><Trash2 className="h-4 w-4" />Delete Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
