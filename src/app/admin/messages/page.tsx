"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/admin/ui/DataTable";
import { toast } from "sonner";
import { FiMail, FiTrash2, FiEye } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/messages");
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.patch(`/messages/${id}/read`);
      fetchMessages();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/messages/${id}`);
      toast.success("Message deleted");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const columns = [
    { 
      header: "From", 
      accessor: (item: Message) => (
        <div className={cn("flex flex-col", !item.isRead && "font-bold")}>
          <span>{item.name}</span>
          <span className="text-xs text-slate-500">{item.email}</span>
        </div>
      )
    },
    { header: "Subject", accessor: "subject" as keyof Message },
    { 
      header: "Date", 
      accessor: (item: Message) => new Date(item.createdAt).toLocaleDateString()
    },
    { 
      header: "Status", 
      accessor: (item: Message) => (
        <span className={cn(
          "px-2 py-1 rounded-md text-xs font-medium",
          item.isRead ? "bg-slate-100 text-slate-600 dark:bg-slate-800" : "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
        )}>
          {item.isRead ? "Read" : "Unread"}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages Inbox</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and respond to inquiries from your contact form.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 p-2 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
        <DataTable 
          columns={columns} 
          data={messages} 
          isLoading={loading}
          onEdit={(item) => handleMarkAsRead(item._id)}
          onDelete={(item) => handleDelete(item._id)}
        />
      </div>
    </div>
  );
}
