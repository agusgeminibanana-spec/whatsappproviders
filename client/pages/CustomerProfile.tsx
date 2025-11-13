import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  Tag,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

interface Interaction {
  id: string;
  type: "message" | "call" | "email" | "note";
  content: string;
  timestamp: string;
  details?: string;
}

const contactsData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "SJ",
    company: "Tech Corp",
    position: "Sales Director",
    status: "active",
    tags: ["Sales", "VIP", "Premium"],
    address: "123 Tech Avenue, San Francisco, CA 94105",
    joinDate: "2021-03-15",
    totalValue: "$125,000",
    notes: "Interested in premium plan upgrade. Very responsive client.",
    isFavorite: true,
    interactions: [
      {
        id: "1",
        type: "message",
        content: "Sounds great! See you tomorrow",
        timestamp: "2 hours ago",
        details: "WhatsApp message received",
      },
      {
        id: "2",
        type: "call",
        content: "Product demo call",
        timestamp: "1 day ago",
        details: "45 minutes duration",
      },
      {
        id: "3",
        type: "email",
        content: "Sent proposal documents",
        timestamp: "2 days ago",
        details: "3 attachments included",
      },
      {
        id: "4",
        type: "note",
        content: "Client interested in enterprise plan",
        timestamp: "3 days ago",
        details: "Added by: Michael Brown",
      },
      {
        id: "5",
        type: "message",
        content: "Can we schedule a meeting?",
        timestamp: "1 week ago",
        details: "WhatsApp message sent",
      },
    ],
  },
  "2": {
    id: "2",
    name: "John Smith",
    email: "john.smith@startup.com",
    phone: "+1 (555) 234-5678",
    avatar: "JS",
    company: "Startup Inc",
    position: "CTO",
    status: "active",
    tags: ["Support", "Enterprise", "Technical"],
    address: "456 Innovation Blvd, Austin, TX 78704",
    joinDate: "2022-07-20",
    totalValue: "$75,000",
    notes: "Technical contact. Prefers detailed documentation.",
    isFavorite: false,
    interactions: [
      {
        id: "1",
        type: "message",
        content: "Thanks for the recommendation!",
        timestamp: "1 day ago",
        details: "WhatsApp message received",
      },
      {
        id: "2",
        type: "email",
        content: "Technical specification request",
        timestamp: "3 days ago",
        details: "Sent API documentation",
      },
    ],
  },
};

export default function CustomerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contact = id ? contactsData[id] : null;
  const [editingNote, setEditingNote] = useState(false);
  const [newNote, setNewNote] = useState(contact?.notes || "");

  if (!contact) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">
            Contact not found
          </h2>
          <button
            onClick={() => navigate("/crm")}
            className="mt-4 text-primary hover:underline"
          >
            Back to CRM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <button
          onClick={() => navigate("/crm")}
          className="mb-4 flex items-center gap-2 text-primary hover:underline transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </button>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
              {contact.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {contact.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {contact.position} at {contact.company}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {contact.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs text-primary"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
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
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Contact Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-foreground">{contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-foreground">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-foreground">{contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Business Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company</p>
                  <p className="font-semibold text-foreground">
                    {contact.company}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Position</p>
                  <p className="font-semibold text-foreground">
                    {contact.position}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold text-foreground capitalize">
                    {contact.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Value
                  </p>
                  <p className="font-semibold text-foreground">
                    {contact.totalValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Notes</h2>
                <button
                  onClick={() => setEditingNote(!editingNote)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>
              {editingNote ? (
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full h-24 rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingNote(false)}
                      className="flex-1 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingNote(false)}
                      className="flex-1 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">{contact.notes}</p>
              )}
            </div>

            {/* Interaction Timeline */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Interaction History
                </h2>
                <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors">
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {contact.interactions.map((interaction: Interaction) => (
                  <div
                    key={interaction.id}
                    className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                      {interaction.type === "message" && (
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      )}
                      {interaction.type === "call" && (
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      )}
                      {interaction.type === "email" && (
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      )}
                      {interaction.type === "note" && (
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-foreground capitalize">
                          {interaction.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {interaction.timestamp}
                        </p>
                      </div>
                      <p className="text-sm text-foreground mb-1">
                        {interaction.content}
                      </p>
                      {interaction.details && (
                        <p className="text-xs text-muted-foreground">
                          {interaction.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Member Since
                  </p>
                  <p className="font-semibold text-foreground">
                    {contact.joinDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Interactions
                  </p>
                  <p className="font-semibold text-foreground">
                    {contact.interactions.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Account Value
                  </p>
                  <p className="font-semibold text-foreground">
                    {contact.totalValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Send Message
              </button>
              <button className="w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </button>
              <button className="w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </button>
            </div>

            {/* Danger Zone */}
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <button className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-red-500 hover:bg-red-500/20 transition-colors">
                <Trash2 className="h-4 w-4" />
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
