"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EVENT_TYPES } from "@/lib/constants";
import { toast } from "sonner";

export function EventInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0].id);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: eventType,
          title: form.get("title"),
          description: form.get("description"),
          contactName: form.get("contactName"),
          contactEmail: form.get("contactEmail"),
          contactPhone: form.get("contactPhone"),
          guestCount: Number(form.get("guestCount")) || undefined,
          date: form.get("date") || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Event inquiry received. Our team will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Submission failed. Email events@monallahore.com");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-4">
      <div>
        <Label>Event Type</Label>
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map((e) => (
              <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" name="title" required className="mt-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" name="contactName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" name="contactEmail" type="email" required className="mt-1" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contactPhone">Phone</Label>
          <Input id="contactPhone" name="contactPhone" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="guestCount">Expected Guests</Label>
          <Input id="guestCount" name="guestCount" type="number" className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="date">Preferred Date</Label>
        <Input id="date" name="date" type="date" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="description">Details</Label>
        <Textarea id="description" name="description" className="mt-1" />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
