
import { TicketType, EventDetails } from './types';

export const TICKET_DATA: TicketType[] = [
  {
    id: 'ga-earlybird',
    name: 'GA (Early Bird)',
    price: 799,
    benefits: ['Entry only', 'Early bird discount']
  },
  {
    id: 'ga-vip-earlybird',
    name: 'GA VIP (Early Bird)',
    price: 1399,
    benefits: ['Exclusive front-row access', 'Early bird discount']
  },
  {
    id: 'ga-phase2',
    name: 'GA (Phase 2)',
    price: 1249,
    benefits: ['Entry only', 'Easy access to the bar']
  },
  {
    id: 'ga-vip-phase2',
    name: 'GA VIP (Phase 2)',
    price: 1999,
    benefits: ['Exclusive front-row near the stage', 'Easy access to the bar']
  },
  {
    id: 'vvip-lounge',
    name: 'VVIP Lounge / Round Table (per person)',
    price: 4999,
    benefits: [
      'Unlimited food & beverages (7pm–10pm)',
      'Access to all areas',
      'Exclusive round table service',
      'Unlimited IMFL pouring',
      'Clear stage view'
    ]
  },
  {
    id: 'vvip-table-6',
    name: 'VVIP Round Table (upto 6 persons)',
    price: 24999,
    benefits: [
      'Exclusive round table',
      'Unlimited food & beverages (7pm–10pm)',
      'Access to all areas',
      'Round table service',
      'Unlimited IMFL pouring',
      'Clear stage view'
    ]
  }
];

export const EVENT_DETAILS: EventDetails = {
  title: "Mohombi Live in Shillong",
  location: "Lariti, Mawkasiang",
  date: "October 25, 2025",
  time: "3:00 PM Onwards",
  city: "Shillong",
  // Using a robust, high-quality concert image as a placeholder for the requested poster
  posterUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80"
};

export const LANDING_CONTENT = {
  about: {
    text: "Get ready for a high-energy night with global pop & Afro-Latin star Mohombi—the Congolese-Swedish hitmaker behind chart-toppers like “Bumpy Ride”, “Coconut Tree” and “mi amor.” Expect a power-packed set blending pop, dancehall, reggaeton, and Afrobeats with a full live band and dancers.",
    highlights: [
      "International hits and exclusive live edits",
      "State-of-the-art sound & lighting",
      "Limited VIP zones with premium viewing"
    ],
    footer: "Come early, clear security fast, and secure your spot up front. This is one for the books!"
  },
  terms: [
    { title: "1. Ticket Validity", items: ["Each ticket admits one person only.", "Entry is valid only on the date and time mentioned on the ticket.", "Tickets are non-transferable and non-refundable, unless the event is cancelled."] },
    { title: "2. Entry & ID Requirements", items: ["Attendees must carry a valid government-issued photo ID (Aadhar, Passport, Driving License, etc.).", "The name on the ticket must match the ID for entry.", "Entry is allowed only to ticket holders above the age of 14+."] },
    { title: "3. Event Guidelines", items: ["Entry will not be allowed post 9 PM, regardless of ticket purchase.", "No re-entry will be allowed once you exit the venue."] },
    { title: "4. Prohibited Items", items: ["The following items are strictly prohibited: weapons, illegal substances, outside food or beverages, professional cameras, recording devices, laser pointers, and fireworks."] },
    { title: "5. Security Check", items: ["Security checks, including frisking, remain a condition of entry.", "Organizers reserve the right to refuse admission to anyone found in possession of prohibited items."] },
    { title: "6. Ticket Purchase & Validity", items: ["Tickets should be purchased only from ONLYBEES.", "Fake or duplicated tickets will be considered invalid.", "Lost, stolen, or damaged tickets will not be reissued."] },
    { title: "7. Code of Conduct", items: ["Any form of abuse, harassment, or disruptive behavior will lead to immediate removal from the venue without refund.", "Respect fellow attendees and staff. Help maintain a safe and inclusive environment."] },
    { title: "8. Photography & Recordings", items: ["The event may be recorded and photographed. By attending, you give consent to the use of your image or likeness for promotional purposes."] },
    { title: "9. Cancellation & Refunds", items: ["In case of event cancellation due to unforeseen circumstances (e.g., weather, government restrictions), a refund policy will be initiated at the organizer’s discretion.", "No refunds will be issued for no-shows or late arrivals."] },
    { title: "10. Health & Safety", items: ["Please follow all health and safety protocols laid down by the venue or government authorities.", "Entry may be restricted if you display symptoms of illness or fail to comply with safety checks."] },
    { title: "11. Limitation of Liability", items: ["The organizers are not responsible for any loss, injury, or damage sustained at the event, including lost or stolen personal belongings."] },
    { title: "12. Contact", items: ["For ticket support or queries, please contact:", "📞 8787740538", "📧 info@onlybees.in"] }
  ],
  faq: [
    { q: "Can I get a refund if I can't attend?", a: "All ticket sales are final and non-refundable, unless the event is cancelled by the organisers. No refunds for no-shows or change of plans." },
    { q: "Can I transfer my ticket to someone else?", a: "Tickets are non-transferable. Entry will be granted only to the original ticket holder with a matching valid photo ID." },
    { q: "What ID do I need to bring?", a: "Please bring a valid government-issued photo ID (Aadhaar, PAN, Driving Licence or Passport). The name on the ID must match your ticket." },
    { q: "Is there an age limit for the event?", a: "Yes. The concert is for attendees aged 14 years and above. ID verification at the gate is mandatory." },
    { q: "What time should I arrive?", a: "Gates open one hour before show time. Arrive early to complete security checks and enjoy the performance from the start." },
    { q: "Is re-entry allowed?", a: "No. Once you exit the venue, re-entry is strictly prohibited." },
    { q: "Will there be food and drinks at the venue?", a: "Yes. Food and beverages will be available for purchase inside. Outside food or drinks are not allowed." },
    { q: "What items are prohibited?", a: "Weapons/sharp objects, alcohol or drugs, professional cameras or recording equipment, outside food & beverages, large bags/backpacks are not permitted." },
    { q: "Can I bring a camera?", a: "Phone photography is allowed. Professional cameras, DSLRs and recording equipment are strictly prohibited." },
    { q: "Will the event be recorded?", a: "Yes. The show may be filmed and photographed for promotional use. By attending you consent to appear in any such material." },
    { q: "What happens if the event is cancelled or postponed?", a: "If the concert is cancelled, ticket buyers will be informed via email/SMS and refunds processed. If postponed, your existing ticket remains valid for the new date." },
    { q: "Whom do I contact for help with my ticket?", a: "For ticket issues or event information please call 8787740538 or email info@onlybees.in." }
  ]
};

export const ACCENT_COLOR = '#00FF38';
